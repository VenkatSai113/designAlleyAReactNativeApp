import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {View,Text,SafeAreaView,StyleSheet,Dimensions,Image,ScrollView,TouchableOpacity,Button,Platform} from 'react-native'
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import React, { useRef ,useState,useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Topbar from './topbar'
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipeableViews from 'react-swipeable-views-native';
import { Video, ResizeMode } from 'expo-av';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const FeedContainer=(props)=>{
    const video = React.useRef(null);
    const {stateFeed,loginUser}=props

    const {deignerName,postId,caption,likes,logo, designerId,thumbnail,postType,createdAt,tags,designStyle,category,location,occupancy,propertySize,duration,designerLogo,userId,tourId}=stateFeed
    const splitedImages=thumbnail.split(",")
    const [status, setStatus] = React.useState({});
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [savePostStatue,setSavePostStatue]=useState(false);
    const [likePostStatus,setLikePostStatus]=useState(false);
    useEffect(()=>{
        loginUser.designer_id===userId?setSavePostStatue(true):setSavePostStatue(false)
        console.log(savePostStatue)

    },[])
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    let [fontsLoaded] = useFonts({
        'Roboto-Regular': Roboto_400Regular,
      });
    
      if (!fontsLoaded) {
        return null; // Return a loading indicator or placeholder
      }
    const screenWidth=Dimensions.get("window").width
    const onPressSave=async()=>{
        const jwtToken=await AsyncStorage.getItem('jwtToken');
        setSavePostStatue(!savePostStatue) 
        console.log(savePostStatue,"ioyuioyuioyuio")
       
        const postIds={postId,hello:"hello"}
        const savedApiUrl="http://192.168.1.26:9000/deleteSavedPost";
        const options={
          method:"post",
          headers:{
            "Content-Type":"Application/json",
            "Authorization":`Bearer ${jwtToken}`
          },
        //   mode:"cors",
          body:JSON.stringify(postIds)
        }
        const response=await fetch(savedApiUrl,options)
        const data=await response.json()
    }
    const onPressUnSave=async()=>{
        const jwtToken=await AsyncStorage.getItem('jwtToken')
        setSavePostStatue(!savePostStatue)
        console.log(savePostStatue,"ioyuioyuioyuio")
       
        const postIds={postId,hello:"hello"}
        const savedApiUrl="http://192.168.1.26:9000/savedPost";
        const options={
          method:"post",
          headers:{
            "Content-Type":"Application/json",
            "Authorization":`Bearer ${jwtToken}`
          },
        //   mode:"cors",
          body:JSON.stringify(postIds)
        }
        const response=await fetch(savedApiUrl,options)
        const data=await response.json()
    }
    const onPressLike=()=>{
        setLikePostStatus(!likePostStatus)
    }

    return(
        <View >
        <View style={[styles.homeMainContainer, screenWidth<786?{width:wp('95%'),marginLeft:wp('2%')}:{width:wp ('50%'),marginLeft:wp('2%')}]}>
        {/* {splitedImages.length===1 &&postType=="image"?<TouchableOpacity  >
           <Image    source={{uri:`http://192.168.1.26:9000/${thumbnail}`}}  style={styles.feedImage}/>
          </TouchableOpacity>:
          <SwipeableViews style={styles.slideContainer}>
             {splitedImages.map(eachImage=>
                <Image    source={{uri:`http://192.168.1.26:9000/${eachImage}`}}  style={styles.feedImage}/>
                )}
            </SwipeableViews>} */}
            
          
{(postType =="image" || "imageVideo" || "virlTourImage") ?  ((splitedImages.length===1 &&postType=="image")?  <Image source={{uri:`http://192.168.1.26:9000/${thumbnail}`}}  style={styles.feedImage}/>:
<SwipeableViews style={styles.slideContainer}>
{splitedImages.map(eachImage=>{
          if(eachImage.split(".")[1]=="mp4"){
            return(
                <Video
                ref={video}
                
                source={{uri:`http://192.168.1.26:9000/${eachImage}`}} 
                useNativeControls
                resizeMode='contain'
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
                style={styles.feedImage}
              />
            )}
            else{
                return(
                <Image source={{uri:`http://192.168.1.26:9000/${eachImage}`}}  style={styles.feedImage}/>
                )
            }
            })}
</SwipeableViews>):(splitedImages.length>1)?

 <><SwipeableViews>
            {splitedImages.map(eachImage=>
           
           <Video
           ref={video}
           
           source={{uri:`http://192.168.1.26:9000/${eachImage}`}} 
           useNativeControls
           resizeMode='contain'
           isLooping
           onPlaybackStatusUpdate={status => setStatus(() => status)}
           style={styles.feedImage}
         />
           )}</SwipeableViews></>:  <Video
           ref={video}
           
           source={{uri:`http://192.168.1.26:9000/${eachImage[0]}`}} 
           useNativeControls
           resizeMode='contain'
           isLooping
           onPlaybackStatusUpdate={status => setStatus(() => status)}
           style={styles.feedImage}
         />}

            
           <View style={styles.homeBottomProfileView}>
            <View style={styles.profileNameView}>
            <Image    source={{uri:`http://192.168.1.26:9000/${logo}`}}  style={screenWidth>786?styles.profileImage:styles.smallScreenProfileImage}/>
            <View style={styles.profileNameTime}>
            <Text style={styles.designerName}>{deignerName}</Text>
            <Text style={styles.timeText}>1 day ago</Text>
            
            </View>
            </View>
              <View>
                <View style={styles.heartView}>
                    {savePostStatue?<TouchableOpacity onPress={onPressSave}><FontAwesome name="bookmark" style={styles.saveIcon}/></TouchableOpacity>:<TouchableOpacity onPress={onPressUnSave}><Feather name="bookmark" style={styles.saveIcon}/>
                    </TouchableOpacity>}
                    {likePostStatus?<TouchableOpacity onPress={onPressLike}>
                    <AntDesign name="heart" style={styles.unlikeIcon}/>
                    </TouchableOpacity>:<TouchableOpacity onPress={onPressLike}>
                    <AntDesign name="hearto" style={styles.heartIcon}/>
                    </TouchableOpacity>}
                    
                    <MaterialCommunityIcons name="dots-vertical" style={styles.saveIcon}  onPress={toggleModal} />
                </View>
            </View>               
           </View>
           <View>
            <Text style={styles.postDescription}>{caption}
#{postType} #{tags} #{designStyle} #{category} #{location} #{occupancy} #{propertySize}#{duration}</Text>

          </View>
        </View> 
        <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}>
        <View style={styles.modalContent}>
            <View style={styles.popupModelView}>
            <TouchableOpacity onPress={toggleModal}>
            
            <AntDesign name="closecircle" style={styles.closeIcon}/>
          </TouchableOpacity>
                <View style={styles.popupModalRowView}>
                    <AntDesign name="edit" style={styles.editIcon}/>
                <Text style={styles.editPostText}>Edit Post</Text>
                </View>
                <View style={styles.popupModalRowView}>
                    <AntDesign name="delete" style={styles.editIcon}/>
                <Text style={styles.editPostText}>Delete Post</Text>
                </View><View style={styles.popupModalRowView}>
                    <AntDesign name="sharealt" style={styles.editIcon}/>
                <Text style={styles.editPostText}>Share Post</Text>
                </View><View style={styles.popupModalRowView}>
                    <AntDesign name="clockcircleo" style={styles.editIcon}/>
                <Text style={styles.editPostText}>Archive</Text>
                </View>
                <View style={styles.popupModalRowView}>
                    <AntDesign name="hearto" style={styles.editIcon}/>
                <Text style={styles.editPostText}>Add to collection</Text>
                </View>
                <View style={styles.popupModalRowView}>
                    <Feather name="send" style={styles.editIcon}/>
                <Text style={styles.editPostText}>Send</Text>
                </View>
            </View>
         
        </View>
      </Modal> 
        </View>
       
    )
}
export default FeedContainer
const styles=StyleSheet.create({
    slideContainer:{
        height:350,
        width:'100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modal: {
        margin: 0,
        justifyContent: 'flex-end',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
    homeContainer:{
        display:'flex',
        flexDirection:'row',
    },logoImage:{
        width:150,
        height:60,
        resizeMode:"contain",
    },
    notificationIcon:{
        fontSize:30,
        marginLeft:20,
        marginRight:20,
        marginTop:15
    },
    topIconView:{
        flex:1,
        flexDirection:"row"
    },
    chatIcon:{
        fontSize:35,
        marginTop:15
    },
    homeUpperView:{
        backgroundColor:"#fff",
        width:"100%",
        height:60
    },
    postDescription:{
        fontSize:13,
        fontWeight:"normal",
        padding:5,
        marginLeft:5
    },
    homeMainContainer:{
        // width:screenWidth>786?wp('50%'):wp ('95%'),
        // marginLeft:screenWidth>786?wp('2%'):0,
        marginTop:15,
        marginLeft:10,
        borderTopRightRadius:30,
        borderBottomLeftRadius:30,
       
        backgroundColor: 'white', // Background color for your content
        shadowColor: 'gray',  // Set the shadow color to red
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,  // Set the shadow opacity
        shadowRadius: 5,
        elevation: 5, 
        paddingBottom:4 // Add elevation for Android shadow
    },
    feedImage:{
        width:'100%',
        height:350,
        marginBottom:10,
        borderTopRightRadius:30,
    },
    homeBottomProfileView:{
        width:'100%',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    profileImage:{
        height: 55,
        width:55,
       borderTopRightRadius:5,
       borderBottomLeftRadius:5,
        padding:8,
        marginLeft: 7
    },
    smallScreenProfileImage:{
        height: 45,
        width:45,
        borderTopRightRadius:8,
       borderBottomLeftRadius:8,
        padding:8,
        marginLeft:5
    },
    profileNameView:{
        flex:1,
        flexDirection:'row'
    },
    profileNameTime:{
        flex:1,
        flexDirection:'column',
        marginLeft:10
    },
    designerName:{
        fontFamily:'Roboto-Regular',
        fontSize:13,
        fontWeight:'bold',
        marginTop:6

    },
    timeText:{
        fontFamily:'Roboto-Regular',
        fontSize:10,
        marginTop:6
    },
    heartView:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    saveIcon:{
        fontSize:22
    },heartIcon:{
        marginLeft:15,
        fontSize:22,
        marginRight:7
    },
    unlikeIcon:{
        marginLeft:15,
        fontSize:22,
        marginRight:7,
        color:'red'  
    },
    mainColumnView:{
        flex:1,
        flexDirection:'column',
        height:Platform.OS === 'ios'?hp("90%"):hp("100%"),
        backgroundColor:'#fff'
    },
    bottomContainer:{
        height:200,
        width:wp("90%"),
        backgroundColor:'#fff'
    },
    popup:{
       
        height:200,
        width:100
    },
    popupModelView:{
        display:'flex',
        flexDirection:'column',
        
    },
    popupModalRowView:{
        width:wp('100%'),
        display:'flex',
        flexDirection:'row',
      
    },
    editIcon:{
        fontSize:17,
        fontWeight:'bold',
        marginBottom:20
    },
    editPostText:{
        fontSize:16,
        marginLeft:20,
        marginBottom:20,
      
    },
    closeIcon:{
        fontSize:25,
        color:'#ca9881',
        marginLeft:'auto'
    }
})