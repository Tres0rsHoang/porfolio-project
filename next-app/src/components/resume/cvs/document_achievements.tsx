import { Text, View } from "@react-pdf/renderer";
import { documentStyle as styles } from "./document_styles";

export const DocumentAchievements = () => {
  return (
    <View>
      <Text style={styles.h4}>Achievements</Text>
      <View style={styles.hr}></View>
      <View style={styles.content}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text>
            <Text style={{ fontWeight: "bold" }}>
              Silver Medal in Information Technology
            </Text>{" "}
            at Vietnam Southern Summer Camp.
          </Text>
          <Text style={styles.time}>Jun 2018</Text>
        </View>
        <View style={styles.subHr}></View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 3 }}>
            <Text style={{ fontWeight: "bold" }}>
              Third Prize in Information Technology for Gifted schools
            </Text>{" "}
            at Vietnam Excellent Students Competition (Province-Level).
          </Text>
          <Text style={{ ...styles.time, flex: 1, textAlign: "right" }}>
            Nov 2018
          </Text>
        </View>
        <View style={styles.subHr}></View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 3 }}>
            <Text style={{ fontWeight: "bold" }}>
              Encouragement prize with IOT Device
            </Text>{" "}
            at Vietnam Science and Engineering Fair (Province-Level).
          </Text>
          <Text
            style={{
              ...styles.time,
              flex: 1,
              textAlign: "right",
            }}
          >
            Apr 2018
          </Text>
        </View>
      </View>
    </View>
  );
};
