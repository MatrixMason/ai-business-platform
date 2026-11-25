
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../../prisma/prisma.service.js';
import { JwtPayload } from '../auth.service.js';

@Injectable()
export class JwtStrategy {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validate(token: string): Promise<JwtPayload> {
    try {
      const payload =
        await this.jwtService.verifyAsync<JwtPayload>(token);

      if (
        !payload.sub ||
        !payload.organizationId ||
        !payload.membershipId
      ) {
        throw new UnauthorizedException('Некорректный JWT payload');
      }

      const membership = await this.prisma.organizationMember.findFirst({
        where: {
          id: payload.membershipId,
          userId: payload.sub,
          organizationId: payload.organizationId,
          status: 'ACTIVE',
          user: {
            isActive: true,
          },
          organization: {
            status: 'ACTIVE',
          },
        },
        select: {
          role: {
            select: {
              code: true,
            },
          },
        },
      });

      if (!membership) {
        throw new UnauthorizedException(
          'Пользователь не имеет активного доступа к организации',
        );
      }

      return {
        sub: payload.sub,
        organizationId: payload.organizationId,
        membershipId: payload.membershipId,
        role: membership.role.code,
      };
    } catch {
      throw new UnauthorizedException(
        'Недействительный токен или доступ к организации отсутствует',
      );
    }
  }
}
