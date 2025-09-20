import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Role } from 'src/auth/entity/role.entity';
import { PagingDto } from 'src/dto/paging.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/feature')
  getFeatureProject() {
    return this.projectService.getFeatureProject();
  }

  @Get()
  findAll(@Query(ValidationPipe) pagingDto: PagingDto) {
    return this.projectService.findAll(pagingDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  importNewProject(@Body(ValidationPipe) project: CreateProjectDto) {
    return this.projectService.importNewProject(project);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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
