import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { DatabaseModule } from './database/database.module';
import { FrameworkModule } from './framework/framework.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LanguageModule } from './language/language.module';
import { ProjectTypeModule } from './project-type/project-type.module';
import { CommentModule } from './comment/comment.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { SeedModule } from './seed/seed.module';
import EventsGateway from './socket/events.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Request, Response, NextFunction } from 'express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProjectModule,
    DatabaseModule,
    FrameworkModule,
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 3,
      },
    ]),
    LanguageModule,
    ProjectTypeModule,
    CommentModule,
    AuthModule,
    JwtModule,
    UserModule,
    SeedModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/files',
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AuthService,
    EventsGateway,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        void res;
        req.url = req.url.toLowerCase();
        next();
      })
      .forRoutes('*');
  }
}
