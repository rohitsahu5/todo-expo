import React from "react";
import { db } from "../firebase";
import { Blob } from "./Blob";
import { View, Text, ScrollView, TextInput, ToastAndroid } from "react-native";
import blobStyle from "./styles-blob";
import headerStyle from "./Styles-header";
import { Header } from "./Header";

export class All extends React.Component {
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
        this.setState({
          alll: (
            <Text style={{ alignSelf: "center", margin: 65, Color: "Red" }}>
              Connection Error
            </Text>
          )
        });
        console.log(err);
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
    var i = 1;
    db.collection("tasks")
      .get()
      .then(data => {
        data.docs.forEach(task => {
          Allrender.push(
            <Blob
              key={i}
              no={i++}
              action={this.renderAll.bind(this)}
              title={task.data().title}
              disc={task.data().disc}
              status={task.data().status}
            />
          );
        });
        this.setState({ alll: Allrender, loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          alll: (
            <Text style={{ alignSelf: "center", margin: 65, Color: "Red" }}>
              Connection Error
            </Text>
          )
        });
        this.setState({ loading: false });
      });
  };
  changeTitle = e => {
    this.setState({ title: e });
  };
  changeDisc = e => {
    this.setState({ disc: e });
  };
  addTaskComponent = () => {
    var addInner = <View />;
    if (this.state.add == false && !this.state.loading) {
      addInner = (
        <View style={styles.blobActionDown}>
          <Text
            style={styles.blobInnerButton}
            onPress={() => {
              this.setState({
                add: true
              });
            }}
          >
            ADD A NEW TODO
          </Text>
        </View>
      );
    } else if (!this.state.loading) {
      addInner = (
        <View style={styles.blobActionDown}>
          <View>
            <TextInput
              onChangeText={this.changeTitle}
              style={styles.blobText}
              placeholder="Type Todo title"
            />
            <TextInput
              multiline
              onChangeText={this.changeDisc}
              numberOfLines={2}
              style={styles.blobTextArea}
              placeholder="Describe your Todo..."
            />
            {this.showError()}
            <View style={styles.blobBottom}>
              <Text
                style={{ ...styles.one, ...{ borderRightWidth: 1 } }}
                onPress={a => {
                  this.setState({
                    add: false
                  });
                }}
              >
                {" "}
                CANCEL
              </Text>
              <Text style={styles.one} onPress={() => this.Addnewtask()}>
                SAVE
              </Text>
            </View>
          </View>
        </View>
      );
    }
    if (this.state.sending) {
      addInner = (
        <View style={styles.blobActionDown}>
          <Text style={styles.blobInnerButton}>Sending</Text>
        </View>
      );
    }
    return addInner;
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Header selectedTab="All" />

        <ScrollView>
          {this.state.alll}

          {this.addTaskComponent()}
        </ScrollView>
      </View>
    );
  }
  componentDidMount() {
    this.setState({ alll: [] });
    this.renderAll();
  }
}
const styles = { ...blobStyle, ...headerStyle };
