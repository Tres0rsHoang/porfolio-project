import { Link, Text } from "@react-pdf/renderer";
import { DocumentSummary } from "./cv_summary";
import { DocumentLayout } from "./document_layout";
import { DocumentEducation } from "./document_education";
import { DocumentActivity, DocumentExperience } from "./document_expericence";
import { DocumentProjects } from "./document_projects";
import { DocumentTechnicalSkill } from "./document_technical_skill";
import { DocumentAchievements } from "./document_achievements";
import { DocumentCertificates } from "./document_certificates";

export default function FullstackDoc() {
  return (
    <DocumentLayout
      job="Full-stack Developer"
      title="Hoang Quoc Bao - Full-stack developer"
    >
      <DocumentSummary>
        A Fullstack Developer with{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          8 years of coding experience and 2+ years professional experience{" "}
        </Text>
        in web and mobile development. Skilled in{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Node.js, ReactJS, React Native, NextJS, Flutter, styled-components,
          and deploying apps to App Store and Google Play
        </Text>
        . Experienced with{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          TypeScript, Express.js, NestJS, .NET, PHP, databases (MySQL,
          PostgreSQL, MongoDB, SQLite), REST APIs, and integrating Google,
          Facebook, Zalo services
        </Text>
        . Proficient in DevOps tools including{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Git, Docker, CI/CD, Nginx, Cloudflare, Azure, DigitalOcean, and Google
          Cloud
        </Text>
        , delivering scalable, production-ready applications while maintaining
        clear technical documentation.
      </DocumentSummary>
      <DocumentEducation />
      <DocumentAchievements />
      <DocumentActivity
        companies={[
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
                    : Designed, implemented, and deployed a website using
                    Node.js frameworks, including: Database schema design and
                    API development, built services, controllers, WebSocket for
                    realtime features, and JWT authorization, wrote test cases,
                    configured GitHub Actions, Dockerfile, and Docker Compose,
                    set up an Ubuntu server for deployment, configured SSL
                    certificates for domain, and implemented dynamic DDNS for a
                    self-hosted server, designed UX/UI and coded frontend using
                    Next.js.
                  </Text>,
                  "Initiated a classroom and tuition management system, including: designed user interface layouts and prepared project concepts.",
                ],
              },
              {
                title: "Softskill Learner",
                time: "Jan 2025 - May 2025",
                description: [
                  "Optimized personal development workspace with Neovim, Tmux, Sketchybar, Homerow, Yabai and custom keyboard layouts - fully mouse-free workflow.",
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
                  <Text key={1}>
                    Developed web interfaces for sales reports and built
                    cross-platform mobile app using Flutter for both Android and
                    iOS.
                  </Text>,
                  "Independently implemented API integrations in PHP with the company’s CRM, ensuring seamless communication between app and backend.",
                ],
              },
              {
                title: "Full-stack Developer",
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
                      src="https://cloudgo.vn/cloudwork-giai-phap-quan-ly-cong-viec-tinh-gon"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      CRM Request Module
                    </Link>
                    : Designed database, developed UI, and implemented workflows
                    for request module, enabling employees to submit proposals,
                    feedback, and work-related documents efficiently.
                  </Text>,
                  <Text key={3}>
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
        ]}
      />
      <DocumentProjects
        projects={[
          {
            title: "Portfolio Project",
            time: "Aug 2025 - Present",
            description:
              "This portfolio website highlights my skills through an interactive platform, featuring real-time comments, user authentication, and role-based resume management. I designed the UI/UX and built the site with Next.js, NestJS, Prisma, and PostgreSQL, enabling seamless access to projects, education, and work experience.",
            teamSize: 1,
            role: <Text>Full-stack Developer. </Text>,
            responsibilities: [
              "Designed the UI and developed UX concepts for a polished and intuitive portfolio website.",
              "Implemented a real-time comment system using WebSocket.io and user authentication with Google/email login.",
              "Secured API access using JWT cookies and configured proper CORS policies.",
              "Built front-end with Next.js and back-end with NestJS, integrating Prisma ORM with PostgreSQL.",
              "Managed full DevOps pipeline including domain setup, dynamic DDNS, Cloudflare, self-hosted Ubuntu server, and Nginx reverse proxy.",
              "Automated CI/CD workflow with GitHub Actions, covering testing, staging, and production deployment with zero downtime.",
            ],
            technologies: [
              "Next.js / Three.js / React.js",
              "Tailwindcss",
              "NestJS",
              "JWT Authentication",
              "Prisma ORM",
              "PostgreSQL",
              "Docker",
              "WebSocket.io",
              "Nginx",
              "Cloudflare",
              "GitHub Actions",
              "Google OAuth",
              "Ubuntu Server",
              "CI/CD",
            ],
            links: [
              {
                label: "www.baohomeserver.uk",
                url: "https://www.baohomeserver.uk",
              },
            ],
          },
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
            title: "Grab Clone Project",
            time: "May 2023 - Aug 2023",
            description:
              "Grab-Clone is an academic project simulating Grab’s ride-hailing features, built with React Native (client app), React.js (web), Flutter (driver app), and .NET backend. Orders are processed via RabbitMQ queues and matched to the nearest driver. The system was deployed on DigitalOcean with GitHub Actions CI/CD and achieved a 9.0/10 course grade.",
            teamSize: 5,
            role: <Text>Team Leader - Full-stack Developer. </Text>,
            responsibilities: [
              "Led a team of developers, assigned tasks, and tracked progress using Jira to ensure timely project delivery.",
              "Designed and implemented the database schema in PostgreSQL, ensuring efficient data storage and query performance.",
              "Built ride-booking flows with RabbitMQ queues and .NET backend for reliable driver-client matching.",
              "Developed client UI in React Native and contributed to Flutter driver app features and workflows.",
              "Managed CI/CD pipelines with GitHub Actions for automated deployment of the backend to DigitalOcean.",
            ],
            technologies: [
              "React Native",
              "Flutter",
              "React.js",
              ".NET",
              "RabbitMQ",
              "Redis",
              "PostgreSQL",
              "DigitalOcean",
              "GitHub Actions",
              "Jira",
            ],
            links: [
              {
                url: "https://github.com/Tres0rsHoang/Grab-Clone-Project",
                label:
                  "Github.com/Tres0rsHoang/Grab-Clone-Project (Fork from hieucckha/intro-to-software-architecture)",
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
      <DocumentCertificates />
    </DocumentLayout>
  );
}
