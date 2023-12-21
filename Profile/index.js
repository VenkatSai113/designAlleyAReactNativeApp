import Sidebar from '../Sidebar/sidebar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {View,Text,SafeAreaView,StyleSheet,Dimensions,Image,ScrollView,TouchableOpacity,Button,Platform,FlatList,TextInput} from 'react-native'
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import React, { useRef ,useState,useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import BottomNavbar from '../Home/bottomNavbar'
import Modal from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfilePosts from './profilePosts'
import Topbar from '../Home/topbar';

const Profile=({ navigation })=>{
    const [isModalVisible, setModalVisible] = useState(false);
    const [profileData,setProfileData]=useState('')
    const [profilePostData,setProfilePostData]=useState([]);

    useEffect(()=>{
        const profileInfo=async()=>{
            const jwtToken=await AsyncStorage.getItem('jwtToken')
            const apiUrl='http://192.168.1.44:9000/profileData';
            const options={
                method:'GET',
                headers:{
                    'Content-Type':'Application/json',
                    'Authorization':`Bearer ${jwtToken}`
                }
            }
            const response=await fetch(apiUrl,options);
            const data=await response.json()
        
            setProfileData(data)
            console.log(data,'datatata')
          
          const poistJwtToken=await AsyncStorage.getItem('jwtToken')
          
          const postApiUrl="http://192.168.1.44:9000/profileAllposts"
        const postOptions={
            headers:{
                "Content-Type":"Application/json",
                "authorization":`Bearer ${poistJwtToken}`
            },
            method:"GET"
        }
        const postResponse=await fetch(postApiUrl,postOptions)
        const  postData=await postResponse.json()
            setProfilePostData(postData.postResponse)
            console.log(postData.postResponse,'postResponsepostResponse')
           
        }
        profileInfo()
    },[])
    const data = [
        { id: '1', uri: 'https://tse1.mm.bing.net/th?id=OIP.NbfPECA64xbFnmW58MbWDQHaEo&pid=Api&P=0&h=180' },
        { id: '2', uri: 'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9' },
        { id: '3', uri: 'https://tse3.mm.bing.net/th?id=OIP.Z0PLkCGpEDNcan8n3m-OIAHaFk&pid=Api&P=0&h=180' },
        { id: '4', uri: 'https://tse1.mm.bing.net/th?id=OIP.NbfPECA64xbFnmW58MbWDQHaEo&pid=Api&P=0&h=180' },
        { id: '5', uri: 'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9' },
        { id: '6', uri: 'https://tse3.mm.bing.net/th?id=OIP.Z0PLkCGpEDNcan8n3m-OIAHaFk&pid=Api&P=0&h=180' },
        
        // Add more images as needed
      ];
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
    const renderItem = ({ item }) => (
        <Image source={{ uri: item.uri }} style={styles.image}  onPress={() => navigation.navigate('Home')}/>
      );
     const exploreSearchView={
        width:screenWidth-200,
        backgroundColor:"#fff",
        marginTop:7,
        display:"flex",
        flexDirection:'row',
       justifyContent:'space-evenly',
        alignItems:"center",
        paddingLeft:10,
       
    }
      const smallexploreSearchView={
        width:wp('70%'),
        width:wp("100%"),
        backgroundColor:"#fff",
        marginTop:7,
        display:"flex",
        flexDirection:'row',
       justifyContent:'space-evenly',
        alignItems:"center",
       
        
      }
    return(
        <SafeAreaView style={styles.homeContainer}>
           
            {/* <Sidebar/> */}
         <View style={styles.mainColumnView}> 
         {/* {screenWidth<786?  <Topbar/>:null} */}
         <Topbar/>
         <View style={styles.profileView}>
           <View style={styles.profileImageView}>
            <Image style={styles.profileImage1} source={{uri:`http://192.168.1.44:9000/${profileData.logo}`}}/>
           <Text style={styles.designerNameStyle}>{profileData.desigener_name}</Text>
           </View>
           <View style={styles.profileContainer}>
           <View style={styles.profileEditView} >
            <TouchableOpacity style={styles.editButton1}>
                <Text style={styles.editButtonText}><Feather name="edit" style={{fontSize:13}}/> Edit</Text>
            </TouchableOpacity>
           
            <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.editButtonText}><Entypo name="share-alternative" style={{fontSize:16}}/>  Share Profile</Text>
            </TouchableOpacity>
         </View>
         <View style={styles.followRowView}>
            <View style={styles.postCountView}>
            <Text style={styles.postCountText}>69</Text>
            <Text  style={styles.postCountText}>Post</Text>
            </View>
            <View style={styles.postCountView}>
            <Text  style={styles.postCountText}>45</Text>
            <Text  style={styles.postCountText} >Followers</Text>
            </View>
            <View style={styles.postCountView}>
            <Text  style={styles.postCountText}>353</Text>
            <Text  style={styles.postCountText}>Following</Text>
            </View>
           
         </View>
           </View>
         </View>
         <View style={screenWidth>786?exploreSearchView:smallexploreSearchView}>
         <View style={styles.bottomIconView}>
          <MaterialCommunityIcons name="grid" style={styles.imageIcon}/>
          </View>
         
          <View style={styles.bottomIconView}>
          <Feather name="image" style={styles.imageIcon}/>
        
         </View>
          <View style={styles.bottomIconView}>
          <Octicons name="video" style={styles.imageIcon}/>
         </View>
        
          <View style={styles.bottomIconView}>
          <MaterialCommunityIcons name="virtual-reality" style={styles.imageIcon}/>
        
          </View>
         </View>
         <ScrollView>
         <View style={{width:wp('100%'),display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
                {profilePostData.map(eachPost=>
            <ProfilePosts postDetails={eachPost} key={eachPost.postId}/>
            )}
             {/* <FlatList
        data={profilePostData}
        renderItem={renderItem.thumbnail}
        keyExtractor={(item) => item.id}
        numColumns={3} // Adjust the number of columns as neededfdfdfg
      /> */}
            </View>
            </ScrollView>
            {/* {screenWidth<786?<BottomNavbar/>:null} */}
          </View>
          <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text>This is your bottom-up and growing modal content. </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
        </SafeAreaView>
    )
}
export default Profile

const styles=StyleSheet.create({
    postImages1:{
        height:150,
        width:'30%'
    },
    postImages:{
        width:wp('100%'),
        backgroundColor:'red',
        display:'flex',
        flexDirection:'row'
    },
    designerNameStyle:{
        textAlign:"center",
        fontFamily:'roboto',
        fontSize:13,
        fontWeight:'bold',
        marginTop:5
    },
    profileImageView:{
        width:wp('30%'),
        display:'flex',
        flexDirection:'column',
        justifyContent:"flex-start",
        alignContent:'center',
        textAlign:'center',
    },
    postCountText:{
        fontFamily:'roboto',
        fontSize:12,
        fontWeight:'bold'
    },
    postCountView:{
        height:40,
        width:'33%',
        borderRightColor:'#e3e3e3',
        borderRightWidth:1,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:20
    },
    followRowView:{
        display:"flex",
        flexDirection:"row",
        width:wp('60%'),
    },
    profileContainer:{
        display:'flex',
        flexDirection:"column",
        justifyContent:'space-around',
        width:wp('65%'),
        marginRight:10,
        height:130
    },
    editButtonText:{
        fontFamily: 'Roboto', 
        fontSize: 13,
        color:'#fff'
    },
    editButton1:{
        height:30,
        width:100,
        backgroundColor:'#2a2828',
        display:"flex",
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        borderRadius:3
    },
    shareButton:{
        height:30,
        width:120,
        backgroundColor:'#2a2828',
        display:"flex",
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center',
        color:"#fff",
        textAlign:"center",
        borderRadius:3
    },
    profileEditView:{
        display:"flex",
        flexDirection:"row",
        justifyContent:'space-evenly',
        width:'100%',
        marginRight:40
    },
    profileImage1:{
        height:120,
        width:100,
        borderRadius:3,
        marginLeft:4
    },
    profileView:{
        width:wp('100%'),
        height:'auto',
        display:"flex",
        flexDirection:"row",
        justifyContent:'space-between',
        marginTop:15,
        borderBottomWidth:1,
        borderColor:'#e3e3e3',
        paddingBottom:4,
        alignItems:'center'
    },
    image: {
        width: "33%", // Adjust image width based on the number of columns
        height: 150,
        margin: 0,
        borderRadius: 0,
        borderWidth:1,
        borderColor:'#fff',
      },
    iconText:{
        fontFamily:'roboto',
        fontSize:14
    },
    imageIcon:{
        fontSize:22
    },
    bottomIconView:{
        width:wp('15%'),
        backgroundColor:"#fff",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:60,
    },
    navIconStyle:{
        fontSize:50
    },
    searchExplore:{
        width:wp('70%'),
        height:40,
        backgroundColor:"#fff",
        borderWidth:1,
        borderColor:"black",
        marginTop:6,
        borderRadius:8
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
        fontSize:16,
        fontWeight:"normal",
        padding:5
    },
    homeMainContainer:{
        // width:screenWidth>786?wp('50%'):wp ('95%'),
        // marginLeft:screenWidth>786?wp('2%'):0,
        marginTop:25,
        marginLeft:10,
        borderTopRightRadius:30,
        borderBottomLeftRadius:30,
        padding:10,
        backgroundColor: 'white', // Background color for your content
        shadowColor: 'gray',  // Set the shadow color to red
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,  // Set the shadow opacity
        shadowRadius: 5,
        elevation: 5,  // Add elevation for Android shadow
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
        height: 65,
        width:65,
       borderTopRightRadius:5,
       borderBottomLeftRadius:5,
        padding:8,
        marginLeft: 0
    },
    smallScreenProfileImage:{
        height: 55,
        width:55,
        borderTopRightRadius:10,
       borderBottomLeftRadius:10,
        padding:8,
        marginLeft:0
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
        fontSize:24
    },heartIcon:{
        marginLeft:15,
        fontSize:24,
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