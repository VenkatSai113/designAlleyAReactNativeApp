import {View,Image,StyleSheet,Dimensions,StatusBar} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather'

const Topbar=()=>{
    const navigation = useNavigation()
    const screenWidth=Dimensions.get("window").width
    const notificationScreen=()=>{
        navigation.push('Notifications', { screen: 'Notifications' });


    }
    const nevigateDashboard=()=>{
        navigation.push('SideProfile', { screen: 'SideProfile' });
    }
    return(
        <View style={styles.homeUpperView}>
              <StatusBar backgroundColor="#fff" />
        <View style={{flex:1,flexDirection:"row",width:'100%',height:'auto',justifyContent:"space-between",marginTop:2,alignItems:"center"}}>
       <Feather name="menu" style={{fontSize:30,fontWeight:'bold',marginLeft:20}} onPress={nevigateDashboard}/>
       <Image source={require('../assets/logo.jpeg')} style={styles.logoImage}/>
       <View>
       <View style={styles.topIconView}>
       <Ionicons name="chatbox-ellipses-outline" style={styles.chatIcon}/>
       <Ionicons name="notifications-outline" style={styles.notificationIcon} onPress={notificationScreen}/>
       <AntDesign  name="plussquare" style={styles.createPostIcon}/>
       </View>
       </View>
        </View>
      </View>
    )
}
export default Topbar
const styles=StyleSheet.create({
    homeContainer:{
        display:'flex',
        flexDirection:'row',
      
    },logoImage:{
        width:120,
        height:40,
        resizeMode:"contain",
        marginLeft:10
        
    },
    notificationIcon:{
        fontSize:22,
        marginLeft:20,
        marginRight:20,
        marginTop:10
       
    },
    topIconView:{
        flex:1,
        flexDirection:"row"
    },
    chatIcon:{
        fontSize:23,
        marginTop:10
    },
    homeUpperView:{
        backgroundColor:"#fff",
        width:"100%",
        height:50,                       
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        shadowColor: 'gray',  // Set the shadow color to red
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,  // Set the shadow opacity
        shadowRadius: 5,
        elevation: 5,  // Add elevation for Android shadow
    },
    createPostIcon:{
        fontSize:22,
        marginRight:20,
        marginTop:10,
        color:"#cb937e"
    }})