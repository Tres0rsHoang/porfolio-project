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
      job="Full-stack Developer (Node.js)"
      title="Hoang Quoc Bao - Full-stack developer (Node.js)"
    >
      <DocumentSummary>
        Full-stack Developer with{" "}
        <Text style={styles.bold}>2 years of professional experience </Text>in
        web development using{" "}
        <Text style={styles.bold}>
          Node.js, React.js/Next.js and Express.js/NestJS
        </Text>
        . Developed scalable RESTful APIs, implemented real-time WebSocket
        features, and designed interactive, high-performance UIs for production
        applications. Experienced with databases (
        <Text style={styles.bold}>MySQL, PostgreSQL, MongoDB</Text>), caching
        and messaging systems (
        <Text style={styles.bold}>Redis, RabbitMQ, BullMQ</Text>), and
        authentication mechanisms (
        <Text style={styles.bold}>JWT, OAuth2, SSO</Text>). Implemented and
        managed Docker-based containerization, developed CI/CD pipelines to
        automate build and deployment processes, and administered Linux servers,
        resulting in faster release cycles and enhanced workflow efficiency.
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
                    Developed and optimized backend services with
                    <Text style={styles.bold}>
                      Node.js/Express.js and PHP frameworks,
                    </Text>{" "}
                    enhancing API performance and applying design patterns to
                    significantly improve the scalability of CRM systems.
                  </Text>,
                  <Text key={1}>
                    Designed and implemented the Social Integration Hub, a
                    distributed messaging service with{" "}
                    <Text style={styles.bold}>Redis/BullMQ</Text> for queue
                    management and WebSocket.io for real-time features,
                    including monitoring and debugging tools.
                  </Text>,
                  <Text key={2}>
                    Developed server-side logic and database schemas for the CRM
                    Request Module (VtigerCRM/PHP), enabling efficient
                    information and workflow management for 3 CRM systems.
                  </Text>,
                  <Text key={3}>
                    Integrated third-party APIs (Zalo, Facebook) to implement
                    secure authentication and data exchange, enhancing user
                    connectivity for over 20 clients (Facebook Fanpages, Zalo
                    OAs) using CRM systems.
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
                  <Text key={0}>
                    Led the design and implementation of backend services using{" "}
                    <Text style={styles.bold}>Node.js/NestJS</Text>, delivering
                    RESTful APIs, controllers, and database schemas for scalable
                    web applications, resulting in a 100% improvement in
                    deployment efficiency and enabling 2 successful project
                    launches.
                  </Text>,
                  "Integrated WebSocket for real-time features and applied JWT authentication for secure access.",
                  "Built and deployed applications using Docker, GitHub Actions (CI/CD), and Linux servers, configuring SSL certificates and domain management.",
                  <Text key={1}>
                    Developed and tested frontend components with{" "}
                    <Text style={styles.bold}>Next.js</Text>, demonstrating
                    ability to integrate with HTML/CSS and modern frameworks.
                  </Text>,
                ],
              },
              {
                title: "Soft-skill Learner",
                time: "Jan 2025 - May 2025",
                description: [
                  "Actively obtained IELTS certification by preparing for and successfully completing the exam, showcasing dedication to continuous improvement in professional English proficiency.",
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
              "This portfolio website highlights my skills through an interactive platform, featuring real-time comments, user authentication, and role-based resume management. I developed this dynamic portfolio website as a Full-stack Developer, independently designing the UI/UX and implementing features such as real-time comments, user authentication, and role-based resume management using Node.js frameworks (Next.js, NestJS, Prisma, PostgreSQL), while ensuring seamless access to projects, education, and work experience.",
            technologies: [
              "Node.js",
              "Next.js/React.js",
              "Tailwindcss",
              "NestJS",
              "PrismaORM",
              "PostgreSQL",
              "Docker/Docker compose",
              "WebSocket.io",
              "Nginx",
              "Cloudflare",
              "GitHub Actions",
              "Linux Server",
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
              "Session/Passport Authentication",
              "Ejs Render/jQuery",
              "Multer",
              "Swagger",
              "MySQL",
              "Redis",
              "BullMQ",
              "WebSocket",
              "Docker/Docker Hub",
              "Azure VPS",
              "Facebook/Zalo Graph API",
            ],
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
              "Zalo Ticket Mini App – My CloudGo is a Zalo mini app built with the ZMP framework based on React Native. It enables CRM customers to submit feedback, report issues, and share evaluations for specific projects, streamlining communication between clients and the company while enhancing service quality and customer satisfaction.",
            teamSize: 3,
            role: <Text>Front-end Developer. </Text>,
            responsibilities: [
              "Developed user interface based on provided mockups using ZMP (React Native based-framework), ensuring accurate implementation and responsive design across devices.",
              "Optimized application workflows to improve usability, streamline customer feedback submission, and enhance overall user experience within the mini app.",
              "Implemented data storage handling on the mini app, ensuring smooth integration with CRM systems and reliable access to submitted customer tickets.",
            ],
            technologies: ["Node.js", "React Native", "Zalo Api", "ZMP"],
            links: [
              {
                url: "https://zalo.me/s/3077214972070612317/",
                label: "Zalo Mini App - My CloudGo",
              },
            ],
          },
        ]}
      />
      <DocumentTechnicalSkill other="" />
      <DocumentCertificates />
    </DocumentLayout>
  );
}
