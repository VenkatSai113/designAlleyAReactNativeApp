import Sidebar from '../Sidebar/sidebar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {View,Text,SafeAreaView,StyleSheet,Dimensions,Image,ScrollView,TouchableOpacity,Button,Platform,FlatList,TextInput} from 'react-native'
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import React, { useEffect, useRef ,useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import BottomNavbar from '../Home/bottomNavbar'
import Modal from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import Topbar from '../Home/topbar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExploreFeed from './exploreFeed' 

const Explore=({ navigation })=>{
    const [isModalVisible, setModalVisible] = useState(false);
    const [feedDetails,setFeedDetails]=useState([])
    useEffect(()=>{
        const getJwtToken=async()=>{
        const jwtToken = await AsyncStorage.getItem('jwtToken');
        const feedUrl="http://192.168.1.36:9000/feedData"
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
        console.log(data)
        }
        getJwtToken()
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
        <ExploreFeed feedData={item} key={item.postId}/>
       
    //  <View>
    //     < Text>Hello</Text>
    //  </View>
        );
     const exploreSearchView={
        width:screenWidth,
        backgroundColor:"#fff",
        marginTop:7,
        display:"flex",
        flexDirection:'row',
       justifyContent:'space-evenly',
        alignItems:"center",
        paddingLeft:10,
        borderBottomWidth: 1,  // Set the width of the bottom border
    borderBottomColor: '#000',  // Set the color of the bottom border
    paddingVertical: 10, 
       
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
      const videoClick = async (iconName) => {
        console.log(`Clicked icon: ${iconName}`);
        
        try {
          const jwtToken = await AsyncStorage.getItem('jwtToken');
          const feedUrl = iconName === 'All' ? 'http://192.168.1.36:9000/feedData' : `http://192.168.1.36:9000/filterdData/?type=${iconName}`;
          const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwtToken}`,
            },
          };
          const response = await fetch(feedUrl, options);
          const data = await response.json();
          setFeedDetails(data);
          console.log(data, 'feedData');
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    return(
        <SafeAreaView style={styles.homeContainer}>
            {/* <Sidebar/> */}
            
         <View style={styles.mainColumnView}>
         <Topbar/>
         
         {/* {screenWidth<786?  <Topbar/>:null} */}
         <View style={screenWidth>786?exploreSearchView:smallexploreSearchView}>
            <TextInput placeholder='   Search...' style={styles.searchExplore}/>
            <EvilIcons name="navicon" style={styles.navIconStyle}/>
         </View>
         <View style={screenWidth>786?exploreSearchView:smallexploreSearchView}>
         <View style={styles.bottomIconView}>                                
          <MaterialCommunityIcons name="grid" style={styles.imageIcon} onPress={() => videoClick("All")}/>
          </View>
          <View style={styles.bottomIconView} >
          <Feather name="image" style={styles.fatherImageIcon}   onPress={() => videoClick("image")}/>        
         </View>
         <View style={styles.bottomIconView}>
      <Octicons
        name="video"
        style={styles.imageIcon}
        onPress={() => videoClick("video")}  
      />
    </View>
          <View style={styles.bottomIconView}>
          <MaterialCommunityIcons name="virtual-reality" style={styles.imageIcon}  onPress={() => videoClick("virtualTourImage")} />
          </View>
         </View>
            <ScrollView style={{height:hp('100%')}} >
            <View style={{width:wp('100%'),display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
             {feedDetails.map(eachItem=>
            <ExploreFeed feedData={eachItem} key={eachItem.postId}/>  )}
             
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
export default Explore
const styles=StyleSheet.create({
    exploreSmallFeedFlatImages:{
        marginLeft:'auto',marginRight:"auto",width:wp('100%')
    },
    exploreFeedFlatImages:{
        marginLeft:'auto',marginRight:"auto",width:wp('80%')
    },
    image: {
        width: "33%", // Adjust image width based on the number of columns
        height: 150,
        borderWidth:1,
        borderColor:"#fff"
        
      },
      exloreImagesLarge:{
        width: "30%", // Adjust image width based on the number of columns
        height: 230,
        borderWidth:1,
        borderColor:"#fff"
      },
    iconText:{
        fontFamily:'roboto',
        fontSize:14
    },
    imageIcon:{
        fontSize:22,
        cursor:'pointer'
    },
    fatherImageIcon:{
        fontSize:23
    },
    bottomIconView:{
        width:wp('15%'),
        backgroundColor:"#fff",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:60,
        // borderBottomColor:'red',
        // borderBottomWidth:2
      
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
        fontSize:15,
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