import { StyleSheet } from "@react-pdf/renderer";

export const documentStyle = StyleSheet.create({
  page: {
    fontFamily: "VolkolakSerif",
    padding: "1cm 1cm",
    fontSize: 10,
  },
  h1: {
    fontSize: 25,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 13,
    fontWeight: "bold",
  },
  h4: {
    fontSize: 13,
    fontWeight: "light",
    fontStyle: "italic",
  },
  h5: {
    fontSize: 11,
    fontWeight: "bold",
  },
  icon: {
    width: 14,
    height: 14,
  },
  hr: {
    borderBottom: "1pt solid black",
    marginVertical: 2,
    width: "100%",
  },
  subHr: {
    borderBottom: "1pt solid #EEE",
    marginVertical: 2,
    width: "100%",
  },
  content: {
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 5,
  },
  time: {
    fontSize: 9,
    fontStyle: "italic",
  },
  bold: {
    fontWeight: "bold",
  },
});
