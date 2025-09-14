import {
  Document,
  Font,
  Link,
  Page,
  Path,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import { documentStyle as styles } from "./document_styles";

Font.register({
  family: "VolkolakSerif",
  fonts: [
    {
      src: "/fonts/MUDKTY+WTVolkolakSerifText-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/MUDKTY+WTVolkolakSerifText-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/fonts/MUDKTY+WTVolkolakSerifText-Thin.ttf",
      fontWeight: "thin",
    },
    {
      src: "/fonts/MUDKTY+WTVolkolakSerifText-Light.ttf",
      fontWeight: "light",
    },
    {
      src: "/fonts/MUDKTY+WTVolkolakSerifText-RegularItalic.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: "/fonts/MUDKTY+WTVolkolakSerifText-BoldItalic.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
    {
      src: "/fonts/MUDKTY+WTVolkolakSerifText-ThinItalic.ttf",
      fontWeight: "thin",
      fontStyle: "italic",
    },
    {
      src: "/fonts/MUDKTY+WTVolkolakSerifText-LightItalic.ttf",
      fontWeight: "light",
      fontStyle: "italic",
    },
  ],
});

export const UL = (props: { children?: React.ReactNode }) => (
  <View>{props.children}</View>
);

export const LI = (props: { children?: React.ReactNode }) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      marginLeft: 4,
      marginBottom: 2,
    }}
  >
    <Text style={{ width: 10 }}>•</Text>
    <Text>{props.children}</Text>
  </View>
);

export const DocumentLayout = (props: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Document
      title={props.title}
      author="Bao Hoang"
      subject="Developer Resume"
      creationDate={new Date()}
      pdfVersion="1.7"
      pageLayout="singlePage"
    >
      <Page size="A4" style={styles.page}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.h1}>Quoc Bao Hoang</Text>
          <Text style={styles.h3}>Fullstack Web Developer</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 2,
            }}
          >
            <Svg viewBox="0 0 640 640" style={styles.icon}>
              <Path
                fill="#000"
                d="M415.9 344L225 344C227.9 408.5 242.2 467.9 262.5 511.4C273.9 535.9 286.2 553.2 297.6 563.8C308.8 574.3 316.5 576 320.5 576C324.5 576 332.2 574.3 343.4 563.8C354.8 553.2 367.1 535.8 378.5 511.4C398.8 467.9 413.1 408.5 416 344zM224.9 296L415.8 296C413 231.5 398.7 172.1 378.4 128.6C367 104.2 354.7 86.8 343.3 76.2C332.1 65.7 324.4 64 320.4 64C316.4 64 308.7 65.7 297.5 76.2C286.1 86.8 273.8 104.2 262.4 128.6C242.1 172.1 227.8 231.5 224.9 296zM176.9 296C180.4 210.4 202.5 130.9 234.8 78.7C142.7 111.3 74.9 195.2 65.5 296L176.9 296zM65.5 344C74.9 444.8 142.7 528.7 234.8 561.3C202.5 509.1 180.4 429.6 176.9 344L65.5 344zM463.9 344C460.4 429.6 438.3 509.1 406 561.3C498.1 528.6 565.9 444.8 575.3 344L463.9 344zM575.3 296C565.9 195.2 498.1 111.3 406 78.7C438.3 130.9 460.4 210.4 463.9 296L575.3 296z"
              />
            </Svg>
            <Text>
              {" "}
              <Link
                src="https://www.baohomeserver.uk/"
                style={{
                  textDecoration: "none",
                }}
              >
                {"https://www.baohomeserver.uk/"}
              </Link>
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 2,
            }}
          >
            <Svg viewBox="0 0 640 640" style={styles.icon}>
              <Path
                fill="#000000"
                d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"
              />
            </Svg>
            <Text>{" hqbao10012002@gmail.com | "}</Text>
            <Svg viewBox="0 0 640 640" style={styles.icon}>
              <Path
                d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"
                fill="#000000"
              />
            </Svg>
            <Text>{" (+84) 839 844 131"}</Text>
          </View>
        </View>
        <View>{props.children}</View>
      </Page>
    </Document>
  );
};
