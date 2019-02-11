import  React  from "react";
import { View,Button } from "react-native"

export class Root extends React.Component {

    render() {
        const { navigation } = this.props;
        return (
            
            <View style={{ backgroundColor: "lightsalmon",flex:1,justifyContent:"center",alignItems:"center" }} >
               <Button onPress={()=>{navigation.navigate('All')}} title="Start App" />
             </View>
        )
    }
}