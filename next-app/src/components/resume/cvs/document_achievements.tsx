import { Text, View } from "@react-pdf/renderer";
import { documentStyle as styles } from "./document_styles";

export const DocumentAchievements = () => {
  return (
    <View>
      <Text style={styles.h4}>Achievements</Text>
      <View style={styles.hr}></View>
      <View style={styles.content}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>
            Third Prize in Information Technology (Gifted schools)
          </Text>{" "}
          at The 2019 Provincial Competition for Excellent Students.
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>
            Silver Medal in Information Technology
          </Text>{" "}
          at The 2019 Southern Summer Camp.
        </Text>
      </View>
    </View>
  );
};
