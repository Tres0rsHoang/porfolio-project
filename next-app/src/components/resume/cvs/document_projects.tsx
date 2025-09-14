import { Text, View } from "@react-pdf/renderer";
import { documentStyle as styles } from "./document_styles";

export interface DocProject {
  title: string;
  description: string;
  teamSize: number;
  role: string;
  responsiblities: string[];
  Technologies: string;
  Links: string[];
}

export const DocumentProjects = (props: { projects: DocProject[] }) => {
  void props;
  return (
    <View>
      <Text style={styles.h4}>Projects</Text>
      <View style={styles.hr}></View>
      <View style={styles.content}></View>
    </View>
  );
};
