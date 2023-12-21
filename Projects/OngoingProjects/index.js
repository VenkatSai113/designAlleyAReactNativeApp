import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {View,Text,ScrollView,SafeAreaView,StatusBar,StyleSheet,Image,Dimensions} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OngoingProjectList from './projectList'
const OngoingProjects=()=>{
    const deviceSize= Dimensions.get('window').width
    const [upcomingProjects,setUpcomingProjects]=useState([])
    useEffect(()=>{
        const upcomingProjects=async()=>{
            const jwtToken = await AsyncStorage.getItem('jwtToken');
            const apiUrl='http://192.168.1.44:9000/ongoingProjects'
            const options={
                method:"GET",
                headers:{
                    "Content-Type":"Application/json",
                    "Authorization":`Bearer ${jwtToken}`
                }
            }
            const response=await fetch(apiUrl,options);
            const data=await response.json()
            console.log(data,'ongoing')
            setUpcomingProjects(data)
        }
        upcomingProjects()
      
    },[])      
    return(
        <SafeAreaView>
            <StatusBar backgroundColor='#fff'/>
            <View style={styles.upcomingProjectsView}>
            <Text style={styles.upcomingProjectText}>
                Ongoing Projects
            </Text>
            <ScrollView style={{height:hp('70%')}}>
            <View  style={{width:wp('100%'),display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
            {upcomingProjects.map(eachProject=>
                <OngoingProjectList projectListItems={eachProject} key ={eachProject.projectId}/>)}
       </View>
            </ScrollView>
            </View>
            
        </SafeAreaView>
    )
}
export default OngoingProjects

const styles=StyleSheet.create({
    upcomingProjectsView:{
        width:wp('100%'),
        height:hp('90%'),
       
    },
    upcomingProjectText:{
        fontSize:14,
        fontWeight:'bold',
        textAlign:'center',
       
    },
    upcomingCard:{
      
        width:"90%",

        marginTop:10,
        borderRadius:3
    },
    largeDeviceUpcomingCard:{
        width:"30%",
        marginTop:10,
        borderRadius:3,
        borderWidth:1,
        borderColor:'#cfc3ad'
    },
    cardImage:{
        width:'100%',
        height:200,
        borderRadius:3,
        borderWidth:1,
        borderColor:'#cfc3ad'
    },
    projectName:{
        fontWeight:'bold',
        fontSize:14,
        margin:10

    }
})