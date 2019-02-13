import React, { Component } from "react";
import { Root } from "./components/Root";
import { Done } from "./components/done";
import { Active } from "./components/active";
import { All } from "./components/All";
import store from "./js/store/index";
import { Provider } from "react-redux";
import { Router, Scene } from "react-native-router-flux";
import { StatusBar } from "react-native";
import { Notifications } from "expo";
import { SingleTask } from "./components/SingleTask";
import { Actions } from "react-native-router-flux";
import registerForPushNotificationsAsync from "./notificationinit";
export default class App extends Component {
  componentWillMount(){
    Notifications.presentLocalNotificationAsync({
      title: 'Welcome!',
      body: 'Welcome to the todo app!'
    })
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="Root" hideNavBar="true" component={Root} initial />
            <Scene key="All" hideNavBar="true" component={All} title="All" />
            <Scene key="Done" hideNavBar="true" component={Done} title="Done" />
            <Scene
              key="Active"
              hideNavBar="true"
              component={Active}
              title="Active"
            />
            <Scene
              key="SingleTask"
              hideNavBar="true"
              component={SingleTask}
              title="View Task"
            />
          </Scene>
        </Router>
      </Provider>
    );
  }

  componentDidMount() {
    console.log("aa");
    // StatusBar.setHidden(true);
    registerForPushNotificationsAsync();
    Notifications.addListener(receivedNotification => {
      console.log(receivedNotification);
      if (receivedNotification.origin === "selected")
        Actions.SingleTask({ id: receivedNotification.data.id });
    });
  }
}
