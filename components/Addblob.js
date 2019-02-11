import React from "react";
import { TextInput, View, } from "react-native"
import styles from "./styles-blob"
import "./blob.css";
export class Addblob extends React.Component {

    render() {
        return (
            <View >
                <TextInput type="text" style={styles.blobText} placeholder="Type Todo title" value={this.props.title}></TextInput>
                <TextInput type="text" multiline rows="3" style={styles.blobTextArea} value={this.props.disc} placeholder="Describe your Todo..."></TextInput>
                <View style={styles.blobBottom}>
                    <View style={styles.one}> CANCEL</View>
                    <View>SAVE</View>
                </View>
            </View>
        )
    }
}