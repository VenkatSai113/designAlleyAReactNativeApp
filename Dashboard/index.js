import React, { Component } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StyleSheet, ScrollView, Text, View,Dimensions } from 'react-native'
import PieChart from 'react-native-pie-chart'

export default class Dashboard extends Component {
  render() {
    const widthAndHeight = 200
    const series = [123, 321, 123]
    const sliceColor = ['#d9d9d9', '#cca08b', '#cec2ab']
    const deviceSize= Dimensions.get('window').width
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Overview</Text>
          <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
          <View style={{width:wp('100%'),display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
            <View  style={deviceSize>786?styles.largeDeviceUpcomingCard :styles.upcomingCard} >
            <Text>Total Projects</Text>
            </View>
            <View  style={deviceSize>786?styles.largeDeviceUpcomingCard :styles.upcomingCard} >
            <Text>Rejection Projects</Text>
            </View>
            <View  style={deviceSize>786?styles.largeDeviceUpcomingCard :styles.upcomingCard} >
            <Text>Rejection Reason</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  projectList:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  upcomingCard:{
    width:"90%",
    marginTop:10,
    borderRadius:3,
    backgroundColor:'gray',
    height:60,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
},
largeDeviceUpcomingCard:{
    width:"30%",
    marginTop:10,
    borderRadius:3,
    borderWidth:1,
    borderColor:'#cfc3ad',
    backgroundColor:'gray',
    height:60,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
},
})