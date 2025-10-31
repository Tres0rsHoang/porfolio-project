import { Text } from "@react-pdf/renderer";
import { DocumentSummary } from "./cv_summary";
import { DocumentLayout } from "./document_layout";
import { DocumentEducation } from "./document_education";
import { DocumentActivity, DocumentExperience } from "./document_expericence";
import { DocumentProjects } from "./document_projects";
import { DocumentTechnicalSkill } from "./document_technical_skill";
import { DocumentAchievements } from "./document_achievements";
import { DocumentCertificates } from "./document_certificates";
import { documentStyle as styles } from "./document_styles";

export default function FullstackNodeJsDoc() {
  return (
    <DocumentLayout
      job="Full-stack Developer"
      title="Hoang Quoc Bao - Full-stack developer (Node.js)"
    >
      <DocumentSummary>
        Fullstack JavaScript Developer with{" "}
        <Text style={styles.bold}>2 years of professional experience</Text> in
        web development using{" "}
        <Text style={styles.bold}>
          Node.js, React.js/Next.js and Express.js/NestJS
        </Text>
        . Skilled in building scalable{" "}
        <Text style={styles.bold}>
          RESTful APIs, real-time WebSocket features
        </Text>
        , and interactive, high-performance UIs. Experienced with databases{" "}
        <Text style={styles.bold}>(MySQL, PostgreSQL, MongoDB)</Text>, caching
        and messaging systems{" "}
        <Text style={styles.bold}>(Redis, RabbitMQ, BullMQ),</Text> and
        authentication mechanisms{" "}
        <Text style={styles.bold}>(JWT, OAuth2, SSO).</Text> Proficient in
        DevOps practices including{" "}
        <Text style={styles.bold}>
          Docker, CI/CD, and Linux server management
        </Text>
        . Also experienced integrating{" "}
        <Text style={styles.bold}>Flutter/Dart </Text>for mobile platforms,
        delivering end-to-end, production-ready applications across web and
        mobile.
      </DocumentSummary>
      <DocumentEducation />
      <DocumentAchievements />
      <DocumentExperience
        companies={[
          {
            company: "CloudGo",
            period: "1 year 7 months",
            location: "Ho Chi Minh City",
            jobs: [
              {
                title: "Full-stack Developer",
                time: "Jul 2023 - Dec 2024",
                description: [
                  <Text key={0}>
                    Built and optimized backend services using Node.js,
                    improving API performance and applying design patterns for
                    scalability across CRM sub-apps.
                  </Text>,
                  <Text key={1}>
                    Designed and implemented the Social Integration Hub, a
                    distributed messaging service with Redis for queue
                    management and WebSocket.io for real-time features,
                    including monitoring and debugging tools.
                  </Text>,
                  <Text key={2}>
                    Developed server-side logic and database schemas for the CRM
                    Request Module, enabling efficient information and workflow
                    management.
                  </Text>,
                  <Text key={3}>
                    Integrated external APIs (Zalo, Facebook) and implemented
                    secure communication flows, supporting authentication and
                    data exchange.
                  </Text>,
                  <Text key={4}>
                    Contributed to mobile integration by improving API calls and
                    publishing the CloudGo Super App (Flutter/Dart) to both App
                    Store and Google Play, managing TestFlight releases and
                    deployment cycles.
                  </Text>,
                  <Text key={5}>
                    Contributed to CloudSales, a multi-channel sales app,
                    integrated with Shopee, Tiktok Shop, Facebook, Zalo API
                    handling UX/UI design and market research.
                  </Text>,
                  <Text key={6}>
                    Developed web interfaces for sales reports and built
                    cross-platform mobile app using Flutter for both Android and
                    iOS.
                  </Text>,
                ],
              },
            ],
          },
        ]}
      />
      <DocumentActivity
        companies={[
          {
            company: "Freelancer",
            period: "5 months",
            location: "Ho Chi Minh City",
            jobs: [
              {
                title: "Full-stack Developer",
                time: "Jul 2025 - Present",
                description: [
                  "Designed and implemented backend services with Node.js, including RESTful APIs, controllers, and database schemas for scalable web applications.",
                  "Integrated WebSocket for real-time features and applied JWT authentication for secure access.",
                  "Built and deployed applications using Docker, GitHub Actions (CI/CD), and Linux servers, configuring SSL certificates and domain management.",
                  "Developed and tested frontend components with Next.js, demonstrating ability to integrate with HTML/CSS and modern frameworks.",
                  "Initiated a classroom and tuition management system, preparing UI layouts and backend concepts for future development.",
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
      <DocumentProjects
        projects={[
          {
            title: "Social Integration Hub",
            time: "Apr 2024 - Jul 2024",
            description:
              "The Social Integration Hub is a service that routes messages from multiple Facebook Fanpages and Zalo OA accounts to client-registered CRM systems. Built with Express.js, MySQL, Redis, and BullMQ, it supports real-time delivery via WebSocket and runs reliably in production, handling 100–200 messages per minute with low latency.",
            teamSize: 1,
            role: <Text>Full-stack Developer. </Text>,
            responsibilities: [
              "Developed and maintained backend services with Express.js/Node.js, routing messages from multiple social platforms (Facebook, Zalo) to client CRMs.",
              "Implemented real-time delivery using WebSocket and reliable message forwarding with Redis queues (BullMQ), processing 100–200 messages per minute with low latency.",
              "Designed RDBMS schema in MySQL, optimized queries, and ensured scalable data storage and retrieval.",
              "Built an administration dashboard for monitoring and managing distributed queues.",
              "Configured authentication and API permissions for Facebook integrations, ensuring secure and seamless platform connectivity.",
              "Containerized and deployed the system on Azure VPS with Docker, enabling automated, consistent, and scalable deployments.",
            ],
            technologies: [
              "Node.js",
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
            title: "Portfolio Project",
            time: "Aug 2025 - Present",
            description:
              "This portfolio website highlights my skills through an interactive platform, featuring real-time comments, user authentication, and role-based resume management. I designed the UI/UX and built the site with Node.js frameworks, including: Next.js, NestJS, Prisma, and PostgreSQL, enabling seamless access to projects, education, and work experience.",
            teamSize: 1,
            role: <Text>Full-stack Developer. </Text>,
            responsibilities: [
              "Developed backend services using NestJS/Node.js, with RESTful APIs, Prisma ORM, and PostgreSQL for data management.",
              "Implemented a real-time comment system with WebSocket.io and secured authentication using JWT and Google OAuth.",
              "Built the frontend with Next.js, HTML/CSS, and TailwindCSS, ensuring seamless integration with backend APIs.",
              "Containerized the application with Docker, automated CI/CD using GitHub Actions, and deployed on a self-hosted Linux server with Nginx and Cloudflare, covering testing, staging, and production deployment with zero downtime.",
              "Designed and managed DevOps pipelines, SSL certificates, and domain configuration, gaining familiarity with distributed systems, caching concepts, and deployment practices.",
            ],
            technologies: [
              "Node.js",
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
            technologies: ["Node.js", "React.js", "Zalo Api", "ZMP"],
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
