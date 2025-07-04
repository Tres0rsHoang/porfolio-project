import { Controller, Get, Param } from '@nestjs/common';

@Controller('project')
export class ProjectController {
  @Get()
  getFeatureProject() {
    return [];
  }

  @Get(':id')
  getOneProject(@Param('id') id: string) {
    return { id };
  }
}
