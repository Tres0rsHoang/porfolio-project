import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectTypeService } from './project-type.service';
import { CreateProjectTypeDto } from './dto/create-project-type.dto';
import { UpdateProjectTypeDto } from './dto/update-project-type.dto';

@Controller('project-type')
export class ProjectTypeController {
  constructor(private readonly projectTypeService: ProjectTypeService) {}

  @Post()
  create(@Body(ValidationPipe) createProjectTypeDto: CreateProjectTypeDto) {
    return this.projectTypeService.create(createProjectTypeDto);
  }

  @Get()
  findAll() {
    return this.projectTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectTypeDto: UpdateProjectTypeDto,
  ) {
    return this.projectTypeService.update(id, updateProjectTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectTypeService.remove(+id);
  }
}
