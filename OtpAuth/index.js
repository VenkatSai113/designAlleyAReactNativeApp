import React,{Component} from "react";
import {View,Text,Button,StyleSheet} from 'react-native'
class OtpAuth extends Component{
    render(){
        return(
            <View style={styles.loginContainer}>
                <Text style={styles.randomText}>Hello</Text>
            </View>
        )
    }
}
export default OtpAuth
const styles=StyleSheet.create({
    loginContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"red"
    },
    randomText:{
        fontFamily:"robooto",
        fontSize:20,
        fontWeight:"bold",
        color:"blue"
    }

})