import { Text, View } from "@react-pdf/renderer";
import { documentStyle as styles } from "./document_styles";

const School = (props: {
  name: string;
  time: string;
  major: string;
  result: string;
}) => {
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.h5}>{props.name}</Text>
        <Text style={styles.time}>{props.time}</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontStyle: "italic",
            fontWeight: "light",
          }}
        >
          {props.major}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {props.result}
        </Text>
      </View>
    </View>
  );
};

export const DocumentEducation = () => {
  return (
    <View>
      <Text style={styles.h4}>Education</Text>
      <View style={styles.hr}></View>
      <View style={styles.content}>
        <School
          name="VNU-HCM, University of Science"
          time="Aug 2020 - Nov 2024"
          major="B.Sc. in Software Engineering; High Quality Program. "
          result="GPA: 7.79/10"
        />
        <View
          style={{
            marginTop: 5,
          }}
        />
        <School
          name="Tien Giang High School For Gifted"
          time="Aug 2017 - Jun 2020"
          major="Information Technology Major"
          result="Excellent Student: 12/12 (Scholarship in 3 years)"
        />
      </View>
    </View>
  );
};
