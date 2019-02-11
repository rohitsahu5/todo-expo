import React from "react";
import { db } from "../firebase";
import { Text, View, ScrollView } from "react-native";
import { Blob } from "./Blob";
import { Header } from "./Header";

export class Active extends React.Component {
  constructor() {
    super();
    this.state = {
      alll: []
    };
  }
  static navigationOptions = {
    title: "Active "
  };
  renderAll = () => {
    this.setState({
      alll: (
        <Text style={{ alignSelf: "center", margin: 65 }}>
          Loading Please Wait..
        </Text>
      )
    });
    var Allrender = [];
    var i = 1;
    db.collection("tasks")
      .get()
      .then(data => {
        console.log("start");
        data.docs.forEach(task => {
          if (task.data().status == "active") {
            console.log("aaa");
            Allrender.push(
              <Blob
                key={i}
                no={i}
                action={this.renderAll.bind(this)}
                title={task.data().title}
                disc={task.data().disc}
                status={task.data().status}
              />
            );
          }
          i++;
        });
        this.setState({ alll: Allrender });
      })
      .catch(err => {
        this.setState({
          alll: (
            <Text style={{ alignSelf: "center", margin: 65, Color: "Red" }}>
              Connection Error
            </Text>
          )
        });
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Header selectedTab="Active" />
        <ScrollView>{this.state.alll}</ScrollView>
      </View>
    );
  }
  componentDidMount() {
    this.setState({ alll: [] });
    this.renderAll();
  }
}
