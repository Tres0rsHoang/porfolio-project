import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthData, AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt.guard';
import { Roles, RolesGuard } from './roles.guard';
import { Role, toRole } from './entity/role.entity';
import { PublicUser } from './entity/public-user.entity';
import { Request, Response } from 'express';
import { GoogleLoginDto } from './dto/google-login.dto';
import LinkAccountDTO from './dto/link-account.dto';
import { userUpdateDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req: Request) {
    const reqUser = req.user as {
      sub: number;
      user: PublicUser;
    } | null;
    if (!reqUser) throw new UnauthorizedException('Invalid token');
    return this.authService.getUser(reqUser.sub);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!loginDto.email && !loginDto.username) {
      throw new BadRequestException('Empty email and username');
    }
    const authData: AuthData = await this.authService.validateUser({
      password: loginDto.password,
      email: loginDto.email,
      username: loginDto.username,
    });

    const { accessToken, refreshToken } =
      await this.authService.login(authData);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  }

  @Patch('/user-update')
  @UseGuards(JwtAuthGuard)
  async userUpdate(
    @Body(ValidationPipe) reqBody: userUpdateDto,
    @Req() req: Request,
  ) {
    const reqUser = req.user as {
      sub: number;
      user: PublicUser;
    } | null;
    if (!reqUser) throw new UnauthorizedException('Invalid token');

    return this.authService.userUpdate(reqUser.sub, reqBody);
  }

  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    const reqUser = req.user as {
      sub: number;
      user: PublicUser;
    } | null;
    if (!reqUser) throw new UnauthorizedException('Invalid token');

    return this.authService.logout(reqUser.sub);
  }

  @Post('/register')
  register(@Body(ValidationPipe) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('/refresh')
  refresh(@Req() req: Request) {
    const refreshToken: string | null = req.cookies['refresh_token'] as string;
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }
    return this.authService.refresh(refreshToken);
  }

  @Patch('/admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async admin(@Query('id', ParseIntPipe) id: number) {
    const result = await this.authService.admin(id);
    return result;
  }

  @Get('/google-login')
  async googleLogin(
    @Query(ValidationPipe) googleLoginDto: GoogleLoginDto,
    @Res() res: Response,
  ) {
    let linkAccount: number | undefined = undefined;
    if (googleLoginDto.state) {
      const stateObject = JSON.parse(googleLoginDto.state) as {
        link_account: number;
      };
      if (stateObject.link_account) linkAccount = +stateObject.link_account;
    }
    const { accessToken, refreshToken } = await this.authService.googleLogin(
      googleLoginDto.code,
      linkAccount,
    );
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.redirect(
      `${process.env.PUBLIC_APP_URL ?? 'http://localhost:3000'}?access_token=${accessToken}${linkAccount ? '&linked=1' : ''}`,
    );
  }

  @Post('/link')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  async linkAccount(
    @Req() req: Request,
    @Body(ValidationPipe) linkAccountDto: LinkAccountDTO,
  ) {
    const reqUser = req.user as {
      sub: number;
      user: PublicUser;
    } | null;
    if (!reqUser) throw new UnauthorizedException('Invalid token');

    return this.authService.linkAccount(
      linkAccountDto.userId,
      reqUser.user.id,
      reqUser.user.roles.map((value: string) => toRole(value) ?? Role.USER),
    );
  }
}
