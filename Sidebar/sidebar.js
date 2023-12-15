import React from 'react'
import { useEffect } from 'react';
import { View ,Text,StyleSheet,Dimensions,Image} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons' 
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Home from '../Home/index'

const Sidebar=()=>{
      const  screenWidth=Dimensions.get('window').width
        return(
            <View style={[styles.sidebarContainer,screenWidth>786?{ display: 'flex' }:{ display: 'none' }]}>
                <Image source={require("../assets/logo.jpeg")} style={styles.logoImage}/>
                <View style={styles.sidebarCard}>
               <Ionicons name="home-outline" style={styles.sidebarIcons}/>
               <Text style={styles.sidebarContent}>Home</Text>
                </View>
                <View style={styles.sidebarCard}>
               <MaterialCommunityIcons name="account-plus-outline" style={styles.sidebarIcons}/>
                <Text style={styles.sidebarContent}>Invitation</Text>
                </View> 
                <View style={styles.sidebarCard}>
               <Feather name="plus" style={styles.sidebarIcons}/>
                <Text style={styles.sidebarContent}>create Post</Text>
                </View>   
                <View style={styles.sidebarCard}>
               <AntDesign name="search1" style={styles.sidebarIcons}/>
                <Text style={styles.sidebarContent}>Explore</Text>
                </View> 
                <View style={styles.sidebarCard}>
               <Octicons name="project" style={styles.sidebarIcons}/>
                <Text style={styles.sidebarContent}>projects</Text>            
                </View>  
                <View style={styles.sidebarCard}>
               <FontAwesome name="newspaper-o" style={styles.sidebarIcons}/>
                <Text style={styles.sidebarContent}>Estimates</Text>
                </View>   
                <View style={styles.sidebarCard}>
               <FontAwesome5 name="store" style={styles.sidebarIcons}/>
                <Text style={styles.sidebarContent}>Store</Text>
                </View> 
                <View style={styles.sidebarCard}>
<Ionicons name="chatbox-outline" style={styles.sidebarIcons}/>
<Text style={styles.sidebarContent}>Chat</Text>
 </View>  
                <View style={styles.sidebarCard}>
               <MaterialCommunityIcons name="virtual-reality" style={styles.sidebarIcons}/>
                <Text style={styles.sidebarContent}>Virtual Tours</Text>
                </View>
                <View style={styles.sidebarCard}>
               <Octicons name="people" style={styles.sidebarIcons}/>
                <Text style={styles.sidebarContent}>People</Text>
                </View>
            </View>
        )
    
}
export default Sidebar
const styles=StyleSheet.create({
    sidebarContainer:{
     height:  hp('100%') , // 70% of height device screen
    width: 200 ,
    // display: screenWidth<786?'none':"flex",
    flexDirection:"column",
    alignItems:"center",
    backgroundColor:"#fff",
    borderRightWidth:1,
    borderRightColor:"black",
    },
    sidebarCard:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flexStart",
        alignItems:"center",
        width:"90%",
        height:40,
        backgroundColor:"#fff",
        borderBottomWidth:1,
        borderBottomColor:"black",
       
    },logoImage:{
        width:"100%",
        height:40,
        resizeMode:"contain",
        marginTop:20
    },
    sidebarIcons:{
        fontSize:20,
        marginLeft:20
    },
    sidebarContent:{
       
        fontSize:15,
        marginLeft:20

    }
})