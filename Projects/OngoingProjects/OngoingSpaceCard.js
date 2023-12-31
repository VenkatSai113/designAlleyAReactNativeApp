import { View,Text,Image, StyleSheet,TouchableOpacity,Dimensions} from "react-native"
import { useNavigation } from '@react-navigation/native';
const OngoingSpaceCard=(props)=>{
    const navigation = useNavigation();
    const {spaceDetails}=props
  const {spaceName,spaceImage,spaceId}=spaceDetails
    const deviceSize= Dimensions.get('window').width
    const hello=()=>{
        console.log("Hello")
    }
    const handleChildClick=(childMessage)=>{
        const params = {
            spaceId: spaceId,
            spaceImage:spaceImage
          };
          navigation.navigate('SpaceDetails', params,{ screen: 'SpaceDetails' });
            }
    
    return(
        <TouchableOpacity style={deviceSize>786?styles.largeDeviceUpcomingCard :styles.upcomingCard} onPress={handleChildClick}>
           <View>
            <Image source={{uri:`http://192.168.1.36:9000/${spaceImage}`}} style={styles.cardImage} />
            <Text style={styles.projectName}>{spaceName}</Text>
          
           </View>
           </TouchableOpacity>
    )
}
export default OngoingSpaceCard

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