import { BadRequestException, Injectable } from '@nestjs/common';
import { Auth, Role, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { Role as RoleEnum } from 'src/auth/entity/role.entity';
import { UserDetail } from 'src/entity/user-detail.entity';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getRole(role: RoleEnum): Promise<Role> {
    const existRole: Role | null = await this.databaseService.role.findFirst({
      where: {
        title: role.toString(),
      },
    });
    if (!existRole) throw new Error('Invalid Role Enum');

    return existRole;
  }

  async getNewUser({
    name,
    company,
    gender,
  }: {
    name: string;
    company: string | undefined;
    gender: boolean;
  }): Promise<User> {
    let user: User | null = await this.databaseService.user.findFirst({
      where: { name: name, company: company, gender: gender },
      include: {
        RoleOnUser: {
          include: {
            role: true,
          },
        },
      },
    });
    let existAccount: Auth | null = null;

    if (user) {
      existAccount = await this.databaseService.auth.findFirst({
        where: {
          userId: user.id,
        },
      });
    }

    if (!user || existAccount) {
      const userRole: Role = await this.getRole(RoleEnum.USER);
      user = await this.databaseService.user.create({
        data: {
          name: name,
          company: company,
          gender: gender,
          RoleOnUser: {
            create: [{ role: { connect: { id: userRole.id } } }],
          },
        },
        include: {
          RoleOnUser: {
            include: {
              role: true,
            },
          },
        },
      });
    }
    return user;
  }

  async getUserById(id: number): Promise<UserDetail | null> {
    const data = await this.databaseService.user.findFirst({
      where: {
        id: id,
      },
      include: {
        RoleOnUser: {
          select: {
            role: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
    if (!data) throw new BadRequestException('Invalid user id');
    const emailRawData = await this.databaseService.auth.findFirst({
      where: {
        userId: id,
      },
      select: {
        email: true,
      },
    });
    const { RoleOnUser, ...rawData } = data;
    void RoleOnUser;
    return {
      ...rawData,
      email: emailRawData == null ? null : emailRawData.email,
      roles: data.RoleOnUser.map((value) => value.role.title as RoleEnum),
    };
  }
}
