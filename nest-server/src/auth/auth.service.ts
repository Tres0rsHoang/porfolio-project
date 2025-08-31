import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './entity/role.entity';
import { RegisterDto } from './dto/register.dto';
import { DatabaseService } from 'src/database/database.service';
import { Auth, Comment, Role as prismaRole, User } from '@prisma/client';
import { PublicUser } from './entity/public-user.entity';
import { UserService } from 'src/user/user.service';
import {
  GoogleLogin,
  GoogleLoginGender,
  GoogleLoginUser,
} from './entity/google-login.entity';
import EventsGateway from 'src/socket/events.gateway';
import { userUpdateDto } from './dto/update-user.dto';

export interface AuthData {
  userId: number;
  username: string;
  email: string;
  user: User;
  roles: Role[];
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async validateUser({
    email,
    username,
    password,
  }: {
    email?: string;
    username?: string;
    password: string;
  }): Promise<AuthData> {
    const authInfo = await this.databaseService.auth.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
      select: {
        userId: true,
        email: true,
        username: true,
        hashPassword: true,
        user: {
          select: {
            name: true,
            id: true,
            company: true,
            gender: true,
            RoleOnUser: {
              select: {
                role: true,
              },
            },
          },
        },
      },
    });

    if (!authInfo) {
      throw new BadRequestException('Invalid username or email');
    }

    const isMatch = await bcrypt.compare(password, authInfo.hashPassword);

    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }

    return {
      ...authInfo,
      roles: authInfo.user.RoleOnUser.map((value) => value.role.title as Role),
    };
  }

  async login(authData: AuthData) {
    const payload: {
      sub: number;
      user: PublicUser;
    } = {
      sub: authData.userId,
      user: {
        id: authData.user.id,
        name: authData.user.name,
        gender: authData.user.gender,
        email: authData.email,
        roles: authData.roles,
        company: authData.user.company,
      },
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '5m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    await this.databaseService.auth.update({
      where: {
        userId: payload.sub,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    return { accessToken, refreshToken };
  }

  async register(registerDto: RegisterDto) {
    const existString: string | null = await this.checkExistUsernameOrEmail({
      username: registerDto.username,
      email: registerDto.email,
    });

    if (existString && existString == registerDto.email) {
      throw new BadRequestException({
        message: `${registerDto.email} already exist`,
        errorField: 'email',
      });
    }
    if (existString && existString == registerDto.username) {
      throw new BadRequestException({
        message: `${registerDto.username} already exist`,
        errorField: 'username',
      });
    }

    const user: User = await this.userService.getNewUser({
      name: registerDto.name,
      company: registerDto.company,
      gender: registerDto.gender,
    });

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(registerDto.password, saltRounds);

    const newAccount: Auth = await this.databaseService.auth.create({
      data: {
        userId: user.id,
        username: registerDto.username,
        hashPassword: hashPassword,
        email: registerDto.email,
      },
    });

    const { hashPassword: _, ...safeAccount } = newAccount;
    void _;

    return safeAccount;
  }

  async refresh(refreshToken: string) {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is not defined');
    }
    try {
      const payload: {
        sub: number;
        user: PublicUser;
      } = this.jwtService.verify(refreshToken, { secret });
      const auth: Auth | null = await this.databaseService.auth.findFirst({
        where: {
          userId: payload.sub,
          refreshToken: refreshToken,
        },
      });

      console.log(refreshToken);

      if (!auth) {
        throw new Error('Invalid refresh token');
      }

      const accessToken = this.jwtService.sign(
        { sub: payload.sub, user: payload.user },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '5m',
        },
      );

      return { accessToken };
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async admin(id: number) {
    const prismaAdminRole: prismaRole = await this.userService.getRole(
      Role.ADMIN,
    );
    await this.databaseService.roleOnUser
      .create({
        data: {
          roleId: prismaAdminRole.id,
          userId: id,
        },
      })
      .catch((err) => {
        throw err;
      });
    return { success: 1 };
  }

  async checkExistUsernameOrEmail({
    username,
    email,
  }: {
    username?: string;
    email?: string;
  }): Promise<string | null> {
    const existUsername: Auth | null =
      await this.databaseService.auth.findFirst({
        where: {
          OR: [{ username: username }, { email: email }],
        },
      });

    if (existUsername && existUsername.email == email) {
      return email;
    }

    if (existUsername && existUsername.username == username) {
      return username;
    }

    return null;
  }

  async googleLogin(code: string, linkAccount?: number) {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
        grant_type: 'authorization_code',
      }),
    });

    const tokens: GoogleLogin = (await tokenRes.json()) as GoogleLogin;

    const userRes = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      },
    );
    const user: GoogleLoginUser = (await userRes.json()) as GoogleLoginUser;

    const authInfo = await this.databaseService.auth.findFirst({
      where: {
        email: user.email,
      },
      select: {
        userId: true,
        email: true,
        username: true,
        hashPassword: true,
        user: {
          select: {
            name: true,
            id: true,
            company: true,
            gender: true,
            RoleOnUser: {
              select: {
                role: true,
              },
            },
          },
        },
      },
    });

    let authData: AuthData | null;

    if (!authInfo) {
      const genderRes = await fetch(
        'https://people.googleapis.com/v1/people/me?personFields=genders',
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        },
      );

      const genderInfo: GoogleLoginGender =
        (await genderRes.json()) as GoogleLoginGender;
      const genderString: string | undefined =
        genderInfo.genders && genderInfo.genders.length > 0
          ? genderInfo.genders.at(0)?.value
          : 'male';

      if (!genderString) {
        throw new InternalServerErrorException('Invalid google access token');
      }
      const password = this.generateRandomPassword(16);

      await this.register({
        name: user.name,
        gender: genderString == 'male',
        email: user.email,
        username: user.email,
        password: password,
      });

      authData = await this.validateUser({
        email: user.email,
        username: user.email,
        password: password,
      });
    } else {
      authData = {
        ...authInfo,
        roles: authInfo.user.RoleOnUser.map(
          (value) => value.role.title as Role,
        ),
      };
    }

    if (linkAccount) {
      await this.linkAccount(linkAccount, authData.userId, authData.roles);
    }
    return this.login(authData);
  }

  private generateRandomPassword(length: number = 12): string {
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

    let password = '';
    password += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
    password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += specialChars.charAt(
      Math.floor(Math.random() * specialChars.length),
    );

    const allChars = upperCase + lowerCase + numbers + specialChars;

    while (password.length < length) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
    return password;
  }

  async linkAccount(
    userId: number,
    linkToUserId: number,
    linkToUserRoles: Role[],
  ) {
    const authInfo: Auth | null = await this.databaseService.auth.findFirst({
      where: {
        userId: userId,
      },
    });
    if (authInfo) {
      throw new BadRequestException('Exist auth info for this user id');
    }
    if (linkToUserRoles.includes(Role.ADMIN)) {
      throw new BadRequestException('Invalid user role');
    }

    await this.databaseService.comment.updateMany({
      where: {
        userId: userId,
      },
      data: {
        userId: linkToUserId,
      },
    });

    const updatedComment: Comment[] =
      await this.databaseService.comment.findMany({
        where: {
          userId: linkToUserId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              company: true,
              gender: true,
            },
          },
        },
      });

    this.eventsGateway.emitMessage({
      event: 'updatedComment',
      data: {
        updatedComment,
      },
    });

    try {
      await this.databaseService.roleOnUser.deleteMany({
        where: { userId: userId },
      });
      await this.databaseService.user.delete({
        where: { id: userId },
      });
    } catch (err) {
      console.error(
        {
          message: `Got error on delete ${userId}`,
        },
        err,
      );
    }

    return { message: 'Complete' };
  }

  async logout(userId: number) {
    const updatedAuth: Auth | null = await this.databaseService.auth.update({
      where: {
        userId: userId,
      },
      data: {
        refreshToken: null,
      },
    });
    if (!updatedAuth) {
      throw new UnauthorizedException('Invalid user id');
    }
    return { success: 1 };
  }

  async userUpdate(userId: number, userUpdate: userUpdateDto) {
    for (const key of Object.keys(userUpdate)) {
      if (key == 'company') continue;
      if (userUpdate[key as keyof userUpdateDto] == null)
        throw new BadRequestException(`${key} is required`);
    }
    const updatedUser: User | null = await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        name: userUpdate.name,
        gender: userUpdate.gender,
        company: userUpdate.company,
      },
    });

    if (!updatedUser) throw new UnauthorizedException();

    await this.databaseService.auth.update({
      where: {
        userId: userId,
      },
      data: {
        email: userUpdate.email,
      },
    });
    return { success: 1 };
  }

  async getUser(userId: number) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new UnauthorizedException('Invalid user id');
    return this.userService.getUserById(userId);
  }
}
