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
            Silver Medal in Information Technology
          </Text>{" "}
          at The 2019 Vietnam Southern Summer Camp.
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>
            Third Prize in Information Technology for Gifted schools
          </Text>{" "}
          at The 2019 Vietnam Excellent Students Competition (Province-Level).
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>
            Encouragement prize with IOT Device
          </Text>{" "}
          at The 2018 Vietnam Science and Engineering Fair (Province-Level).
        </Text>
      </View>
    </View>
  );
};
