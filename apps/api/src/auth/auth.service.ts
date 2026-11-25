
import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import * as argon2 from 'argon2';
  import { randomUUID } from 'node:crypto';
  
  import { PrismaService } from '../prisma/prisma.service.js';
  import { RegisterDto } from './dto/register.dto.js';
  import { LoginDto } from './dto/login.dto.js';
  
  export interface JwtPayload {
    sub: string;
    organizationId: string;
    membershipId: string;
    role: string;
  }
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly prisma: PrismaService,
      private readonly jwtService: JwtService,
    ) {}
  
    async register(dto: RegisterDto) {
      try {
        const result = await this.prisma.$transaction(async (tx) => {
          const email = dto.email.trim().toLowerCase();
  
          const existingUser = await tx.user.findUnique({
            where: { email },
            select: { id: true },
          });
  
          if (existingUser) {
            throw new ConflictException(
              'Пользователь с таким email уже существует',
            );
          }
  
          const ownerRole = await tx.role.findUnique({
            where: { code: 'OWNER' },
            select: { id: true },
          });
  
          if (!ownerRole) {
            throw new InternalServerErrorException(
              'Системная роль OWNER не найдена. Выполните seed.',
            );
          }
  
          const passwordHash = await argon2.hash(dto.password);
  
          const user = await tx.user.create({
            data: {
              email,
              passwordHash,
              firstName: dto.firstName?.trim() || null,
              lastName: dto.lastName?.trim() || null,
            },
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              createdAt: true,
            },
          });
  
          const organization = await tx.organization.create({
            data: {
              name: dto.organizationName.trim(),
              slug: `org-${randomUUID()}`,
            },
            select: {
              id: true,
              name: true,
              slug: true,
              status: true,
            },
          });
  
          const membership = await tx.organizationMember.create({
            data: {
              organizationId: organization.id,
              userId: user.id,
              roleId: ownerRole.id,
              status: 'ACTIVE',
              joinedAt: new Date(),
            },
            select: {
              id: true,
              role: {
                select: {
                  code: true,
                  name: true,
                },
              },
            },
          });
  
          return { user, organization, membership };
        });
  
        const accessToken = await this.createAccessToken({
          sub: result.user.id,
          organizationId: result.organization.id,
          membershipId: result.membership.id,
          role: result.membership.role.code,
        });
  
        return {
          accessToken,
          tokenType: 'Bearer',
          user: result.user,
          organization: result.organization,
          membership: result.membership,
        };
      } catch (error) {
        if (error instanceof ConflictException) {
          throw error;
        }
  
        if (
          typeof error === 'object' &&
          error !== null &&
          'code' in error &&
          error.code === 'P2002'
        ) {
          throw new ConflictException(
            'Пользователь с таким email уже существует',
          );
        }
  
        throw error;
      }
    }
  
    async login(dto: LoginDto) {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
        select: {
          id: true,
          email: true,
          passwordHash: true,
          firstName: true,
          lastName: true,
          isActive: true,
          memberships: {
            where: {
              status: 'ACTIVE',
              organization: {
                status: 'ACTIVE',
              },
            },
            select: {
              id: true,
              organizationId: true,
              role: {
                select: {
                  code: true,
                  name: true,
                },
              },
              organization: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      });
  
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Неверный email или пароль');
      }
  
      const passwordIsValid = await argon2.verify(
        user.passwordHash,
        dto.password,
      );
  
      if (!passwordIsValid) {
        throw new UnauthorizedException('Неверный email или пароль');
      }
  
      if (user.memberships.length === 0) {
        throw new ForbiddenException(
          'У пользователя нет активных организаций',
        );
      }
  
      const membership = dto.organizationId
      ? user.memberships.find(
          (item) => item.organizationId === dto.organizationId,
        )
      : user.memberships.length === 1
        ? user.memberships[0]
        : undefined;
    
    if (!membership) {
      if (!dto.organizationId && user.memberships.length > 1) {
        throw new BadRequestException({
          message: 'Выберите организацию для входа',
          organizations: user.memberships.map((item) => ({
            id: item.organization.id,
            name: item.organization.name,
            role: item.role.code,
          })),
        });
      }
    
      throw new ForbiddenException(
        'Нет доступа к указанной организации',
      );
    }
  
      const accessToken = await this.createAccessToken({
        sub: user.id,
        organizationId: membership.organizationId,
        membershipId: membership.id,
        role: membership.role.code,
      });
  
      return {
        accessToken,
        tokenType: 'Bearer',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        organization: membership.organization,
        role: membership.role,
      };
    }
  
    private async createAccessToken(payload: JwtPayload): Promise<string> {
      return this.jwtService.signAsync(payload);
    }
  }
  