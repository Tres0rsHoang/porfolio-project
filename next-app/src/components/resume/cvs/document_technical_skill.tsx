import { Text, View } from "@react-pdf/renderer";
import { documentStyle as styles } from "./document_styles";

export const DocumentTechnicalSkill = () => {
  return (
    <View>
      <Text style={styles.h4}>Technical Skills</Text>
      <View style={styles.hr}></View>
      <View style={styles.content}>
        <Text style={{ marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Languages</Text>
          {": "}
          TypeScript/JavaScript, Python, Java, PHP, C#, C/C++, Dart, Lua,
          Shellscript.
        </Text>
        <Text style={{ marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Frontend</Text>
          {": "}
          React, Next.js, Three.js, Tailwind CSS, Bootstrap, ShadCN, MUI, ZMP,
          Smarty (PHP), Jquery, Flutter, React Native.
        </Text>
        <Text style={{ marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Backend</Text>
          {": "}
          Node.js, NestJS, Express.js, Prisma, MySQL, PostgreSQL, MongoDB.
        </Text>
        <Text style={{ marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold" }}>DevOps</Text>
          {": "}
          Ngrok, Docker, Docker Compose, Azure, Cloudflare, GitHub Actions
          (CI/CD), Nginx, VPS.
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
