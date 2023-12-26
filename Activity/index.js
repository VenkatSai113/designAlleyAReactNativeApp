import {View,Text,SafeAreaView,StatusBar,StyleSheet,TouchableOpacity,Dimensions } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

const Activity=()=>{
    const deviceSize= Dimensions.get('window').width
    const navigation = useNavigation();

    const handleLikedPosts=()=>{
        navigation.push('LikedPosts', { screen: 'LikedPosts' });
    }
    return(
        <SafeAreaView style={styles.bgContainer}>
            <StatusBar backgroundColor='#fff' />
            <Text style={styles.activityText}>One place to manage your Activity</Text>
            <Text style={styles.interactionText}>Interaction</Text>
            <View style={{width:wp('97%'),display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
            <TouchableOpacity style={deviceSize>786?styles.largeDeviceUpcomingCard :styles.upcomingCard} onPress={handleLikedPosts}  >
                <AntDesign name="hearto" style={styles.activateIcon}/>
                <Text>Likes</Text>
                <AntDesign name="right" style={styles.activateIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={deviceSize>786?styles.largeDeviceUpcomingCard :styles.upcomingCard}  >
                <EvilIcons name="comment" style={styles.activateIcon}/>
                <Text>Comments</Text>
                <AntDesign name="right" style={styles.activateIcon}/>
                <TouchableOpacity></TouchableOpacity>
                </TouchableOpacity> 
                <TouchableOpacity style={deviceSize>786?styles.largeDeviceUpcomingCard :styles.upcomingCard}  >
                <Feather name="bookmark" style={styles.activateIcon}/>
                <Text>Saved</Text>
                <AntDesign name="right" style={styles.activateIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={deviceSize>786?styles.largeDeviceUpcomingCard :styles.upcomingCard}  >
                <Ionicons name="people-outline" style={styles.activateIcon}/>
                <Text>Saved</Text>
                <AntDesign name="right" style={styles.activateIcon}/>
                </TouchableOpacity>
                </View>

        </SafeAreaView>
    )
}
export default Activity

const styles=StyleSheet.create({
    bgContainer:{
        height:hp('90%'),
        width:wp('97%'),
        marginLeft:'auto',
        marginRight:'auto',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    activityText:{
        fontSize:15,
        fontWeight:'bold',
        marginTop:10
    },
    interactionText:{
        textAlign:'left',
        marginRight:"auto",
        fontSize:15,
        color:'#b5b5b5',
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
        justifyContent:'space-around',
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
        justifyContent:'space-around',
        alignItems:'center',
        borderBottomWidth: 1,borderBottomColor: '#9c9c9c',
    },
    activateIcon:{
        fontSize:17
    }
})