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

Font.registerHyphenationCallback((word) => [word]);
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
  <View
    style={{
      paddingTop: 5,
      paddingRight: 5,
    }}
  >
    {props.children}
  </View>
);

export const LI = (props: {
  children?: React.ReactNode;
  bullet?: string;
  wrap?: boolean;
}) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      marginLeft: 4,
    }}
    wrap={props.wrap}
  >
    <Text style={{ width: 10 }}>{props.bullet ?? "•"}</Text>
    {typeof props.children == "string" ? (
      <Text style={{ flex: 1 }}>{props.children}</Text>
    ) : (
      <View style={{ flex: 1 }}> {props.children}</View>
    )}
  </View>
);

export const DocumentLayout = (props: {
  title: string;
  job: string;
  children: React.ReactNode;
}) => {
  return (
    <Document
      language="en"
      title={props.title}
      author="Bao Hoang"
      subject="Developer Resume"
      creationDate={new Date()}
      pdfVersion="1.7"
      pageLayout="oneColumn"
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
          <Text style={styles.h3}>{props.job}</Text>
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Svg viewBox="0 0 640 640" style={styles.icon}>
              <Path
                d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z"
                fill="#000000"
              />
            </Svg>
            <Text>{" Github.com/Tres0rsHoang | "}</Text>
            <Svg viewBox="0 0 640 640" style={styles.icon}>
              <Path
                d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z"
                fill="#000000"
              />
            </Svg>
            <Text>{" Linkedin.com/in/hoangquocbao"}</Text>
          </View>
        </View>
        <View>{props.children}</View>
      </Page>
    </Document>
  );
};
