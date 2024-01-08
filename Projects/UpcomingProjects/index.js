import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {View,Text,ScrollView,SafeAreaView,StatusBar,StyleSheet,Image,Dimensions} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpcomingProjectList from './projectList'
const UpcomingProjects=()=>{
    const deviceSize= Dimensions.get('window').width
    const [upcomingProjects,setUpcomingProjects]=useState([])
    useEffect(()=>{
        const upcomingProjects=async()=>{
            const jwtToken = await AsyncStorage.getItem('jwtToken');
            console.log(jwtToken,"jwtToken jwtToken")
            const apiUrl='http://192.168.1.36:9000/upcomingProjects'
            const options={
                method:"GET",
                headers:{
                    "Content-Type":"Application/json",
                    "Authorization":`Bearer ${jwtToken}`
                }
            }
            const response=await fetch(apiUrl,options);
            const data=await response.json()
            console.log(data)
            setUpcomingProjects(data)
        }
        upcomingProjects()
      
    },[])      
    return(
        <SafeAreaView>
            <StatusBar backgroundColor='#fff'/>
            <ScrollView style={styles.upcomingProjectsView}>
            <Text style={styles.upcomingProjectText}>
                Upcoming Projects
            </Text>
            <View style={{width:wp('100%'),display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
                
            {upcomingProjects.map(eachProject=>
                <UpcomingProjectList projectListItems={eachProject}/>)}
                </View>
       

            </ScrollView>
            
        </SafeAreaView>
    )
}
export default UpcomingProjects

const styles=StyleSheet.create({
    upcomingProjectsView:{
        width:wp('100%'),
        height:hp('85%'),
        
       
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