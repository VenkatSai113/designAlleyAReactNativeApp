import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View,Text,StyleSheet } from "react-native"

const tabs=[
    {id:1,
    content:'All'},
    {id:2,
    content:'Images'},
    {id:3,
    content:'Videos'},
    {id:4,
    content:'360 Tours'}
]
const FinalizedDesigns=()=>{
    return(
        <View style={styles.finalizedContainer}>
            <View style={styles.tabView}>
                {/* {tabs.map(eachItem=>
                    <Text>{eachItem.content}</Text>)} */}
                    <Text>Hello</Text>
            </View>
        </View>
    )
}
export default FinalizedDesigns

const styles=StyleSheet.create({
    finalizedContainer:{
        width:wp('100%'),
    },
    tabView:{
        width:'100%',
        display:1,
        flexDirection:'row',
        justifyContent:'space-around'
    }
})