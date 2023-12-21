import { View,Text,SafeAreaView,StyleSheet,StatusBar,Image,Dimensions,TouchableOpacity,ScrollView,Platform,TextInput,Button } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Modal from 'react-native-modal';
import { useState } from "react";
const hi='onPressProjects'
const itemList=[
    {name:'Projects',
     id:1,
     click:'Projects'
     },
     {name:'Payments',
     id:2,
     click:'Payments'
     },
     {name:'Estimates',
     id:3,
     click:'AllEstimates'
     },
     {name:'Profile',
     id:4,
     click:'Profile'
     },
     {name:'Notification',
     id:5,
     click:'Notifications'
     },
     {name:'Activites',
     id:6,
     click:'Activity'
     },
     {name:'Contact Admin',
     id:7,
     click:'onPressProjects'
     },
   
]
const SideProfile=({navigation})=>{
    const deviceSize= Dimensions.get('window').width
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    const onPressProjects=()=>{
        console.log('hELLO')
    }
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (text) => {
      // Allow only numeric input
      const numericValue = text.replace(/[^0-9]/g, '');
      setInputValue(numericValue);
    };
  
    const handleButtonPress = () => {
      // Handle the button press with the numeric value
      console.log('Numeric Value:', inputValue);
    };
    return(
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView style={{height:hp('90%')}}>
            <StatusBar backgroundColor='#fff' />
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around', alignItems:'center',width:wp('100%'),marginTop:30}}>
            <View>
                <Image style={styles.profileImage}  source={{uri:'https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg'}}/>
            </View>
            <View>
                <Text style=
                {styles.designerName}>Designer Name</Text>
                <Text style={styles.editProfile}>Edit Profile</Text>
            </View>
           
            </View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around', alignItems:'center',width:wp('100%'),marginTop:30, borderBottomWidth: 1,borderBottomColor: '#9c9c9c', // Set the color of the bottom border
    padding: 10}}>
                <View >
                <Text style={styles.numberOfPosts}><Text style={styles.numberText}>15</Text> No. of Post</Text>
                </View>
                <View>
                <Text style={styles.numberOfPosts}><Text style={styles.numberText}>15</Text> On-going Projects</Text>
                </View>
                <View>
                <Text style={styles.numberOfPosts}><Text style={styles.numberText}>15</Text> Finished Projects</Text>
                </View>
                
                </View>
                <View style={{width:wp('100%'),display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
            {itemList.map(eachItem=>
            <TouchableOpacity  style={deviceSize>786?styles.largeDeviceUpcomingCard :styles.upcomingCard} onPress={() =>   navigation.push(eachItem.click, { screen: eachItem.click })} >
            <Text style={styles.projectsText}>{eachItem.name}</Text>
            <AntDesign name="right" style={{fontSize:15,marginRight:20}}/>
            </TouchableOpacity>
                )}
                <TouchableOpacity  style={deviceSize>786?styles.largeDeviceUpcomingCard :styles.upcomingCard} onPress={toggleModal}>
            <Text style={styles.projectsText}>Invite</Text>
            <AntDesign name="right" style={{fontSize:15,marginRight:20}}/>
            </TouchableOpacity>
               <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log out         <AntDesign name="logout" style={{fontSize:15}}/></Text>
                </TouchableOpacity>
                </View>
                </ScrollView>
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
          <View >
            <Text style={styles.invitationText}>Invitation</Text>
            <Text style={styles.inviteDesigner}>Invite Designer</Text>
            <View style={{ padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10,borderRadius:3}}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Enter Phone number"
      />
      <TouchableOpacity style={{backgroundColor:'#ca9881', height: 40,  marginBottom: 10, paddingHorizontal: 10,borderRadius:3,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      
      <Text style={{color:'#fff',fontSize:14,fontWeight:'normal'}}>Submit</Text>
      </TouchableOpacity>
    </View>
            
          </View>
          

                {/* <View style={styles.popupModalRowView}>
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
                </View> */}
            </View>
         
        </View>
      </Modal> 
                
                        </SafeAreaView>
    )
}
export default SideProfile

const styles=StyleSheet.create({
    mainContainer:{
        width:wp('100%'),
        height:hp('83%'),
        backgroundColor:'#fff',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    profileImage:{
        height:100,
        width:100,
        borderRadius:50
    },designerName:{
        fontSize:15,
        fontWeight:'bold',

    },
    editProfile:{
        marginTop:8,
        fontSize:15,
        fontWeight:'normal',
        color:'gray'
    },
    numberOfPosts:{
        fontSize:15,
        fontWeight:'normal',
        
    },
    numberText:{
        fontSize:14,
        fontWeight:'bold'
    },
    upcomingCard:{
        width:"90%",
        marginTop:10,
        borderRadius:3
        ,
        backgroundColor:'#fff',
        height:60,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth: 1,borderBottomColor: '#9c9c9c',

    },
    largeDeviceUpcomingCard:{
        width:"30%",
        marginTop:10,
        borderRadius:3,
        borderWidth:1,
        borderColor:'#cfc3ad',
        backgroundColor:'#fff',
        height:70,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth: 1,borderBottomColor: '#9c9c9c',
    },
    projectsText:{
        fontSize:15,
        fontWeight:'normal',
        marginLeft:20
    },
    logoutButton:{
        height:50,
        width:200,
        borderRadius:3,
        backgroundColor:'black',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:220,
        marginTop:20
    },
    logoutText:{
        color:'#fff',
        fontSize:15,
        fontWeight:'normal'
    },
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
    },
    invitationText:{
        fontWeight:'bold',
        textAlign:'center',
     
    },
    inviteDesigner:{
        fontWeight:'normal',
        textAlign:'center',
        fontSize:15,
        marginTop:15
     
    }

})