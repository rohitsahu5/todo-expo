import React from "react";
import { View, Text } from "react-native";
import { Blob } from "./Blob";
import blobStyle from "./styles-blob";
import { db } from "../firebase";
export class SingleTask extends React.Component {
  constructor() {
    super();
    this.state = {
      valid: true,
      sending: false,
      alll: [],
      add: false,
      title: "",
      disc: "",
      loading: true
    };
  }
  showError = () => {
    if (!this.state.valid)
      return (
        <Text style={{ flex: 1, alignSelf: "center", color: "red" }}>
          Enter Both Fields{" "}
        </Text>
      );
  };
  Addnewtask = () => {
    var newtitle = this.state.title;
    var newdisc = this.state.disc;
    this.setState({ valid: true });
    if (this.state.disc == "" || this.state.title == "") {
      this.setState({ valid: false });
      return null;
    }
    this.setState({ sending: true });
    db.collection("tasks")
      .get()
      .then(data => {
        var no = data.docs.length;
        return db
          .collection("tasks")
          .doc((no + 1).toString())
          .set({
            title: newtitle,
            disc: newdisc,
            status: "active"
          });
      })
      .then(s => {
        this.setState({
          add: false,
          sending: false
        });
        this.renderAll();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          alll: (
            <Text style={{ alignSelf: "center", margin: 65, color: "Red" }}>
              Connection Error
            </Text>
          )
        });
        this.setState({ sending: false });
      });
  };
  renderAll = () => {
    this.setState({
      loading: true,
      alll: (
        <Text style={{ alignSelf: "center", margin: 65 }}>
          Loading Please Wait..
        </Text>
      )
    });
    var Allrender = [];

    db.collection("tasks/")
      .doc(this.props.id)
      .get()
      .then(task => {
        Allrender = (
          <Blob
            no={task.id}
            action={this.renderAll.bind(this)}
            title={task.data().title}
            disc={task.data().disc}
            status={task.data().status}
          />
        );

        this.setState({ alll: Allrender, loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          alll: (
            <Text style={{ alignSelf: "center", margin: 65, color: "Red" }}>
              Connection Error
            </Text>
          )
        });
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <View>
        <Text style={{ padding: 4, fontSize: 15 }}>New Task: </Text>
        <View>{this.state.alll}</View>
      </View>
    );
  }
  componentDidMount() {
    console.log(this.props);
    this.setState({ alll: [] });
    this.renderAll();
  }
}
const styles = blobStyle;
