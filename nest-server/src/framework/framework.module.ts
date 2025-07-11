import { Module } from '@nestjs/common';
import { FrameworkService } from './framework.service';
import { FrameworkController } from './framework.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FrameworkController],
  providers: [FrameworkService],
})
export class FrameworkModule {}
