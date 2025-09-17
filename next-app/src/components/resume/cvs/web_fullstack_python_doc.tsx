import { Link, Text } from "@react-pdf/renderer";
import { DocumentSummary } from "./cv_summary";
import { DocumentLayout } from "./document_layout";
import { DocumentEducation } from "./document_education";
import { DocumentExperience } from "./document_expericence";
import { DocumentProjects } from "./document_projects";
import { DocumentTechnicalSkill } from "./document_technical_skill";
import { DocumentAchievements } from "./document_achievements";
import { DocumentCertificates } from "./document_certificates";

export default function WebFullstackPythonDoc() {
  return (
    <DocumentLayout
      job="Full-stack Web Developer"
      title="Hoang Quoc Bao - Full-stack web developer"
    >
      <DocumentSummary>
        Full-stack Web Developer with{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          2+ years of professional experience and 8+ years
        </Text>{" "}
        of coding background through academic, freelance, and project-based
        work, building a strong programming foundation equivalent to 4+ years of
        hands-on development. Skilled in developing scalable web applications
        using{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Node.js, NestJS, React.js, Next.js, PHP, and Python
        </Text>
        . Proficient with{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          MySQL, PostgreSQL, and MongoDB.
        </Text>{" "}
        Experienced in{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Docker, CI/CD, and Cloud Deployment,
        </Text>{" "}
        delivering efficient and reliable solutions. Strong foundation in
        algorithms and data structures, applied in building scalable systems and
        proven through competitive programming contests.
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
                  <Text key={1}>
                    Developed web interfaces for sales reports and built
                    cross-platform mobile app using Flutter for both Android and
                    iOS.
                  </Text>,
                  "Independently implemented API integrations in PHP with the company’s CRM, ensuring seamless communication between app and backend.",
                  <Text key={3}>
                    <Link
                      src="https://cloudgo.vn/cloudmessage-giai-phap-tin-nhan-thuong-hieu-da-kenh"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      CloudMessages
                    </Link>
                    : Supported multi-channel chat project by researching and
                    integrating Facebook Fanpage Chat API at developer level
                    (pending production approval).
                  </Text>,
                ],
              },
              {
                title: "Full-stack Developer - Part Time",
                time: "Aug 2023 - Dec 2024",
                description: [
                  <Text key={0}>
                    <Link
                      src="https://cloudgo.vn/cloudmessage-giai-phap-tin-nhan-thuong-hieu-da-kenh"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      CloudMessages
                    </Link>
                    : Upgraded website chat UI, contributed to Social
                    Integration module in CRM, added messaging reports, and
                    handled Facebook App API permission requests.
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
                  "Optimized personal development workspace with Neovim, Tmux, Sketchybar, Homerow, and custom web-developer keyboard layouts - fully mouse-free workflow.",
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
            teamSize: 1,
            role: <Text>Full-stack Developer. </Text>,
            responsibilities: [
              "Designed and implemented the entire Social Integration Hub service using Express.js, ensuring reliable message routing between CRMs.",
              "Built message storage with MySQL, optimized queries with indexes for fast retrieval, and maintained scalable database performance.",
              "Implemented reliable message forwarding through BullMQ and Redis queues, handling up to 200 messages per minute.",
              "Developed real-time message delivery with WebSocket, ensuring seamless integration with client CRM systems.",
              "Designed and built an administration dashboard for monitoring and managing queues across multiple CRM systems.",
              "Registered and configured extended Facebook App API permissions to enable advanced message integration features.",
              "Wrote API docs with Swagger collections",
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
            title: "Social Module",
            time: "Jul 2024 - Aug 2024",
            description:
              "The Social module in CloudGO’s CRM unifies Facebook Fanpages and Zalo OA, enabling seamless campaign management and customer messaging. Built with PHP, Smarty, JQuery, Bootstrap, and WebSocket, it streamlines social interactions and improves communication efficiency within the CRM ecosystem.",
            teamSize: 2,
            role: <Text>Full-stack Developer. </Text>,
            responsibilities: [
              "Developed the chatbox interface within the CRM, enabling users to send, receive, and display messages seamlessly across social accounts.",
              "Integrated socket client with the Social Hub, ensuring reliable real-time synchronization of incoming and outgoing messages.",
              "Implemented dynamic UI for message queries retrieved from the Social Hub, improving readability and user interaction efficiency.",
              "Designed reporting dashboards to visualize key message statistics, supporting CRM users in tracking and analyzing communication performance.",
              "Wrote API docs with Postman collections",
              "Maintained project documentation on Trello",
            ],
            technologies: ["Smarty", "JQuery", "PHP", "WebSocket", "Bootstrap"],
            links: [
              {
                url: "https://cloudgo.vn/cloudmessage-giai-phap-tin-nhan-thuong-hieu-da-kenh",
                label:
                  "cloudgo.vn/cloudmessage-giai-phap-tin-nhan-thuong-hieu-da-kenh",
              },
            ],
          },
          {
            title: "Gold Price Lookup Software",
            time: "Jul 2021 - Aug 2021",
            description:
              "This academic project, developed from July to August 2021 for a Computer Networks course, was a Python-based application for gold price lookup. It featured a Tkinter GUI, user authentication (account creation, login, registration), and data crawling from websites. The system communicated via Python socket programming and received a final grade of 9/10.",
            teamSize: 2,
            role: <Text>Team Leader - Full-stack Developer.</Text>,
            responsibilities: [
              "Designed the UI and implemented user workflows, including registration and login functionality, connecting client app with the server.",
              "Processed crawled gold price data using the BeautifulSoup library for reliable extraction and presentation.",
              "Managed project progress and task allocation using Trello for team collaboration and tracking.",
            ],
            technologies: [
              "Python",
              "Tkinter",
              "BeautifulSoup",
              "Python Socket",
            ],
            links: [
              {
                url: "https://github.com/Tres0rsHoang/DAMMT_CK",
                label: "Github.com/Tres0rsHoang/DAMMT_CK",
              },
            ],
          },
          {
            title: "Remote Computer Control Solfware",
            time: "Jun 2021 - Jul 2021",
            description:
              "A Python-based remote administration tool enabling remote control, screenshot capture, keystroke logging, and registry modification, built with a client–server architecture for secure systems management.",
            teamSize: 10,
            role: <Text>Team Leader - Full-stack Developer.</Text>,
            responsibilities: [
              "Planned and coordinated project execution as team leader, managing timelines and task allocation for a 10-member team via Trello.",
              "Implemented key features such as screenshot capture and Windows registry modification on both client and server sides.",
            ],
            technologies: ["Python", "Tkinter", "Python Socket"],
            links: [
              {
                url: "https://github.com/Tres0rsHoang/DoAnMMT",
                label: "Github.com/Tres0rsHoang/DoAnMMT",
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
