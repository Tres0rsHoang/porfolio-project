import { Link, Text, View } from "@react-pdf/renderer";
import { documentStyle as styles } from "./document_styles";

export const DocumentCertificates = () => {
  return (
    <View>
      <Text style={styles.h4}>Certificates</Text>
      <View style={styles.hr}></View>
      <View style={styles.content}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Link
            src="https://server.baohomeserver.uk/files/IELTS_Cert.pdf"
            style={{ ...styles.h3, textDecoration: "none" }}
          >
            Ielts Academic Certificate
          </Link>
          <Text style={styles.time}>Apr 2025</Text>
        </View>
        <Text style={{ fontStyle: "italic" }}>
          Overal Band Score: 5.5 (Listening: 5.5, Reading: 6.0, Writing: 6.0,
          Speaking: 4.5)
        </Text>
      </View>
    </View>
  );
};
