import { StyleSheet } from "react-native";
export default StyleSheet.create({
  header: {
    height: 31,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  tabs: {
    flex: 1,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1.5,
    textAlign: "center",
    color: "#4f4f4f",
    fontSize: 17,
    fontWeight: "bold",
    paddingTop: 5
  },
  selected: {
    borderBottomColor: "red"
  }
});
