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
        await this.prisma.responsibilityOnProject.deleteMany({});
        await this.prisma.project.deleteMany({});
      }
      await this.projectService.importNewProject({
        name: 'CloudOCS App',
        title: 'CloudOCS - Omnichannel Cloud Sales',
        projectType: ProjectType.Mobile,
        description:
          'CloudOCS was the predecessor of CloudSales, designed to centralize multi-channel sales management by integrating platforms like Shopee and TikTok Shop into one app. As team leader and fullstack developer, I led the project through UX/UI design, API integration, and cross-platform development. The project was successfully delivered and awarded a 9/10 graduation internship score.',
        teamSize: 3,
        role: 'Team Leader - Full-stack developer',
        responsibilities: [
          'Led a 3-member team, managing task allocation, progress tracking, and code reviews throughout the project lifecycle.',
          'Contributed to CloudOCS, a multi-channel sales app integrated with Shopee and TikTok Shop APIs, conducting UX/UI design and market research.',
          'Developed responsive web interfaces for sales reports and built a cross-platform Flutter mobile app for Android and iOS.',
          'Implemented PHP-based API integrations with the company’s CRM to ensure reliable communication between app and backend systems.',
        ],
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
        description:
          'Zalo Ticket Mini App – My CloudGo is a Zalo mini app built with the ZMP framework based on ReactJS. It enables CRM customers to submit feedback, report issues, and share evaluations for specific projects, streamlining communication between clients and the company while enhancing service quality and customer satisfaction.',
        teamSize: 3,
        role: 'Front-end Developer',
        responsibilities: [
          'Developed user interface based on provided mockups using ZMP (ReactJS), ensuring accurate implementation and responsive design across devices',
          'Optimized application workflows to improve usability, streamline customer feedback submission, and enhance overall user experience within the mini app.',
          'Implemented data storage handling on the mini app, ensuring smooth integration with CRM systems and reliable access to submitted customer tickets.',
        ],
        projectType: ProjectType.Mobile,
        framework: [Framework.React, Framework.ZaloMiniApp, Framework.Vtiger],
        startAt: new Date('2023-08-01'),
        endAt: new Date('2023-12-01'),
        feature: true,
      });
      await this.projectService.importNewProject({
        name: 'CloudWork App',
        title: 'CloudWork - Work Management App',
        description:
          'The CloudWork app, a Flutter-based sub-app of the CloudGo ecosystem, enables businesses to create, assign, and manage tasks, set reminders, track progress, and evaluate work completion. It streamlines project execution and enhances team productivity for companies using CloudGo’s CRM services',
        teamSize: 3,
        role: 'Front-end Developer',
        responsibilities: [
          'Converted UI mockups into a production-ready app, ensuring accurate implementation and responsive design across devices.',
          'Integrated APIs for attendance reporting and developed a dynamic dashboard interface customizable by user preferences.',
          'Implemented lazy loading for individual components, reducing perceived waiting time and improving overall user experience.',
          'Optimized in-app search by managing filters with BloC, minimizing redundant reloads when retrieving related lists.',
        ],
        projectType: ProjectType.Mobile,
        framework: [Framework.Vtiger, Framework.Flutter],
        startAt: new Date('2023-11-01'),
        endAt: new Date('2024-04-01'),
        feature: true,
      });
      await this.projectService.importNewProject({
        name: 'CloudSales App',
        title: 'CloudSales - Sales Management App, Omnichannel chatting',
        description:
          'CloudSales is a Flutter-based sub-app of CloudGo designed for multi-channel order management. It enables businesses and individuals to track orders from platforms like Shopee and TikTok, manage inventory, and generate invoices. Integrated with the Social Integration Hub, it supports low-latency (<1s) real-time multi-channel chat via Facebook Fanpages and Zalo OA',
        teamSize: 3,
        role: 'Full-stack Developer',
        responsibilities: [
          'Converted UI mockups into production-ready app interfaces, ensuring seamless design implementation and user-friendly workflows.',
          'Integrated Social Integration Hub to enable real-time multi-channel messaging with Facebook Fanpages and Zalo OA.',
          'Developed core order management features, including creating, displaying, and updating orders with dynamic product selection.',
          'Implemented product management functions for inventory tracking, stock updates, and order creation workflows.',
        ],
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
        description:
          'TheraCPP is my graduation project game built with Unity to teach C++ programming through gamified levels. Featuring drag-and-drop (Scratch-like), C++ syntax assembly, and full coding modes, it engages learners of all ages, especially students and beginners. The backend, powered by NestJS and PlayFab, executes code and manages users. Officially published on both Google Play and App Store, it achieved the highest graduation score (9.4/10) and is currently hosted on DigitalOcean for continued development.',
        teamSize: 5,
        role: 'Team Leader - Full-stack Developer.',
        responsibilities: [
          'Led the team as project manager, assigning tasks, planning milestones, and tracking progress throughout development.',
          'Designed several game levels and gameplay flows, especially for the Normal difficulty coding challenges.',
          'Implemented backend logic in NestJS for executing user-submitted C++ programs and handling gameplay workflows.',
        ],
        framework: [Framework.Unity, Framework.NestJs],
        startAt: new Date('2024-01-01'),
        endAt: new Date('2024-08-01'),
        feature: true,
      });
      await this.projectService.importNewProject({
        name: 'Module Request - CloudGo CRM',
        title: 'Module request for CloudGo CRM',
        description:
          'The Request Module in CloudGo CRM was designed to streamline employee requests and proposals within predefined workflows set by managers and administrators. It enables structured approval processes, revision requests, and workflow management, ensuring compliance with organizational policies. As a fullstack developer, I contributed to both database design and implementation of core features that enhanced efficiency in request handling.',
        teamSize: 3,
        role: 'Full-stack developer',
        responsibilities: [
          'Designed relational database schema for request creation, workflow management, and approval processes.',
          'Implemented frontend interfaces for submitting, tracking, and managing employee requests within the CRM system.',
          'Developed backend APIs to support approval workflows, including escalation, rejection, and re-submission logic.',
          'Ensured seamless integration with existing CRM modules, maintaining consistent user experience and data integrity.',
        ],
        projectType: ProjectType.Web,
        framework: [Framework.Vtiger, Framework.Smarty],
        startAt: new Date('2024-07-01'),
        endAt: new Date('2024-12-01'),
        feature: true,
      });
      await this.projectService.importNewProject({
        name: 'CloudGo Super App',
        title: 'Super app as the foundation for all other mini apps',
        description:
          'The CloudGo Super App is the company’s core mobile platform built with Flutter, serving as a gateway to all sub-apps and CRM services. It leverages Firebase (Cloud Firestore) for account and data management, Firebase Cloud Messaging (FCM) for push notifications, and Dynamic Links for seamless deeplink navigation from the CRM web interface. Using Shorebird, the app supports quick updates without App Store or Google Play review delays, ensuring faster delivery and an improved user experience.',
        teamSize: 0,
        role: 'Front-end Developer',
        responsibilities: [
          'Ensured seamless integration with existing CRM modules, maintaining consistent user experience and data integrity.',
          'Optimized local storage and API call flows, reducing login time from 10–20s to 2–3s, significantly improving app performance.',
          'Implemented reusable design patterns to accelerate development and ensure consistency across multiple CRM sub-apps.',
          'Integrated Firebase Cloud Messaging (FCM) to enable real-time notifications from the company’s CRM system.',
        ],
        projectType: ProjectType.Mobile,
        framework: [Framework.Vtiger, Framework.Flutter, Framework.Firebase],
        startAt: new Date('2023-11-01'),
        endAt: new Date('2024-08-01'),
        feature: true,
      });
      await this.projectService.importNewProject({
        name: 'Social Integration Hub',
        title:
          "Social Integration Hub - Storage, transfer, format messages thourgh CRM's systems",
        description:
          'The Social Integration Hub is a service that routes messages from multiple Facebook Fanpages and Zalo OA accounts to client-registered CRM systems. Built with Express.js, MySQL, Redis, and BullMQ, it supports real-time delivery via WebSocket and runs reliably in production, handling 100–200 messages per minute with low latency.',
        teamSize: 1,
        role: 'Full-stack Developer',
        responsibilities: [
          'Designed and implemented the entire Social Integration Hub service using Express.js, ensuring reliable message routing between CRMs.',
          'Built message storage with MySQL, optimized queries with indexes for fast retrieval, and maintained scalable database performance.',
          'Implemented reliable message forwarding through BullMQ and Redis queues, handling up to 200 messages per minute.',
          'Developed real-time message delivery with WebSocket, ensuring seamless integration with client CRM systems.',
          'Designed and built an administration dashboard for monitoring and managing queues across multiple CRM systems.',
          'Registered and configured extended Facebook App API permissions to enable advanced message integration features.',
          'Deployed service on Azure VPS with Docker and Docker Hub, enabling automated, scalable, and consistent deployments.',
          'Achieved stable production performance with low latency (1–2s delivery) and sub-second query response times',
        ],
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
