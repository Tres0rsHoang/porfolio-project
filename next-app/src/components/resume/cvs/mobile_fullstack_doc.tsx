import { Link, Text } from "@react-pdf/renderer";
import { DocumentSummary } from "./cv_summary";
import { DocumentLayout } from "./document_layout";
import { DocumentEducation } from "./document_education";
import { DocumentExperience } from "./document_expericence";
import { DocumentProjects } from "./document_projects";
import { DocumentTechnicalSkill } from "./document_technical_skill";
import { DocumentAchievements } from "./document_achievements";
import { DocumentCertificates } from "./document_certificates";

export default function MobileFullstackDoc() {
  return (
    <DocumentLayout
      job="Full-stack Mobile Developer"
      title="Hoang Quoc Bao - Full-stack mobile developer"
    >
      <DocumentSummary>
        Mobile App Fullstack Developer with{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          2+ years of professional experience and 8 years of coding background.
        </Text>{" "}
        Skilled in building cross-platform apps with{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Flutter and React Native
        </Text>
        , publishing to both{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          App Store and Google Play
        </Text>
        . Experienced with{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Google services (Firebase, Firestore, Google Maps, Google Translate),
          Facebook and Zalo services (GraphAPI, Advanced API permission)
        </Text>{" "}
        and backend frameworks{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          (Node.js, Express.js, NestJS, .NET, PHP)
        </Text>{" "}
        with{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          MySQL, PostgreSQL, MongoDB and SQLite.
        </Text>
        . Proficient in DevOps tools and platforms including{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Git, Docker, GitHub Actions (CI/CD), Nginx, Cloudflare, Azure,
          DigitalOcean, and Google Cloud
        </Text>
        , delivering scalable, production-ready applications.
      </DocumentSummary>
      <DocumentEducation />
      <DocumentExperience
        companies={[
          {
            company: "CloudGo",
            location: "Ho Chi Minh City",
            jobs: [
              {
                title: "Full-stack Developer - Intern",
                time: "Jul 2023 - Aug 2023",
                description: [
                  <Text key={0}>
                    <Link
                      src="https://cloudgo.vn/cloudsales-giai-phap-crm-quan-ly-ban-hang-da-kenh"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      CloudOCS
                    </Link>
                    : Contributed to CloudOCS (predecessor of CloudSales), a
                    multi-channel sales app, integrated with Shopee API, Tiktok
                    Shop API, handling UX/UI design and market research.
                  </Text>,
                  ,
                  "Independently implemented API integrations in PHP with the company’s CRM, ensuring seamless communication between app and backend.",
                ],
              },
              {
                title: "Full-stack Developer - Part Time",
                time: "Aug 2023 - Dec 2024",
                description: [
                  <Text key={3}>
                    CloudGo Super App{" "}
                    <Link
                      src="https://play.google.com/store/apps/details?id=com.app.cloudgo"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      (CH Play
                    </Link>
                    <Link
                      src="https://apps.apple.com/vn/app/cloudgo/id6474986122?l=vi"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      /iOS)
                    </Link>
                    : Optimized by improving local storage and API calls,
                    reducing login time from 10–20s to 2–3s. Applied design
                    patterns in this app to enable faster development and
                    reusability across multiple sub-apps in the CRM ecosystem.
                    Published app versions to App Store and managed TestFlight
                    releases, ensuring smooth deployment and testing cycles.
                  </Text>,
                  <Text key={1}>
                    <Link
                      src="https://chathub.cloudgo.vn/admin/login?redirect=dashboard"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      Social Integration Hub
                    </Link>
                    : Designed and implemented a message distribution service
                    handling queue management via Redis, real-time messaging
                    with WebSocket.io, and a UI for monitoring and debugging;
                    independently completed in three months.
                  </Text>,
                  <Text key={2}>
                    <Link
                      src="https://cloudgo.vn/cloudsales-giai-phap-crm-quan-ly-ban-hang-da-kenh"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      CloudSales
                    </Link>
                    : Developed sub-app of CloudGo by converting mockups into
                    production-ready UI, integrating APIs with CRM backend, and
                    enabling real-time chat via WebSocket.
                  </Text>,
                  <Text key={3}>
                    <Link
                      src="https://cloudgo.vn/cloudwork-giai-phap-quan-ly-cong-viec-tinh-gon"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      CloudWork
                    </Link>
                    : Built sub-app of CloudGo from mockups, optimized workflows
                    with lazy loading, and enhanced data search/filter for
                    smoother performance.
                  </Text>,
                  <Text key={4}>
                    <Link
                      src="https://zalo.me/s/3077214972070612317/"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      Zalo Ticket Mini App
                    </Link>
                    : Developed a mini app using ZMP (ReactJS-based) for
                    reporting issues and feedback, handling front-end, API
                    integration with CRM, and managing the company’s Zalo app.
                  </Text>,
                ],
              },
            ],
          },
          {
            company: "Freelancer",
            location: "Ho Chi Minh City",
            jobs: [
              {
                title: "Full-stack Developer",
                time: "Jul 2025 - Present",
                description: [
                  <Text key={0}>
                    <Link
                      src="https://www.baohomeserver.uk/"
                      style={{ textDecoration: "none" }}
                    >
                      Bao Hoang Portfolio
                    </Link>
                    : Designed, implemented, and deployed a website, including:
                    Database schema design and API development, built services,
                    controllers, WebSocket for realtime features, and JWT
                    authorization, wrote test cases, configured GitHub Actions,
                    Dockerfile, and Docker Compose, set up an Ubuntu server for
                    deployment, configured SSL certificates for domain, and
                    implemented dynamic DDNS for a self-hosted server, designed
                    UX/UI and coded frontend using Next.js.
                  </Text>,
                  "Initiated a classroom and tuition management system, including: designed user interface layouts and prepared project concepts.",
                ],
              },
              {
                title: "Softskill Learner",
                time: "Jan 2025 - May 2025",
                description: [
                  "Optimized personal development workspace with Neovim, Tmux, Sketchybar, Homerow, and custom keyboard layouts - fully mouse-free workflow.",
                  <Text key={1}>
                    Prepared for and took the IELTS exam to obtain certification
                    and strengthen professional English proficiency.
                  </Text>,
                ],
              },
            ],
          },
        ]}
      />
      <DocumentProjects
        projects={[
          {
            title: "CloudGo Super App",
            time: "Jan 2024 - Apr 2024",
            description:
              "The CloudGo Super App is the company’s core mobile platform built with Flutter, serving as a gateway to all sub-apps and CRM services. It leverages Firebase (Cloud Firestore) for account and data management, Firebase Cloud Messaging (FCM) for push notifications, and Dynamic Links for seamless deeplink navigation from the CRM web interface. Using Shorebird, the app supports quick updates without App Store or Google Play review delays, ensuring faster delivery and an improved user experience.",
            teamSize: 4,
            role: <Text>Front-end Developer. </Text>,
            responsibilities: [
              "Optimized local storage and API call flows, reducing login time from 10–20s to 2–3s, significantly improving app performance.",
              "Implemented reusable design patterns to accelerate development and ensure consistency across multiple CRM sub-apps.",
              "Integrated Firebase Cloud Messaging (FCM) to enable real-time notifications from the company’s CRM system.",
            ],
            technologies: [
              "Flutter",
              "Firebase",
              "Firestore",
              "Cloud Messaging",
              "Dynamic Links",
              "Shorebird",
              "PHP",
              "Vtiger CRM",
            ],
            links: [
              {
                url: "https://play.google.com/store/apps/details?id=com.app.cloudgo",
                label: "CloudGo(CH Play)",
              },
              {
                url: "https://apps.apple.com/vn/app/cloudgo/id6474986122?l=vi",
                label: "CloudGo(iOS)",
              },
            ],
          },
          {
            title: "Social Integration Hub",
            time: "Apr 2024 - Jul 2024",
            description:
              "The Social Integration Hub is a service that routes messages from multiple Facebook Fanpages and Zalo OA accounts to client-registered CRM systems. Built with Express.js, MySQL, Redis, and BullMQ, it supports real-time delivery via WebSocket and runs reliably in production, handling 100–200 messages per minute with low latency.",
            teamSize: 1,
            role: <Text>Full-stack Developer. </Text>,
            responsibilities: [
              "Designed and implemented the entire Social Integration Hub service using Express.js, ensuring reliable message routing between CRMs.",
              "Built message storage with MySQL, optimized queries with indexes for fast retrieval, and maintained scalable database performance.",
              "Implemented reliable message forwarding through BullMQ and Redis queues, handling up to 200 messages per minute.",
              "Developed real-time message delivery with WebSocket, ensuring seamless integration with client CRM systems.",
              "Designed and built an administration dashboard for monitoring and managing queues across multiple CRM systems.",
              "Registered and configured extended Facebook App API permissions to enable advanced message integration features.",
              "Deployed service on Azure VPS with Docker and Docker Hub, enabling automated, scalable, and consistent deployments.",
              "Achieved stable production performance with low latency (1–2s delivery) and sub-second query response times.",
            ],
            technologies: [
              "Express.js",
              "Session / Passport Authentication",
              "Ejs Render / JQuery",
              "Multer",
              "Swagger",
              "MySQL",
              "Redis",
              "BullMQ",
              "WebSocket",
              "Docker",
              "Docker Hub",
              "Azure VPS",
              "Facebook Graph API",
            ],
            links: [
              {
                url: "https://chathub.cloudgo.vn/",
                label: "chathub.cloudgo.vn",
              },
            ],
          },
          {
            title: "CloudWork",
            time: "Apr 2024 - Jul 2024",
            description:
              "The CloudWork app, a sub-application of the CloudGo ecosystem, enables businesses to create, assign, and manage tasks, set reminders, track progress, and evaluate work completion. It streamlines project execution and enhances team productivity for companies using CloudGo’s CRM services.",
            teamSize: 3,
            role: <Text>Front-end Developer. </Text>,
            responsibilities: [
              "Converted UI mockups into a production-ready app, ensuring accurate implementation and responsive design across devices.",
              "Integrated APIs for attendance reporting and developed a dynamic dashboard interface customizable by user preferences.",
              "Implemented lazy loading for individual components, reducing perceived waiting time and improving overall user experience.",
              "Optimized in-app search by managing filters with BloC, minimizing redundant reloads when retrieving related lists.",
            ],
            technologies: ["Flutter", "PHP", "Vtiger CRM"],
            links: [
              {
                url: "https://chathub.cloudgo.vn/",
                label: "chathub.cloudgo.vn",
              },
            ],
          },
          {
            title: "Zalo Ticket Mini App - My CloudGO",
            time: "Jan 2024 - Apr 2024",
            description:
              "Zalo Ticket Mini App – My CloudGo is a Zalo mini app built with the ZMP framework based on ReactJS. It enables CRM customers to submit feedback, report issues, and share evaluations for specific projects, streamlining communication between clients and the company while enhancing service quality and customer satisfaction.",
            teamSize: 3,
            role: <Text>Front-end Developer. </Text>,
            responsibilities: [
              "Developed user interface based on provided mockups using ZMP (ReactJS), ensuring accurate implementation and responsive design across devices.",
              "Optimized application workflows to improve usability, streamline customer feedback submission, and enhance overall user experience within the mini app.",
              "Implemented data storage handling on the mini app, ensuring smooth integration with CRM systems and reliable access to submitted customer tickets.",
            ],
            technologies: ["React.js", "Zalo Api", "ZMP"],
            links: [
              {
                url: "https://zalo.me/s/3077214972070612317/",
                label: "Zalo Mini App - My CloudGo",
              },
            ],
          },
        ]}
      />
      <DocumentTechnicalSkill />
      <DocumentAchievements />
      <DocumentCertificates />
    </DocumentLayout>
  );
}
