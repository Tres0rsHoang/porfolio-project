import { BadRequestException, Injectable } from '@nestjs/common';
import { Framework, Prisma, Project } from '@prisma/client';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { DatabaseService } from 'src/database/database.service';

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

    if (isProjectExist != null) {
      const updatedData = await this.updateProject(isProjectExist.id, project);
      return updatedData;
    }

    const frameworkEntity: Framework[] = [];
    const frameworks: string[] = project.framework;
    const projectType: string = project.projectType;

    for (const entity of frameworks) {
      const isExist: Framework | null =
        await this.databaseService.framework.findFirst({
          where: {
            name: entity,
          },
        });

      if (isExist == null) {
        throw new BadRequestException(`Invalid framework name ${entity}`);
      }

      frameworkEntity.push(isExist);
    }

    const isExistProjectType =
      await this.databaseService.projectType.findUnique({
        where: {
          name: projectType,
        },
      });

    if (isExistProjectType == null) {
      throw new BadRequestException('Invalid project type');
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
        TypeOnProject: {
          create: [{ type: { connect: { id: isExistProjectType.id } } }],
        },
      },
      include: {
        FrameworkOnProject: {
          include: { framework: true },
        },
        TypeOnProject: {
          include: { type: true },
        },
      },
    });
  }

  async updateProject(id: number, newData: UpdateProjectDto) {
    let formattedData: Prisma.ProjectUpdateInput = { ...newData };

    if (newData.framework != null) {
      const frameworks = newData.framework;
      const projectType = newData.projectType;
      delete newData.framework;
      delete newData.projectType;
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

      const isExistProjectType =
        await this.databaseService.projectType.findUnique({
          where: {
            name: projectType,
          },
        });
      if (isExistProjectType == null) {
        throw new BadRequestException('Invalid project type');
      }

      formattedData = {
        ...newData,
        FrameworkOnProject: {
          deleteMany: {},
          create: frameworkEntity.map((entity) => ({
            framework: { connect: { id: entity.id } },
          })),
        },
        TypeOnProject: {
          deleteMany: {},
          create: [{ type: { connect: { id: isExistProjectType.id } } }],
        },
      };
    }

    return this.databaseService.project.update({
      where: {
        id,
      },
      data: formattedData,
      include: {
        FrameworkOnProject: {
          include: { framework: true },
        },
        TypeOnProject: {
          include: { type: true },
        },
      },
    });
  }

  async getFeatureProject() {
    const rawValues = await this.databaseService.project.findMany({
      where: {
        feature: true,
      },
      select: {
        id: true,
        name: true,
        title: true,
        FrameworkOnProject: {
          select: {
            framework: {
              select: {
                name: true,
                LanguageOnFramework: {
                  select: {
                    Language: {
                      select: {
                        displayString: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        TypeOnProject: {
          select: {
            type: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const removeAttr = <T, K extends keyof T>(obj: T, key: K): Omit<T, K> => {
      const { [key]: _, ...rest } = obj;
      void _;
      return rest;
    };

    const result = rawValues.map((value) => {
      const frameworks = value.FrameworkOnProject.map(
        (fop) => fop.framework.name,
      );

      const languages: string[] = [];

      value.FrameworkOnProject.map((fop) => {
        fop.framework.LanguageOnFramework.map((language) => {
          const languageString: string | undefined =
            language.Language?.displayString;
          if (languageString == undefined || languages.includes(languageString))
            return;
          languages.push(languageString);
        });
      });

      const projectType = value.TypeOnProject[0].type.name;
      const newValue = removeAttr(value, 'TypeOnProject');

      return {
        ...removeAttr(newValue, 'FrameworkOnProject'),
        projectType,
        frameworks,
        languages,
      };
    });

    return result;
  }

  async findAll() {
    return this.databaseService.project.findMany();
  }
}
