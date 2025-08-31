import { PrismaClient, Role as prismaRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Role } from '../src/auth/entity/role.entity';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

const prisma = new PrismaClient();

async function updateRole() {
  const rolesString = Object.values(Role);
  for (const role of rolesString) {
    try {
      await prisma.role.upsert({
        where: {
          title: role,
        },
        update: {},
        create: {
          title: role,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
}
async function addAdminUser() {
  const adminRole: prismaRole | null = await prisma.role.findFirst({
    where: {
      title: Role.ADMIN,
    },
  });

  if (!adminRole) {
    throw new Error("Can't get admin role");
  }
  try {
    const hashPassword = await bcrypt.hash('admin', 10);
    await prisma.user.create({
      data: {
        name: 'admin',
        gender: true,
        Auth: {
          create: {
            username: 'admin',
            email: 'baokyo002@gmail.com',
            hashPassword: hashPassword,
          },
        },
        RoleOnUser: {
          create: {
            roleId: adminRole.id,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  // await updateRole();
  // await addAdminUser();
  const app = await NestFactory.createApplicationContext(AppModule);

  await app.close();
}

main()
  .then(() => console.log('Database seed data completed'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect().catch((err: Error) => console.error(err));
  });
