import { DataTable } from 'react-native-paper';
import {TextInput,Dimensions,StyleSheet,View} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useState } from 'react';
import EditEstimate from './editEstimate';

const EditEstimateTables=(props)=>{
    const {spaceProducts,index,totalPrices,marginItem}=props
    const {spaceName,title,quentity,price,productSize,productId,spaceId}=spaceProducts
    const deviceSize=Dimensions.get('window').width
    const [marginPrice,setMarginPrice]=useState('')
    const [finalPrice,setFinalPrice]=useState()
    const [finalProductPrice,setFinalProductPrice]=useState('')
    const [allTotalPrice,setAllTotalPrice]=useState('')
    console.log(marginItem,"marginItemmarginItemmarginItem")
    const lastPrice=quentity*price
    // console.log(price++,"sdfsdfsdfs")
    const finalVlueArray=[234,]
    const handleAddMargin=async()=>{
        // const jwtToken=await AsyncStorage.getItem("jwtToken")
        // console.log(jwtToken)
        // const estimateDetails={marginPrice,productId,spaceId}
        // const apiUrl='http://192.168.1.36:9000/projectEstimation'
        // const options={
        //     method:"POST",
        //     headers:{
        //         'Content-Type':'Application/json',
        //         'Authorization':`Bearer ${jwtToken}`
        //     },
        //     body:JSON.stringify(estimateDetails)
        // }
        // const response=await fetch(apiUrl,options)
        // const data=await response.json()
         console.log('data')
        
        const totalPrice=parseInt(marginPrice)+parseInt(lastPrice)
        setFinalProductPrice(totalPrice)
        totalPrices(index,totalPrice,marginPrice)
       
    }
    const handlechangeMargin=(text)=>{
        setMarginPrice(parseInt(text))
       
    }
    return(
        <DataTable.Row> 
        <DataTable.Cell>{spaceName}</DataTable.Cell> 
        <DataTable.Cell>{title}</DataTable.Cell> 
        <DataTable.Cell>{productSize}</DataTable.Cell> 
        <DataTable.Cell> {quentity}</DataTable.Cell> 
        <DataTable.Cell>{quentity*price}</DataTable.Cell>
        <DataTable.Cell>
            <View style={deviceSize>786?styles.largeScreeInputView :styles.mediumScreenInputView}>
            <TextInput
              label="Input Field"
            //   value={inputValue}
              onChangeText={handlechangeMargin}
              keyboardType='numeric'
            style={deviceSize>786?styles.largeScreen :styles.mediumScreen}/>
            <AntDesign name="checkcircleo" style={{fontSize:20,fontWeight:'bold',marginLeft:5}} onPress={handleAddMargin}/>
            </View>
            </DataTable.Cell>
        <DataTable.Cell>{finalProductPrice}</DataTable.Cell>
      </DataTable.Row> 
    )
}
export default EditEstimateTables
const styles=StyleSheet.create({
    largeScreen:{
        height:30,
        width:100,
        borderRadius:3,
        borderWidth:1,
        borderColor:'#c99780'
    },
    mediumScreen:{
        height:30,
        width:40,
        borderRadius:3,
        borderWidth:1,
        borderColor:'#c99780'

    },
    largeScreeInputView:{
        display:'flex',
        flexDirection:"row"
    },
    mediumScreenInputView:{
        display:'flex',
        flexDirection:"column"
    }
})