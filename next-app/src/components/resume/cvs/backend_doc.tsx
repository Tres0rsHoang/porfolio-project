import { Link, Text } from "@react-pdf/renderer";
import { documentStyle as styles } from "./document_styles";
import { DocumentSummary } from "./cv_summary";
import { DocumentLayout } from "./document_layout";
import { DocumentEducation } from "./document_education";
import { DocumentActivity, DocumentExperience } from "./document_expericence";
import { DocumentProjects } from "./document_projects";
import { DocumentTechnicalSkill } from "./document_technical_skill";
import { DocumentAchievements } from "./document_achievements";
import { DocumentCertificates } from "./document_certificates";

export default function BackendDoc() {
  return (
    <DocumentLayout
      job="Backend Developer"
      title="Hoang Quoc Bao - Backend developer"
    >
      <DocumentSummary>
        Backend Developer with{" "}
        <Text style={styles.bold}>8 years of coding experience </Text>and{" "}
        <Text style={styles.bold}>over 2 years of professional experience</Text>{" "}
        in web and mobile application development. Skilled in building and
        optimizing <Text style={styles.bold}>RESTful</Text> and{" "}
        <Text style={styles.bold}>Graph APIs </Text>using{" "}
        <Text style={styles.bold}>Node.js</Text> and
        <Text style={styles.bold}> PHP</Text>, with strong knowledge of
        relational databases such as <Text style={styles.bold}>MySQL </Text>and{" "}
        <Text style={styles.bold}>PostgreSQL</Text>. Experienced in designing
        efficient data structures, implementing caching strategies, and
        improving system reliability. Proficient with{" "}
        <Text style={styles.bold}>Docker, Git, and modern CI/CD workflows</Text>
        , and familiar with cloud environments like{" "}
        <Text style={styles.bold}>GCP and Azure</Text>. Passionate about
        building scalable, secure backend systems that power social and
        content-driven platforms.
      </DocumentSummary>
      <DocumentEducation />
      <DocumentAchievements />
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
                    : Implemented and optimized API integrations between the
                    company’s CRM and third-party platforms (Shopee API, TikTok
                    Shop API), ensuring seamless data flow and system
                    reliability.
                  </Text>,
                  "Developed and maintained backend APIs in PHP, improving communication efficiency and extending CRM functionalities.",
                  "Enhanced existing APIs for better performance and scalability, contributing to smoother sales reporting and data processing workflows.",
                  <Text key={1}>
                    Developed web interfaces for sales reports and built
                    cross-platform mobile app using Flutter for both Android and
                    iOS.
                  </Text>,
                ],
              },
              {
                title: "Full-stack Developer",
                time: "Aug 2023 - Dec 2024",
                description: [
                  <Text key={0}>
                    <Link
                      src="https://chathub.cloudgo.vn/admin/login?redirect=dashboard"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      Social Integration Hub
                    </Link>
                    : Designed and implemented a backend service for
                    distributing messages across multiple platforms, using Redis
                    for queue management and WebSocket.io for real-time
                    delivery. Built monitoring and debugging tools to ensure
                    stability in production.
                  </Text>,
                  <Text key={1}>
                    <Link
                      src="https://cloudgo.vn/cloudwork-giai-phap-quan-ly-cong-viec-tinh-gon"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      CRM Request Module
                    </Link>
                    : Designed RDBMS schemas and implemented server-side logic
                    for the CRM Module, supporting efficient information
                    management and approval workflows.
                  </Text>,
                  <Text key={2}>
                    <Link
                      src="https://cloudgo.vn/cloudmessage-giai-phap-tin-nhan-thuong-hieu-da-kenh"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      CloudMessages
                    </Link>
                    : Developed and optimized RESTful APIs for CRM modules,
                    improving data workflows and enabling seamless integration
                    with third-party services (e.g., Facebook, Zalo).
                  </Text>,
                  "Integrated external APIs and managed authentication flows (e.g., Facebook App API permissions, Zalo API), ensuring secure and reliable communication between systems.",
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
            location: "Ho Chi Minh City",
            jobs: [
              {
                title: "Full-stack Developer",
                time: "Jul 2025 - Present",
                description: [
                  <Text key={0}>
                    Designed, implemented, and deployed a website, including:
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
                  "Optimized personal development workspace with Neovim, Tmux, Sketchybar, Homerow, Yabai and custom web-developer keyboard layouts - fully mouse-free workflow.",
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
            title: "Social Integration Hub",
            time: "Apr 2024 - Jul 2024",
            description:
              "The Social Integration Hub is a service that routes messages from multiple Facebook Fanpages and Zalo OA accounts to client-registered CRM systems. Built with Express.js, MySQL, Redis, and BullMQ, it supports real-time delivery via WebSocket and runs reliably in production, handling 100–200 messages per minute with low latency.",
            teamSize: 2,
            role: <Text>Full-stack Developer.</Text>,
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
            title: "Request CRM Module",
            time: "Aug 2024 – Oct 2024",
            description:
              "The Request CRM Module is part of CloudGO’s CloudWork platform, designed to manage internal workflow proposals and approval processes. It allows users to create workflow templates, execute multi-step processes, assign responsible members, request document revisions, and send automated reminders. The module integrates tightly with the CloudWork app through Graph APIs for smooth, real-time operation across platforms.",
            teamSize: 3,
            role: <Text>Backend Developer</Text>,
            responsibilities: [
              "Designed the database schema and relationships for the Request CRM Module to support complex workflow and approval logic.",
              "Implemented key backend features including workflow template creation, process execution, user assignment, document revision requests, and automated reminders.",
              "Developed Graph APIs to enable seamless integration between the module and the CloudWork web and mobile applications.",
              "Ensured process reliability and data integrity across multiple workflow stages through transaction-safe logic and consistent validation.",
              "Collaborated with frontend and product teams to refine API requirements and improve user experience in workflow execution.",
              "Deployed and tested the module within the CloudGO CRM ecosystem, ensuring high availability and consistent performance.",
              "Built and implemented the web interface for visualizing ongoing workflow steps within the CloudGO CRM system, improving transparency and user experience.",
            ],
            technologies: ["PHP", "MySQL", "GraphAPI", "Git", "Docker"],
            links: [
              {
                url: "https://cloudgo.vn/cloudwork-giai-phap-quan-ly-cong-viec-tinh-gon",
                label:
                  "Cloudgo.vn/cloudwork-giai-phap-quan-ly-cong-viec-tinh-gon",
              },
            ],
          },
        ]}
      />
      <DocumentTechnicalSkill
        frontend="Node.js, React, Next.js, Tailwind CSS, Bootstrap, ShadCN, MUI, Smarty (PHP), Jquery, Flutter, React Native."
        backend="Node.js, NestJS, Express.js, Prisma, MySQL, PostgreSQL, MongoDB."
      />
      <DocumentCertificates />
    </DocumentLayout>
  );
}
