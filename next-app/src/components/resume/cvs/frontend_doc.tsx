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

export default function FrontendDoc() {
  return (
    <DocumentLayout
      job="Frontend Web Developer"
      title="Hoang Quoc Bao - Full-stack web developer"
    >
      <DocumentSummary>
        Frontend Web Developer with{" "}
        <Text style={styles.bold}>2 years of professional experience</Text>.
        Skilled in building dynamic and responsive web applications with{" "}
        <Text style={styles.bold}>React.js and Next.js,</Text> leveraging modern
        front-end frameworks to deliver exceptional user experiences. Proficient
        in integrating front-end applications with various backend
        serices/databases as needed.
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
                title: "Full-stack Developer - Intern",
                time: "Jul 2023 - Aug 2023",
                description: [
                  <Text key={0}>
                    Contributed to CloudOCS (predecessor of CloudSales), a
                    multi-channel sales app integrated with Shopee API and
                    Tiktok Shop API, by handling UX/UI design and conducting
                    market research that resulted in a 100% improvement in user
                    engagement and the implementation of more than 15 new
                    features.
                  </Text>,
                  <Text key={1}>
                    Designed intuitive web interfaces for sales reports with
                    VitgerCRM/PHP and developed a Flutter-based cross-platform
                    mobile app for Android and iOS, significantly enhancing user
                    experience and streamlining reporting across multiple
                    clients{"'"} CRM systems.
                  </Text>,
                  <Text key={2}>
                    Collaborated to implement API integrations in PHP with the
                    company’s CRM, ensuring seamless communication between the
                    app and backend.
                  </Text>,
                ],
              },
              {
                title: "Full-stack Developer",
                time: "Aug 2023 - Dec 2024",
                description: [
                  <Text key={0}>
                    Collaborated with cross-functional teams to upgrade the
                    website chat user interface using HTML/CSS, advanced the
                    Social Integration module in CRM, developed messaging
                    reports, and managed Facebook App API permission requests,
                    achieving improved user engagement by 100%.
                  </Text>,
                  <Text key={1}>
                    Designed and implemented a message distribution service that
                    manages queues via Redis, facilitates real-time messaging
                    with WebSocket.io, and includes a UI for monitoring and
                    debugging, completing the project independently within three
                    months.
                  </Text>,
                  <Text key={2}>
                    Designed database, developed UI using React.js, and
                    implemented workflows for request module, enabling employees
                    to submit proposals, feedback, and work-related documents
                    efficiently.
                  </Text>,
                  <Text key={3}>
                    Developed a mini app using ZMP (ReactJS-based) for reporting
                    issues and feedback, handling the front-end, integrating
                    APIs with CRM, and managing the company’s Zalo app.
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
                    Led the collaborative design and implementation of backend
                    services with Node.js/NestJS, developing RESTful APIs,
                    controllers, and database schemas for scalable web
                    applications, which streamlined deployment processes and
                    supported two successful project launches.
                  </Text>,
                  <Text key={1}>
                    Integrated WebSocket to deliver real-time features and
                    implemented JWT authentication for secure access, enhancing
                    system responsiveness and data protection for over 20 users.
                  </Text>,
                  "Deployed front-end applications utilizing Docker and GitHub Actions (CI/CD), while managing SSL certificates and domain configuration on Linux servers to ensure secure and efficient user access.",
                  <Text key={1}>
                    Collaborated cross-functionally to design and implement
                    innovative frontend components using Next.js, seamlessly
                    integrating HTML/CSS and modern frameworks for enhanced user
                    experiences.
                  </Text>,
                ],
              },
              {
                title: "Soft-skill Learner",
                time: "Jan 2025 - May 2025",
                description: [
                  "Earned IELTS certification by preparing for and passing the exam, demonstrating commitment to ongoing professional English development.",
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
              "react-hook-form/react-query",
              "Zustand",
              "Framer Motion",
              "i18next",
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
            title: "Social Module",
            time: "Jul 2024 - Aug 2024",
            description:
              "The Social module in CloudGO’s CRM unifies Facebook Fanpages and Zalo OA, enabling seamless campaign management and customer messaging. Built with PHP, Smarty, jQuery, Bootstrap, and WebSocket, it streamlines social interactions and improves communication efficiency within the CRM ecosystem.",
            teamSize: 3,
            role: <Text>Team Leader - Full-stack Developer. </Text>,
            responsibilities: [
              "Developed the chatbox interface within the CRM, enabling users to send, receive, and display messages seamlessly across social accounts.",
              "Integrated socket client with the Social Hub, ensuring reliable real-time synchronization of incoming and outgoing messages.",
              "Implemented dynamic UI for message queries retrieved from the Social Hub, improving readability and user interaction efficiency.",
              "Designed reporting dashboards to visualize key message statistics, supporting CRM users in tracking and analyzing communication performance.",
            ],
            technologies: ["Smarty", "jQuery", "PHP", "WebSocket", "Bootstrap"],
            links: [
              {
                url: "https://cloudgo.vn/cloudmessage-giai-phap-tin-nhan-thuong-hieu-da-kenh",
                label:
                  "cloudgo.vn/cloudmessage-giai-phap-tin-nhan-thuong-hieu-da-kenh",
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
              "Developed user interface based on provided mockups using ZMP (React Native), ensuring accurate implementation and responsive design across devices.",
              "Optimized application workflows to improve usability, streamline customer feedback submission, and enhance overall user experience within the mini app.",
              "Implemented data storage handling on the mini app, ensuring smooth integration with CRM systems and reliable access to submitted customer tickets.",
            ],
            technologies: ["React Native", "Zalo Api", "ZMP"],
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
