import { Module } from '@nestjs/common';
import { JwtStategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import EventsGateway from 'src/socket/events.gateway';

@Module({
  imports: [UserModule, DatabaseModule, PassportModule, JwtModule.register({})],
  providers: [JwtStategy, AuthService, UserService, EventsGateway],
  controllers: [AuthController],
})
export class AuthModule {}
