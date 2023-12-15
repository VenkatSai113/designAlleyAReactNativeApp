import React from 'react';
import {View,Text,Image,StyleSheet,Dimensions,TouchableOpacity} from 'react-native'
import { Video, ResizeMode } from 'expo-av';

const ProfilePosts=(props)=>{

    const video = React.useRef(null);
    const {postDetails}=props
    const {thumbnail}=postDetails
    const thumbnailUrl=thumbnail.split(",")[0]
    const splitedUrl=thumbnailUrl.split(".")[1]
    const [status, setStatus] = React.useState({});
    const deviceSize= Dimensions.get('window').width
    return(
      <TouchableOpacity style={deviceSize>786?styles.largeDeviceUpcomingCard :styles.upcomingCard} >
      <View>
      {splitedUrl=="mp4"?  <Video
           ref={video}
           source={{uri:`http://192.168.1.26:9000/${thumbnail}`}} 
           useNativeControls
           resizeMode="cover" // Set video resizeMode
           isLooping
           onPlaybackStatusUpdate={status => setStatus(() => status)}
           style={styles.cardImage}
             controls={true} 
         />:
       <Image source={{uri:`http://192.168.1.26:9000/${thumbnail}`}} style={styles.cardImage} />}
       {/* <Text style={styles.projectName}>hjghjgh</Text> */}
      </View>
      </TouchableOpacity>
        // <View >
        //      {splitedUrl=="mp4"? 
        //   <Video
        //    ref={video}
        //    source={{uri:`http://192.168.1.26:9000/${thumbnail}`}} 
        //    useNativeControls
        //    resizeMode='contain'
        //    isLooping
        //    onPlaybackStatusUpdate={status => setStatus(() => status)}
        //    style={{height:170,width:150,borderRadius:3}}
        //  />:     <Image  source={{uri:`http://192.168.1.26:9000/${thumbnail}`}}  style={{height:170,width:150,borderRadius:3,margin:6}} resizeMode='contain' />}
         
        // </View>
    )
}
export default ProfilePosts

const styles=StyleSheet.create({
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