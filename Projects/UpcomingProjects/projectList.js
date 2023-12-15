
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {View,Text,ScrollView,SafeAreaView,StatusBar,StyleSheet,Image,Dimensions,TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const UpcomingProjectList=(props)=>{
    const navigation = useNavigation();
    const {projectListItems}=props
    const {title,projectId}=projectListItems
    const deviceSize= Dimensions.get('window').width
    const onProjectClick=async()=>{
        const storeProjectId=JSON.stringify(projectId)
        await AsyncStorage.setItem('projectId',storeProjectId)
        navigation.navigate('UpcomingSpacesses');
        console.log(projectId)

    }
    return(
        <TouchableOpacity style={deviceSize>786?styles.largeDeviceUpcomingCard :styles.upcomingCard} onPress={onProjectClick}>
           <View>
            <Image source={{uri:'http://192.168.1.26:9000/feedUploads/1691747681617_Royal-Suite-.jpg'}} style={styles.cardImage} />
            <Text style={styles.projectName}>{title}</Text>
           </View>
           </TouchableOpacity>
           
    
    )
}
export default UpcomingProjectList


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