import { Link, Text, View } from "@react-pdf/renderer";
import { documentStyle as styles } from "./document_styles";
import { LI, UL } from "./document_layout";

export interface DocProject {
  title: string;
  description: React.ReactNode;
  teamSize: number;
  time: string;
  role: React.ReactNode;
  responsibilities: string[];
  technologies: string[];
  links: Array<{
    label: string;
    url: string;
  }>;
}

const ProjectItem = ({ project }: { project: DocProject }) => {
  return (
    <View style={{ marginBottom: 5 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.h5}>{project.title}</Text>
        <Text style={styles.time}>{project.time}</Text>
      </View>
      <UL>
        <LI>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Description</Text>
            {": "}
            {project.description}
          </Text>
        </LI>
        <LI>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Team size</Text>
            {": "}
            {project.teamSize}
            {project.teamSize <= 1 ? " member." : " members."}
          </Text>
        </LI>
        <LI>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Role</Text>
            {": "}
            {project.role}
          </Text>
        </LI>
        <LI>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Responsibilities</Text>
            {": "}
          </Text>
          {project.responsibilities.map((responsibility, index) => (
            <LI bullet="-" key={index}>
              {responsibility}
            </LI>
          ))}
        </LI>
        <LI>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Technologies</Text>
            {": "}
            {project.technologies.map((tech, index) =>
              index == project.technologies.length - 1
                ? `${tech}.`
                : `${tech}, `,
            )}
          </Text>
        </LI>
        <LI>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Links</Text>
            {": "}
            <Text>
              {project.links.map((link, index) => (
                <Link
                  key={index}
                  src={link.url}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Text>
          </Text>
        </LI>
      </UL>
    </View>
  );
};

export const DocumentProjects = (props: { projects: DocProject[] }) => {
  return (
    <View>
      <Text style={styles.h4}>Feature Projects</Text>
      <View style={styles.hr}></View>
      <View style={styles.content}>
        {props.projects.map((project, index) => (
          <ProjectItem project={project} key={index} />
        ))}
      </View>
    </View>
  );
};
