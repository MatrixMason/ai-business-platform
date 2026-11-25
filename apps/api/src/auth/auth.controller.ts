import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
  
  import { AuthService, JwtPayload } from './auth.service.js';
  import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
  import { RegisterDto } from './dto/register.dto.js';
  import { LoginDto } from './dto/login.dto.js';
  
  interface AuthenticatedRequest {
    user: JwtPayload;
  }
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('register')
    register(@Body() dto: RegisterDto) {
      return this.authService.register(dto);
    }
  
    @Post('login')
    login(@Body() dto: LoginDto) {
      return this.authService.login(dto);
    }
  
    @Get('me')
    @UseGuards(JwtAuthGuard)
    getCurrentUser(@Req() request: AuthenticatedRequest) {
      return {
        userId: request.user.sub,
        organizationId: request.user.organizationId,
        membershipId: request.user.membershipId,
        role: request.user.role,
      };
    }
  }
  