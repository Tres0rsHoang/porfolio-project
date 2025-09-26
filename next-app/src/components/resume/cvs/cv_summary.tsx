import { Text, View } from "@react-pdf/renderer";
import { documentStyle as styles } from "./document_styles";

export const DocumentSummary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <View>
      <Text style={styles.h4}>Summary</Text>
      <View style={styles.hr}></View>
      <View style={styles.content}>
        <Text wrap={false}>{children}</Text>
      </View>
    </View>
  );
};
