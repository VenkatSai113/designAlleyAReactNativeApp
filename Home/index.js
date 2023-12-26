import Sidebar from '../Sidebar/sidebar'
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
import FeedContainer from './FeedContainer'
import { useRoute } from '@react-navigation/native';

const Home=()=>{
    const route = useRoute();
  const [feedDetails,setFeedDetails]=useState([])
  const [loginUser,setLoginUser]=useState('')
  useEffect(()=>{
    // const savedPosts=route.name
    // const selectedPostId1=route.params.savedPostId
//  console.log(savedPosts)
    if(route.name=="savedpostHome"){
        console.log("Hekakafmas")
       const savedPosttsFun=async()=>{
            // const postInfo1={selectedPostId1,hello:"hello"}
        const jwtToken=await AsyncStorage.getItem('jwtToken')
        const apiUrl='http://192.168.1.44:9000/designerSelectedPost'
        const option={
            method:'POST',
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${jwtToken}`
            },
            body:JSON.stringify(postInfo1)
        }
        const response=await fetch(apiUrl,option)
        const data =await response.json()
        console.log(data,'fghfghfghfghfghf')
        setFeedDetails(data)
    }
    savedPosttsFun()
    }else{
    console.log('sdfsdfsdfsdfsdfsdf')
    const getJwtToken=async()=>{
      
    const jwtToken = await AsyncStorage.getItem('jwtToken');
    console.log(jwtToken,'jwtTokenjwtTokenjwtTokenjwtToken')
    const feedUrl="http://192.168.1.44:9000/feedData"
    const options={
        method:"GET",
        headers:{
            "Content-Type":"Application/json",
            "authorization":`Bearer ${jwtToken}`,
            'role':1
        }
    }
    const response=await fetch(feedUrl,options);
    const data=await response.json();
    setFeedDetails(data)  
    }
    getJwtToken()
}
    const logedInUser=async()=>{
        const jwtToken = await AsyncStorage.getItem('jwtToken');
        const logUrl="http://192.168.1.44:9000/logedInUser"
    const options={
        method:"GET",
        headers:{
            "Content-Type":"Application/json",
            "Authorization":`Bearer ${jwtToken}`
        }
    }
    const response=await fetch(logUrl,options);
    const data1=await response.json();
    if(response.ok===true){
        setLoginUser(data1)
        console.log(data1,'data111')
    }
    }
    logedInUser()
},[])
  const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
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
    return(
        <SafeAreaView style={styles.homeContainer}>
            {/* <Sidebar/> */}
         <View style={styles.mainColumnView}>
         {screenWidth<786?  <Topbar/>:<Topbar/>}
            <ScrollView >
              {feedDetails.map(eachItem=>
                  <FeedContainer stateFeed={eachItem} key={eachItem.postId} loginUser={loginUser} />
              )}
            </ScrollView>
            {/* {screenWidth<786?<BottomNavbar/>:null} */}
          </View>
          <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Text>This is your bottom-up and growing modal content. </Text>
          
          <Text>This is your bottom-up and growing modal content. </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View> 
      </Modal>
        </SafeAreaView>
    )
}
export default Home
const styles=StyleSheet.create({
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
    }
})