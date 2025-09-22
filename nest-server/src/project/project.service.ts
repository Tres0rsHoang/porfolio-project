import { BadRequestException, Injectable } from '@nestjs/common';
import { Framework, Prisma, Project } from '@prisma/client';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { DatabaseService } from 'src/database/database.service';
import { ProjectPagingDto } from 'src/dto/paging.dto';
import { Paging } from 'src/entity/paging.entity';
import { ProjectData, SimplifyProjectData } from './entity/project_data.entity';

@Injectable()
export class ProjectService {
  constructor(private readonly databaseService: DatabaseService) {}

  private ProjectProps = {
    id: true,
    name: true,
    title: true,
    description: true,
    teamSize: true,
    role: true,
    startAt: true,
    endAt: true,
    ResponsibilityOnProject: {
      select: {
        responsibility: true,
      },
    },
    FrameworkOnProject: {
      select: {
        framework: {
          select: {
            id: true,
            name: true,
            LanguageOnFramework: {
              select: {
                Language: {
                  select: {
                    id: true,
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
            id: true,
            name: true,
          },
        },
      },
    },
  } satisfies Prisma.ProjectSelect;

  private simplyfyProjectData(data: ProjectData): SimplifyProjectData {
    let frameworks: Array<{
      id: number;
      name: string;
    }> = [];
    let languages: Array<{
      id: number;
      name: string;
    }> = [];
    let types: Array<{
      id: number;
      name: string;
    }> = [];

    frameworks = data.FrameworkOnProject.map((data) => {
      return {
        id: data.framework.id,
        name: data.framework.name,
      };
    });

    languages = data.FrameworkOnProject.flatMap((data) => {
      return data.framework.LanguageOnFramework.map((dataFramework) => {
        return {
          id: dataFramework.Language.id,
          name: dataFramework.Language.displayString,
        };
      });
    });

    types = data.TypeOnProject.map((data) => {
      return {
        id: data.type.id,
        name: data.type.name,
      };
    });

    return {
      id: data.id,
      title: data.title,
      name: data.name,
      description: data.description,
      teamSize: data.teamSize,
      role: data.role,
      startAt: data.startAt,
      endAt: data.endAt,
      responsibilities: data.ResponsibilityOnProject.map(
        (data) => data.responsibility,
      ),
      frameworks: frameworks,
      languages: languages,
      types: types,
    };
  }

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
        description: project.description,
        teamSize: project.teamSize,
        role: project.role,
        ResponsibilityOnProject: {
          create: project.responsibilities.map((data) => ({
            responsibility: data,
          })),
        },
        FrameworkOnProject: {
          create: frameworkEntity.map((entity) => ({
            framework: { connect: { id: entity.id } },
          })),
        },
        TypeOnProject: {
          create: [{ type: { connect: { id: isExistProjectType.id } } }],
        },
      },
      select: this.ProjectProps,
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
      select: this.ProjectProps,
    });
  }

  async getFeatureProject() {
    const rawValues = await this.databaseService.project.findMany({
      where: {
        feature: true,
      },
      select: this.ProjectProps,
    });

    return {
      data: (rawValues as Array<ProjectData>).map((data) =>
        this.simplyfyProjectData(data),
      ),
    };
  }

  async findAll(paging: ProjectPagingDto) {
    const { page, limit } = paging;
    if (!page || !limit) {
      return new BadRequestException();
    }

    const [projects, count] = await Promise.all([
      this.databaseService.project.findMany({
        where: {
          name: {
            contains: paging.projectName,
            mode: 'insensitive',
          },
        },
        select: this.ProjectProps,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createAt: 'desc',
        },
      }),
      this.databaseService.project.count(),
    ]);

    const resPaging: Paging = {
      nextPage: page >= Math.ceil(count / limit) ? undefined : page + 1,
      page: page,
      limit: limit,
      total: count,
      totalPage: Math.ceil(count / limit),
    };

    return {
      data: (projects as Array<ProjectData>).map((data) =>
        this.simplyfyProjectData(data),
      ),
      paging: resPaging,
    };
  }
}
