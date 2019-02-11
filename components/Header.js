import React from "react"
import {View,Text} from "react-native"
import styles from "./Styles-header"
import { Actions } from 'react-native-router-flux';

export class Header extends React.Component{
    
    stylize(tabname){
        console.log(tabname,this.props.selectedTab)
        if(tabname===this.props.selectedTab){
            return {...styles.tabs,...styles.selected}
        }
        else
            return styles.tabs
    }

     
    
    render(){
        return  (
            <View style={styles.header} >
            <Text onPress= {() => { Actions.All() }}    style={this.stylize("All")}>    ALL     </Text>
            <Text onPress= {() => { Actions.Done() }}   style={this.stylize("Done")}>   DONE    </Text>
            <Text onPress= {() => { Actions.Active() }} style={this.stylize("Active")}> ACTIVE  </Text>
          </View>

        )
    }
}