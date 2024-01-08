import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { View,Text,StyleSheet,Image,TouchableOpacity } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect,useState } from 'react';
import SavedPostList from './postView'

const SavedPosts=()=>{
    const [savePosts,setSavedPosts]=useState([])
    useEffect(()=>{
        const savedPostsApiCall=async()=>{
            const jwtToken=await AsyncStorage.getItem('jwtToken')
            const apiUrl='http://192.168.1.36:9000/getSavedPost'
            const options={
                method:'GET',
                headers:{
                    'Content-Type':'Application/json',
                    'Authorization':`Bearer ${jwtToken}`
                }

            }
            const response=await fetch(apiUrl,options)
            const data=await response.json()
            console.log(data)
            setSavedPosts(data)
        }
        savedPostsApiCall()
      
    },[])
    const previewSavedPosts=()=>{
        console.log(savePosts.postId)
    }
    return(
        <View style={styles.savedPosts}>
            <Text style={styles.savedPostText}>Saved Posts</Text>
            <View style={styles.savedViewRow}>
                {savePosts.map(eachPosts=>
                <SavedPostList savedPosts={eachPosts} key={eachPosts.postId} />
               )}
            </View>
        </View>
    )
}
export default SavedPosts

const styles=StyleSheet.create({
    savedPosts:{
        height:hp('90%'),
        width:wp('99%'),
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    savedPostText:{
        fontSize:14,
        fontWeight:'bold'
    },
    savedViewRow:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center'
    },
   
})