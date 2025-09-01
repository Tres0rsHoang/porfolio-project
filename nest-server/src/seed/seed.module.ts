import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { DatabaseModule } from 'src/database/database.module';
import { LanguageModule } from 'src/language/language.module';
import { FrameworkModule } from 'src/framework/framework.module';
import { ProjectModule } from 'src/project/project.module';
import { ProjectTypeModule } from 'src/project-type/project-type.module';

@Module({
  imports: [
    DatabaseModule,
    LanguageModule,
    FrameworkModule,
    ProjectModule,
    ProjectTypeModule,
  ],
  providers: [SeedService],
})
export class SeedModule {}
