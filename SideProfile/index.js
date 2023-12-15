import { View,Text,SafeAreaView,StyleSheet,StatusBar,Image,Dimensions,TouchableOpacity,ScrollView} from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
const hi='onPressProjects'
const itemList=[
    {name:'Projects',
     id:1,
     click:hi
     },
     {name:'Payments',
     id:2,
     click:'onPressProjects'
     },
     {name:'Estimates',
     id:3,
     click:'onPressProjects'
     },
     {name:'Profile',
     id:4,
     click:'onPressProjects'
     },
     {name:'Notification',
     id:5,
     click:'onPressProjects'
     },
     {name:'Activites',
     id:6,
     click:'onPressProjects'
     },
     {name:'Contact Admin',
     id:7,
     click:'onPressProjects'
     },
     {name:'Invite',
     id:8,
     click:'onPressProjects'
     },
]
const SideProfile=()=>{
    const deviceSize= Dimensions.get('window').width
    const onPressProjects=()=>{
        console.log('hELLO')
    }
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
            <TouchableOpacity  style={deviceSize>786?styles.largeDeviceUpcomingCard :styles.upcomingCard} onClick={eachItem.click} >
            <Text style={styles.projectsText}>{eachItem.name}</Text>
            <AntDesign name="right" style={{fontSize:15,marginRight:20}}/>
            </TouchableOpacity>
                )}
               <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log out         <AntDesign name="logout" style={{fontSize:15}}/></Text>

                </TouchableOpacity>
                
                </View>
                </ScrollView>
                
                        </SafeAreaView>
    )
}
export default SideProfile

const styles=StyleSheet.create({
    mainContainer:{
        width:wp('100%'),
       
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
    }
})