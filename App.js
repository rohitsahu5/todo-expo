import React, { Component } from "react";
import { Root } from "./components/Root";
import { Done } from "./components/done";
import { Active } from "./components/active";
import { All } from "./components/All";
import store from "./js/store/index";
import { Provider } from "react-redux";
import { Router, Scene } from "react-native-router-flux";
import { StatusBar } from "react-native";

export default class App extends Component {
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
          </Scene>
        </Router>
      </Provider>
    );
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }
}
