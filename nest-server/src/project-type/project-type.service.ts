import { Injectable } from '@nestjs/common';
import { CreateProjectTypeDto } from './dto/create-project-type.dto';
import { UpdateProjectTypeDto } from './dto/update-project-type.dto';
import { DatabaseService } from 'src/database/database.service';
import { ProjectType } from 'generated/prisma';

@Injectable()
export class ProjectTypeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProjectTypeDto: CreateProjectTypeDto) {
    const projectType: ProjectType[] = [];
    for (const projectTypeName of createProjectTypeDto.name) {
      const isExist = await this.databaseService.projectType.findUnique({
        where: {
          name: projectTypeName,
        },
      });

      if (isExist != null) continue;

      const value = await this.databaseService.projectType.create({
        data: {
          name: projectTypeName,
        },
      });
      projectType.push(value);
    }
    return projectType;
  }

  findAll() {
    return this.databaseService.projectType.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} projectType`;
  }

  update(id: number, updateProjectTypeDto: UpdateProjectTypeDto) {
    void updateProjectTypeDto;
    return `This action updates a #${id} projectType`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectType`;
  }
}
