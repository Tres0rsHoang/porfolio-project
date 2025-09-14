import { StyleSheet } from "@react-pdf/renderer";

export const documentStyle = StyleSheet.create({
  page: {
    fontFamily: "VolkolakSerif",
    padding: "1cm 1cm 0.5cm 1cm",
    fontSize: 11,
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
    fontSize: 15,
    fontWeight: "bold",
  },
  h4: {
    fontSize: 15,
    fontWeight: "light",
    fontStyle: "italic",
  },
  h5: {
    fontSize: 12,
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
  content: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  time: {
    fontSize: 8,
    fontStyle: "italic",
  },
});
