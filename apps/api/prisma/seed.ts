import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

const systemRoles = [
  {
    code: 'OWNER',
    name: 'Владелец',
    description: 'Полный контроль над организацией',
  },
  {
    code: 'ADMIN',
    name: 'Администратор',
    description: 'Управление сотрудниками и настройками организации',
  },
  {
    code: 'MANAGER',
    name: 'Менеджер',
    description: 'Работа с клиентами, сделками и диалогами',
  },
  {
    code: 'USER',
    name: 'Пользователь',
    description: 'Ограниченный доступ к рабочим функциям',
  },
];

async function main() {
  for (const role of systemRoles) {
    await prisma.role.upsert({
      where: {
        code: role.code,
      },
      create: {
        ...role,
        isSystem: true,
      },
      update: {
        name: role.name,
        description: role.description,
        isSystem: true,
      },
    });
  }

  console.log('System roles seeded successfully');
}

try {
  await main();
} catch (error) {
  console.error('Failed to seed database:', error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}