import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getHello(): string {
    return 'AI Business Platform API is running!';
  }

  @Get('health/db')
  async checkDatabase() {
    const result = await this.prisma.$queryRaw<
      { current_database: string; current_user: string }[]
    >`
      SELECT
        current_database() AS current_database,
        current_user AS current_user
    `;

    return {
      status: 'ok',
      database: result[0].current_database,
      user: result[0].current_user,
      timestamp: new Date().toISOString(),
    };
  }
}
