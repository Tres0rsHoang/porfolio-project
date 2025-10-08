import { Text, View } from "@react-pdf/renderer";
import { documentStyle as styles } from "./document_styles";

interface DocumentTechnicalSkillProps {
  languages?: string;
  frontend?: string;
  backend?: string;
  devops?: string;
  other?: string;
}

export const DocumentTechnicalSkill = ({
  languages = "TypeScript/JavaScript, Python, C#, C/C++, Java, PHP, Dart, Lua.",
  frontend = "Node.js, React, Next.js, Three.js, Tailwind CSS, Bootstrap, ShadCN,MUI, ZMP, Smarty (PHP), Jquery, Flutter, React Native.",
  backend = "Node.js, NestJS, Express.js, Prisma, MySQL, PostgreSQL, MongoDB.",
  devops = "Docker, Docker Compose, Azure, Digital Ocean, Google Cloud,Cloudflare, GitHub Actions (CI/CD), Nginx, Ngrok, Unix/Linux OS.",
  other = "Git, Postman, Jira, Trello, Neovim, Navicat, VSCode, OOP, Design Patterns, SOLID Principles, RESTful API, GraphQL, Microservices, WebSocket, RabitMQ, BullMQ, Jest, Redis, Scrum Methodology.",
}: DocumentTechnicalSkillProps) => {
  return (
    <View>
      <Text style={styles.h4}>Technical Skills</Text>
      <View style={styles.hr}></View>
      <View style={styles.content}>
        <Text style={{ marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Languages</Text>
          {": "}
          {languages}
        </Text>
        <Text style={{ marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Frontend</Text>
          {": "}
          {frontend}
        </Text>
        <Text style={{ marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Backend</Text>
          {": "}
          {backend}
        </Text>
        <Text style={{ marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold" }}>DevOps</Text>
          {": "}
          {devops}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Tools/Others</Text>
          {": "}
          {other}
        </Text>
      </View>
    </View>
  );
};
