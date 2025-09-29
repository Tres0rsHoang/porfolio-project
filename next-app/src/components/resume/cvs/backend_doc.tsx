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
      job="Fresher Backend Developer"
      title="Hoang Quoc Bao - Backend developer"
    >
      <DocumentSummary>
        Backend Developer with{" "}
        <Text style={styles.bold}>8 years of coding experience</Text> and{" "}
        <Text style={styles.bold}>over 2 years of professional experience</Text>{" "}
        in web and mobile development. Skilled in{" "}
        <Text style={styles.bold}>Node.js </Text>and{" "}
        <Text style={styles.bold}>RESTful API design,</Text> with hands-on
        experience building{" "}
        <Text style={styles.bold}>
          data processing systems, account management services, and platform
          integration tools.
        </Text>{" "}
        Proficient in{" "}
        <Text style={styles.bold}>
          SQL/NoSQL databases (MySQL, PostgreSQL, MongoDB), Linux environments,
        </Text>{" "}
        and <Text style={styles.bold}>distributed message queues</Text>.
        Experienced with{" "}
        <Text style={styles.bold}>
          CI/CD, Docker, Git, and cloud platforms (Azure, GCP, DigitalOcean)
        </Text>
        . Strong foundation in{" "}
        <Text style={styles.bold}>
          algorithms, data structures, and system design,
        </Text>{" "}
        backed by a{" "}
        <Text style={styles.bold}>B.Sc. in Software Engineering</Text> from
        <Text style={styles.bold}>VNU-HCM University of Science</Text>.
        Passionate about scalable backend systems and eager to contribute to
        <Text style={styles.bold}> game publishing platforms</Text>.
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
                time: "Jun 2025 - Present",
                description: [
                  <Text key={0}>
                    <Link
                      src="https://www.baohomeserver.uk/"
                      style={{ textDecoration: "none" }}
                    >
                      Bao Hoang Portfolio
                    </Link>
                    : Developed and deployed a full-stack website with database
                    schema, APIs, WebSocket real-time features, and JWT auth;
                    built frontend in Next.js, implemented CI/CD with Docker and
                    GitHub Actions, and deployed on a secure self-hosted Linux
                    server.
                  </Text>,
                  "Initiated a classroom and tuition management system, including: designed user interface layouts and prepared project concepts.",
                ],
              },
              {
                title: "Softskill Learner",
                time: "Jan 2025 - May 2025",
                description: [
                  "Optimized personal development workspace with Neovim, Tmux, Sketchybar, Homerow, Aerospace and custom keyboard layouts - fully mouse-free workflow.",
                  <Text key={1}>
                    Prepared for and took the IELTS exam to obtain certification
                    and strengthen professional English proficiency.
                  </Text>,
                ],
              },
              {
                title: "Game Plugin Developer",
                time: "Jan 2023 - May 2023",
                description: [
                  "Developed custom Minecraft server plugins and Project Zomboid mods to enhance gameplay.",
                  "Deployed and managed Minecraft servers on Linux using AWS and Docker, ensuring stable performance and scalability.",
                ],
              },
            ],
          },
        ]}
      />
      <DocumentProjects
        projects={[
          {
            title: "TheraCPP",
            time: "Jan 2024 - Aug 2024",
            description:
              "TheraCPP is my graduation project game built with Unity to teach C++ programming through gamified levels. Featuring drag-and-drop (Scratch-like), C++ syntax assembly, and full coding modes, it engages learners of all ages, especially students and beginners. The backend, powered by NestJS and PlayFab, executes code and manages users. Officially published on both Google Play and App Store, it achieved the highest graduation score (9.4/10) and is currently hosted on DigitalOcean for continued development.",
            teamSize: 5,
            role: <Text>Team Leader - Full-stack Developer. </Text>,
            responsibilities: [
              "Led the team as project manager, assigning tasks, planning milestones, and tracking progress throughout development.",
              "Designed several game levels and gameplay flows, especially for the Normal difficulty coding challenges.",
              "Implemented backend logic in NestJS for executing user-submitted C++ programs and handling gameplay workflows.",
            ],
            technologies: [
              "Unity",
              "PlayFab",
              "DigitalOcean",
              "GitHub Actions",
              "NestJs",
              "PostgreSQL",
              "Jira",
            ],
            links: [
              {
                url: "https://play.google.com/store/apps/details?id=com.datn.theracpp&hl=vi",
                label: "TheraCPP (CH Play)",
              },
              {
                url: "https://apps.apple.com/vn/app/theracpp-learn-c-coding/id6575351503",
                label: "TheraCPP (iOS)",
              },
            ],
          },
          {
            title: "Lucky Money Mod – Project Zomboid (SeederVN Community)",
            time: "Jan 2023 - Mar 2023",
            description:
              "Developed a mod adding lì xì (lucky money envelopes) into Project Zomboid, where players receive random amounts of in-game currency configured by admins. Envelopes spawn across game areas. Written in Lua with 3D models designed in Blender. Published on Steam Workshop with 400+ downloads.",
            teamSize: 2,
            role: <Text>Team Leader - Full-stack Developer. </Text>,
            responsibilities: [
              "Implemented the lucky money item and random reward system, designed server-side database for currency storage and transaction history, and integrated player interactions.",
            ],
            technologies: [
              "Lua",
              "Blender (3D modeling)",
              "PostgreSQL",
              "Steam Workshop",
            ],
            links: [
              {
                url: "https://steamcommunity.com/sharedfiles/filedetails/?id=2919687915",
                label: "Steam Workshop (LuckyMoney - Project Zomboid)",
              },
            ],
          },
          {
            title: "Little Fox Adventure – 2D Top-down Game",
            time: "Jun 2023 - Aug 2023",
            description:
              "A pixel-art 2D top-down adventure game built with Unity, telling the story of a small fox on a journey to rescue his mother. Achieved 8.0/10 in practical grading.",
            teamSize: 1,
            role: <Text>Full-stack Developer. </Text>,
            responsibilities: [
              "Solo project — designed levels, created pixel-art assets for characters and monsters, implemented gameplay mechanics, and developed complete stages.",
            ],
            technologies: ["Unity", "Asesprite", "Jira"],
            links: [
              {
                url: "https://github.com/Tres0rsHoang/Unity-Learning.git",
                label: "Github.com/Tres0rsHoang/Unity-Learning",
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
