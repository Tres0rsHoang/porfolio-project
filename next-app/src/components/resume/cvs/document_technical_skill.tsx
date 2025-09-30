import { Text, View } from "@react-pdf/renderer";
import { documentStyle as styles } from "./document_styles";

interface TechnicalDocumentProp {}

export const DocumentTechnicalSkill = () => {
  return (
    <View>
      <Text style={styles.h4}>Technical Skills</Text>
      <View style={styles.hr}></View>
      <View style={styles.content}>
        <Text style={{ marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Languages</Text>
          {": "}
          TypeScript/JavaScript, Python, C#, C/C++, Java, PHP, Dart, Lua.
        </Text>
        <Text style={{ marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Frontend</Text>
          {": "}
          Node.js, React, Next.js, Three.js, Tailwind CSS, Bootstrap, ShadCN,
          MUI, ZMP, Smarty (PHP), Jquery, Flutter, React Native.
        </Text>
        <Text style={{ marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Backend</Text>
          {": "}
          Node.js, NestJS, Express.js, Prisma, MySQL, PostgreSQL, MongoDB.
        </Text>
        <Text style={{ marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold" }}>DevOps</Text>
          {": "}
          Docker, Docker Compose, Azure, Digital Ocean, Google Cloud,
          Cloudflare, GitHub Actions (CI/CD), Nginx, Ngrok, Unix/Linux VPS.
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Tools/Others</Text>
          {": "}
          Git, Postman, Jira, Trello, Neovim, Navicat, VSCode, OOP, Design
          Patterns, SOLID Principles, RESTful API, GraphQL, Microservices,
          WebSocket, RabitMQ, BullMQ, Jest, Redis, Scrum Methodology.
        </Text>
      </View>
    </View>
  );
};
