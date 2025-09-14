import { Link, Text } from "@react-pdf/renderer";
import { DocumentSummary } from "./cv_summary";
import { DocumentLayout } from "./document_layout";
import { DocumentEducation } from "./document_education";
import { DocumentExperience } from "./document_expericence";
import { DocumentProjects } from "./document_projects";

export default function WebFullstackDoc() {
  return (
    <DocumentLayout title="Hoang Quoc Bao - Fullstack web developer">
      <DocumentSummary>
        I have{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          8 years of experience
        </Text>{" "}
        in learning and working with code, building a strong programming
        foundation, and 2 years of hands-on professional experience. I use
        frameworks and technologies such as{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Node.js, React.js, Next.js, NestJS, PHP, Flutter, Python, Docker, AWS,
          DigitalOcean, Google, Facebook, Zalo services, and Nginx,
        </Text>{" "}
        along with databases like{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          MySQL, PostgreSQL, MongoDB and NoSQL,
        </Text>{" "}
        to perform web and mobile development, database design, system
        architecture, and deployment, ensuring scalable and efficient solutions.
      </DocumentSummary>
      <DocumentEducation />
      <DocumentExperience
        companies={[
          {
            company: "Freelancer",
            location: "Ho Chi Minh City",
            jobs: [
              {
                title: "Software Engineer",
                time: "Jul 2025 - Present",
                description: [
                  "Designed, implemented, and deployed a personal portfolio website, including: Database schema design and API development, built services, controllers, WebSocket for realtime features, and JWT authorization, wrote test cases, configured GitHub Actions, Dockerfile, and Docker Compose, set up an Ubuntu server for deployment, configured SSL certificates for domain, and implemented dynamic DDNS for a self-hosted server, designed UX/UI and coded frontend using Next.js.",
                  "Initiated a classroom and tuition management system, including: designed user interface layouts and prepared project concepts.",
                ],
              },
              {
                title: "Softskill Learner",
                time: "Jan 2025 - May 2025",
                description: [
                  "Optimized personal development workspace with Neovim, Tmux, Sketchybar, Homerow, and custom web-developer keyboard layouts - fully mouse-free workflow",
                  "Prepared for and took the IELTS exam to obtain certification and strengthen professional English proficiency.",
                ],
              },
            ],
          },
          {
            company: "CloudGo",
            location: "Ho Chi Minh City",
            jobs: [
              {
                title: "Fullstack Software Engineer - Intern",
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
                    shop API, handling UX/UI design and market research.
                  </Text>,
                  <Text key={1}>
                    Developed web interfaces for sales reports and built
                    cross-platform mobile app using Flutter for both Android and
                    iOS.
                  </Text>,
                  "Independently implemented API integrations in PHP with the company’s CRM, ensuring seamless communication between app and backend.",
                  "Successfully completed the project with positive feedback, earning a perfect 4.0/4.0 internship evaluation.",
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
                title: "Fullstack Software Engineer - Part Time",
                time: "Aug 2023 - Dec 2024",
                description: [
                  "Contributed to most of the company’s key projects, covering front-end development, UI/UX optimization, API integration, and app performance improvements.",
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
                      Social Chat Hub
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
      <DocumentProjects projects={[]} />
    </DocumentLayout>
  );
}
