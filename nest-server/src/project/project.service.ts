import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Framework, Prisma, Project } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly databaseService: DatabaseService) {}

  async importNewProject(project: CreateProjectDto) {
    const isProjectExist: Project | null =
      await this.databaseService.project.findFirst({
        where: {
          name: project.name,
        },
      });

    if (isProjectExist != null)
      throw new ConflictException('Project name exist');

    const frameworkEntity: Framework[] = [];
    const frameworks: string[] = project.framework;

    for (const entity of frameworks) {
      const isExist: Framework | null =
        await this.databaseService.framework.findFirst({
          where: {
            name: entity,
          },
        });

      if (isExist == null)
        throw new BadRequestException(`Invalid framework name ${entity}`);

      frameworkEntity.push(isExist);
    }

    return this.databaseService.project.create({
      data: {
        name: project.name,
        title: project.title,
        startAt: project.startAt,
        endAt: project.endAt,
        feature: project.feature,
        FrameworkOnProject: {
          create: frameworkEntity.map((entity) => ({
            framework: { connect: { id: entity.id } },
          })),
        },
      },
    });
  }

  async updateProject(id: number, newData: UpdateProjectDto) {
    let formattedData: Prisma.ProjectUpdateInput = { ...newData };

    if (newData.framework != null) {
      const frameworks = newData.framework;
      delete newData.framework;
      const frameworkEntity: Framework[] = [];

      for (const framework of frameworks) {
        const isExist: Framework | null =
          await this.databaseService.framework.findFirst({
            where: {
              name: framework,
            },
          });

        if (isExist == null)
          throw new BadRequestException(`Invalid framework name ${framework}`);

        frameworkEntity.push(isExist);
      }

      formattedData = {
        ...newData,
        FrameworkOnProject: {
          deleteMany: {},
          create: frameworkEntity.map((entity) => ({
            framework: { connect: { id: entity.id } },
          })),
        },
      };
    }

    return this.databaseService.project.update({
      where: {
        id,
      },
      data: formattedData,
    });
  }

  async getFeatureProject() {
    return this.databaseService.project.findMany({
      where: {
        feature: true,
      },
    });
  }

  async findAll() {
    return this.databaseService.project.findMany();
  }
}
