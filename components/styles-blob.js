import { StyleSheet } from "react-native";
export default StyleSheet.create({
  blob: {
    borderRadius: 8,
    margin: 10
  },
  blobHead: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  blobActive: {
    backgroundColor: "#e7c092"
  },
  blobDone: {
    backgroundColor: "lightgreen"
  },
  blobAction: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#f0bdff",
    fontWeight: "bold",
    borderRadius: 8,
    paddingLeft: 4,
    color: "darkblue",
    fontWeight: "600",
    overflow: "hidden"
  },

  blobActionDown: {
    margin: 10,
    marginBottom: 100,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#f0bdff",
    fontWeight: "bold",
    borderRadius: 8,
    paddingLeft: 4,
    color: "darkblue",
    fontWeight: "600",
    overflow: "hidden"
  },
  blobTitle: {
    marginRight: "auto",
    fontWeight: "bold"
  },
  blobDisc: {
    fontSize: 14,
    fontWeight: "300",
    padding: 12,
    paddingTop: 0
  },
  blobStatus: {
    fontWeight: "bold",
    fontSize: 14,
    padding: 12,
    paddingTop: 0
  },
  blobEdit: {
    display: "none"
  },
  blobText: {
    padding: 6,
    margin: 14,
    flex: 1,
    padding: 8,
    borderRadius: 5,
    fontWeight: "bold",
    backgroundColor: "#00000024"
  },
  blobTextArea: {
    padding: 6,
    margin: 14,
    marginTop: 0,

    fontWeight: "300",
    textAlignVertical: "top",
    flex: 1,
    padding: 8,
    borderRadius: 5,

    backgroundColor: "#00000024"
  },
  blobInnerButton: {
    padding: 12,
    textAlign: "center"
  },
  blobBottom: {
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    alignContent: "center",
    textAlign: "center",
    height: 30
  },
  blobBottomView: {
    width: 50,
    paddingTop: 5
  },
  one: {
    flex: 1,
    textAlign: "center",
    padding: 4
  }
});
