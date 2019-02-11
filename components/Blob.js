import React from "react";
import { View,TextInput,Text } from "react-native"
import { db } from "../firebase";
import styles from "./styles-blob"
export class Blob extends React.Component {
    constructor(props) {
        super()
        this.state = {
            valid:true,
            sending:false,
            title:props.title,
            disc:props.disc,
            data: {
                title: props.title,
                disc: props.disc,
                status: props.status,
                no: props.no,
            },
            edit: false
        }
      
    }
    getfreshcopy=()=> {
        db.collection("tasks").doc((this.state.data.no + 0).toString()).get().then(doc => {
            this.setState({
                data: {
                    title: doc.data().title,
                    disc: doc.data().disc,
                    status: doc.data().status
                },

            })
        })
    }
    changeTitle=(e)=>{
        this.setState({title:e})
      }
      changeDisc=(e)=>{
        this.setState({disc:e})
        
      }
    Marktaskdone() {
        this.setState({sending:true,valid:true})

        db.collection("tasks").doc((this.state.data.no + 0).toString()).set({
            status: "done"
        }, { merge: true }).then(a => {
            this.getfreshcopy()
            this.setState({
                edit: false,
                sending:false
            })
  
        
        }).catch(err=>{
            
        
        })
    }
    Savetask() {
        this.setState({sending:true,valid:true})

       var newdisc=this.state.title
       var newtitle= this.state.disc

       if(this.state.title == "" || this.state.disc){
           this.setState({valid:false})
           return null
       }
        db.collection("tasks").doc((this.state.data.no + 0).toString()).set(
            { disc: newdisc, title: newtitle }, { merge: true }
        ).then(a => {
            this.getfreshcopy()
            this.setState({
                edit: false,
                sending:false
            })
  

        })
        .catch(()=>{
       
        }
        )

    }
    showError=()=>{
        if(this.state.valid)
        return(<Text style={{flex:1,alignSelf:"center",color:"red"}}>Enter Both Fields </Text>)
    }
    render() {
        var blobstyle ;
        if (this.state.data.status === "active")
        blobstyle={...styles.blob,...styles.blobActive}
        else
        blobstyle={...styles.blob,...styles.blobDone}

        var innerBlob
        if (this.state.edit === true) {
            innerBlob = (  <View style={blobstyle}><View >
                <TextInput type="text" style={styles.blobText} placeholder="Type Todo title" defaultValue={this.state.data.title}></TextInput>
                <TextInput multiline  type="text" numberOfLines={2} style={styles.blobTextArea} defaultValue={this.state.data.disc} placeholder="Describe your Todo..."></TextInput>
                {this.showError()}
                <View style={styles.blobBottom}>
                    <Text style={{...styles.one,...{borderRightWidth:1}}} onPress={A => {
                        this.setState({
                            edit: false
                        })
                    }}> CANCEL</Text>
                    
                    <Text style={styles.one} onPress={() => this.Savetask()}>SAVE</Text>
                </View>
            </View></View>)
        }
        else {
            var actions = <View></View>;
            if (this.state.data.status === "active") {
                actions = <View style={{flexDirection:"row"}}><Text style={{  borderRadius: '4px', marginLeft: '8px' }} style={styles.blobAction}  onPress={() => this.Marktaskdone()} >Mark As done</Text>
                    <Text style={styles.blobAction} onPress={A => {
                        this.setState({
                            edit: true
                        })
                    }} >edit</Text></View>;
            }

            innerBlob = (  <View style={blobstyle}><View>
                <View style={styles.blobHead}>
                    <Text style={styles.blobTitle}> {this.state.data.title} </Text>
                    {actions}
                </View>


                <Text style={styles.blobDisc}>{this.state.data.disc}
                </Text>
                <Text style={styles.blobStatus}> STATUS : {this.state.data.status.toUpperCase()}</Text></View></View>)

        }
        if (this.state.sending){
            innerBlob=<View style={blobstyle}>
                  
            
            <Text style={styles.blobInnerButton} >
        Updating</Text>      
          </View>
          }
    
        return (
          
         <View>
                   
                   {innerBlob}</View>
                
        );
    }
}