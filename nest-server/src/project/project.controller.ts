import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/feature')
  getFeatureProject() {
    return this.projectService.getFeatureProject();
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Post()
  importNewProject(@Body(ValidationPipe) project: CreateProjectDto) {
    return this.projectService.importNewProject(project);
  }

  @Patch(':id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) project: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(id, project);
  }

  @Get(':id')
  getOneProject(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
