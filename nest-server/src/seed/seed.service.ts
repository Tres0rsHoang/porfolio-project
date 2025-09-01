import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/entity/role.entity';
import { Role as prismaRole } from 'prisma/prisma-client';
import { DatabaseService } from 'src/database/database.service';
import { LanguageService } from 'src/language/language.service';
import { Language } from 'src/language/entity/language-enum.entity';
import { FrameworkService } from 'src/framework/framework.service';
import {
  Framework,
  getLanguages,
  toFramework,
} from 'src/framework/entity/framework-enum.entity';
import { ProjectService } from 'src/project/project.service';
import { ProjectType } from 'src/project-type/entity/project-type-enum.entity';
import { ProjectTypeService } from 'src/project-type/project-type.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    private readonly prisma: DatabaseService,
    private readonly languageService: LanguageService,
    private readonly frameworkService: FrameworkService,
    private readonly projectService: ProjectService,
    private readonly projectTypeService: ProjectTypeService,
  ) {}

  private async addingRole() {
    const rolesString = Object.values(Role);
    for (const role of rolesString) {
      try {
        await this.prisma.role.upsert({
          where: {
            title: role,
          },
          update: {},
          create: {
            title: role,
          },
        });
      } catch (err) {
        this.logger.error(err);
      }
    }
  }

  private async addingAdmin() {
    const adminRole: prismaRole | null = await this.prisma.role.findFirst({
      where: {
        title: Role.ADMIN,
      },
    });

    if (!adminRole) {
      throw new Error("Can't get admin role");
    }
    try {
      const hashPassword = await bcrypt.hash('admin', 10);
      await this.prisma.user.create({
        data: {
          name: 'admin',
          gender: true,
          Auth: {
            create: {
              username: 'admin',
              email: 'baokyo002@gmail.com',
              hashPassword: hashPassword,
            },
          },
          RoleOnUser: {
            create: {
              roleId: adminRole.id,
            },
          },
        },
      });
    } catch (err) {
      this.logger.error(err);
    }
  }

  private async addingLanguage(reset: boolean) {
    const languageString = Object.values(Language);
    try {
      if (reset) {
        await this.prisma.languageOnFramework.deleteMany({});
        await this.prisma.language.deleteMany({});
      }
      await this.languageService.create({ displayStrings: languageString });
    } catch (err) {
      this.logger.error(err);
    }
  }

  private async addingFramework(reset: boolean) {
    const frameworkStrings = Object.values(Framework);
    try {
      if (reset) {
        await this.prisma.frameworkOnProject.deleteMany({});
        await this.prisma.framework.deleteMany({});
      }
      for (const framework of frameworkStrings) {
        const frameworkEnum: Framework | undefined = toFramework(framework);
        if (!frameworkEnum) continue;
        await this.frameworkService.create({
          name: framework,
          languages: getLanguages(frameworkEnum),
        });
      }
    } catch (err) {
      this.logger.error(err);
    }
  }

  private async addingProjectType(reset: boolean) {
    const projectTypeStrings = Object.values(ProjectType);
    try {
      if (reset) {
        await this.prisma.typeOnProject.deleteMany({});
        await this.prisma.projectType.deleteMany({});
      }
      await this.projectTypeService.create({
        name: projectTypeStrings,
      });
    } catch (err) {
      this.logger.error(err);
    }
  }

  private async addingFeatureProject(reset: boolean) {
    try {
      if (reset) {
        await this.prisma.project.deleteMany({});
      }
      await this.projectService.importNewProject({
        name: 'CloudOCS App',
        title: 'CloudOCS - Omnichannel Cloud Sales',
        projectType: ProjectType.Mobile,
        framework: [
          Framework.Flutter,
          Framework.Vtiger,
          Framework.Firebase,
          Framework.ExpressJs,
          Framework.WebSocket,
        ],
        startAt: new Date('2023-06-01'),
        endAt: new Date('2023-08-01'),
        feature: true,
      });
      await this.projectService.importNewProject({
        name: 'Zalo Ticket App',
        title: 'CloudGo Zalo Mini App',
        projectType: ProjectType.Mobile,
        framework: [Framework.React, Framework.ZaloMiniApp, Framework.Vtiger],
        startAt: new Date('2023-08-01'),
        endAt: new Date('2023-12-01'),
        feature: true,
      });
      await this.projectService.importNewProject({
        name: 'CloudWork App',
        title: 'CloudWork - Work Management App',
        projectType: ProjectType.Mobile,
        framework: [Framework.Vtiger, Framework.Flutter],
        startAt: new Date('2023-11-01'),
        endAt: new Date('2024-04-01'),
        feature: true,
      });
      await this.projectService.importNewProject({
        name: 'CloudSales App',
        title: 'CloudSales - Sales Management App, Omnichannel chatting',
        projectType: ProjectType.Mobile,
        framework: [
          Framework.FacebookApi,
          Framework.ZaloApi,
          Framework.Vtiger,
          Framework.Flutter,
          Framework.WebSocket,
          Framework.Firebase,
        ],
        startAt: new Date('2024-04-01'),
        endAt: new Date('2024-08-01'),
        feature: true,
      });
      await this.projectService.importNewProject({
        name: 'TheraCPP Game',
        title: 'TheraCPP - C/C++ Learning Game',
        projectType: ProjectType.Game,
        framework: [Framework.Unity, Framework.NestJs],
        startAt: new Date('2024-01-01'),
        endAt: new Date('2024-08-01'),
        feature: true,
      });
      await this.projectService.importNewProject({
        name: 'CloudGo CRM - Module Request',
        title: 'Module request for CRM',
        projectType: ProjectType.Web,
        framework: [Framework.Vtiger, Framework.Smarty],
        startAt: new Date('2024-07-01'),
        endAt: new Date('2024-12-01'),
        feature: true,
      });
      await this.projectService.importNewProject({
        name: 'CloudGo App',
        title: 'Super app as the foundation for all other mini apps',
        projectType: ProjectType.Mobile,
        framework: [Framework.Vtiger, Framework.Flutter, Framework.Firebase],
        startAt: new Date('2023-11-01'),
        endAt: new Date('2024-08-01'),
        feature: true,
      });
      await this.projectService.importNewProject({
        name: 'Social Chat Hub',
        title:
          "Social Chat Hub - Storage, transfer, format messages thourgh CRM's systems",
        projectType: ProjectType.System,
        framework: [
          Framework.ExpressJs,
          Framework.Vtiger,
          Framework.FacebookApi,
          Framework.RabbitMQ,
          Framework.Smarty,
          Framework.ZaloApi,
        ],
        startAt: new Date('2024-06-01'),
        endAt: new Date('2024-09-01'),
        feature: true,
      });
    } catch (err) {
      this.logger.error(err);
    }
  }

  async run({ reset = false }: { reset: boolean }) {
    this.logger.log('🌱 Start seeding...');
    this.logger.log('Adding Role...');
    await this.addingRole();
    this.logger.log('Adding Admin Account...');
    await this.addingAdmin();
    this.logger.log('Adding Language...');
    await this.addingLanguage(reset);
    this.logger.log('Adding Framework...');
    await this.addingFramework(reset);
    this.logger.log('Adding Project Type...');
    await this.addingProjectType(reset);
    this.logger.log('Adding Project...');
    await this.addingFeatureProject(reset);
    this.logger.log('✅ Seeding finished!');
  }
}
