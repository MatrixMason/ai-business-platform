
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  
  import { JwtPayload } from '../auth.service.js';
  import { JwtStrategy } from '../strategies/jwt.strategy.js';
  
  interface AuthenticatedRequest {
    headers: {
      authorization?: string;
    };
    user?: JwtPayload;
  }
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtStrategy: JwtStrategy) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request =
        context.switchToHttp().getRequest<AuthenticatedRequest>();
  
      const authorization = request.headers.authorization;
  
      if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new UnauthorizedException(
          'Необходимо авторизоваться',
        );
      }
  
      const token = authorization.slice(7).trim();
  
      if (!token) {
        throw new UnauthorizedException('JWT отсутствует');
      }
  
      request.user = await this.jwtStrategy.validate(token);
  
      return true;
    }
  }
  