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

export default function GameFullstackDoc() {
  return (
    <DocumentLayout
      job="Fresher Game Developer"
      title="Hoang Quoc Bao - Game developer"
    >
      <DocumentSummary>
        Fresher Game Developer with 8 years of coding experience and hands-on
        expertise in <Text style={styles.bold}>Unity</Text> and{" "}
        <Text style={styles.bold}>C# programming</Text>. Skilled in{" "}
        <Text style={styles.bold}>
          2D/3D programming, action game development, characters, dungeons,
          combat systems, and UI
        </Text>
        . Experienced in{" "}
        <Text style={styles.bold}>
          optimization, profiling, build environment improvements, and plugin
          integration
        </Text>
        . Strong foundation in{" "}
        <Text style={styles.bold}>
          data structures, algorithms, game physics, and mathematics
        </Text>
        , with passion and dedication for game development.
      </DocumentSummary>
      <DocumentEducation />
      <DocumentAchievements />
      <DocumentExperience
        companies={[
          {
            company: "CloudGo",
            location: "Ho Chi Minh City",
            period: "1 year 7 months",
            jobs: [
              {
                title: "Full-stack Developer",
                time: "Jul 2023 - Dec 2024",
                description: [
                  "Developed and optimized web and mobile apps in the CloudGo ecosystem, including CloudOCS, CloudSales, and CloudWork, by converting mockups to production-ready UI, integrating APIs, and enhancing performance with lazy loading and real-time chat.",
                  "Improved CloudGo Super App by optimizing API calls and storage, reducing login time from 10–20s to 2–3s; published to App Store and Google Play, and managed TestFlight releases.",
                  "Designed and delivered the Social Integration Hub, a real-time messaging service with Redis and WebSocket.io, including monitoring tools and debugging UI.",
                  "Built mini apps such as the Zalo Ticket Mini App using ZMP (ReactJS-based) for issue reporting and CRM integration.",
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
                time: "Jun 2025 - Present",
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
              "Designed and implemented multiple game levels and gameplay flows across Beginner, Intermediate, and Normal difficulties on Unity.",
              "Developed interactive coding mechanics, including drag-and-drop and syntax assembly systems, to enhance learning engagement.",
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
