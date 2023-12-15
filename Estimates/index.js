import { View,Text,SafeAreaView,StatusBar,ScrollView,StyleSheet,TouchableOpacity,Dimensions} from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const data=[
    {name:'Project 1',id:1},
    {name:'Project 2',id:2},
    {name:'Project 3',id:3},
    {name:'Project 4',id:4},
    {name:'Project 5',id:5},
    {name:'Project 6',id:6},
    
   
]
const AllEstimates=()=>{
    const deviceSize= Dimensions.get('window').width

    return(
        <SafeAreaView>
            <StatusBar backgroundColor='#fff'/>
            <Text style={{marginLeft:20,fontSize:15,fontWeight:"bold"}}>Estimates</Text>

            <ScrollView style={styles.bgContainer}>
            <View style={{width:wp('97%'),display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
           {data.map(eachItem=>
            <TouchableOpacity style={deviceSize>786?styles.largeDeviceUpcomingCard :styles.upcomingCard} id={eachItem.id} >
            <MaterialIcons name="design-services" style={styles.projectIcons}/>
                    <Text>{eachItem.name}</Text>
                    <AntDesign name="right" style={styles.projectIcons}/>
                    </TouchableOpacity>)}
            
                  
                    
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default AllEstimates

const styles=StyleSheet.create({
    bgContainer:{
        height:hp('90%'),
        width:wp('97%'),
        marginLeft:'auto',
        marginRight:'auto',
        display:'flex',
        flexDirection:'column',
        alignContent:'center',
        paddingTop:10
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
    projectIcons:{
        fontSize:20
    }
})