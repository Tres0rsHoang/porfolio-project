import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import EventsGateway from 'src/socket/events.gateway';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [CommentController],
  providers: [CommentService, EventsGateway],
})
export class CommentModule {}
