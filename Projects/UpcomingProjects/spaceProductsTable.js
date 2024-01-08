import { View ,Text,TextInput,StyleSheet} from "react-native"
import { DataTable } from 'react-native-paper'; 
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const SpaceProductsTable=(props)=>{
    const {spaceProducts,deleteSpaceProduct}=props
    const {title,productSize,quentity,productId,projectSpaceProductId}=spaceProducts
    const [editIconStatus,setEditIconStatus]=useState(true)

    const editQuentity=()=>{
        setEditIconStatus(!editIconStatus)
    }
    const handleDeleteProducts=()=>{
      
        deleteSpaceProduct(projectSpaceProductId)
    }
    return(
        <>
        <DataTable.Row> 
      <DataTable.Cell>{title}</DataTable.Cell> 
      <DataTable.Cell>{productSize}</DataTable.Cell> 
      <DataTable.Cell> {editIconStatus?<><Text>{quentity}</Text><TouchableOpacity><Entypo name="pencil" style={{fontSize:20,fontWeight:'bold'}} onPress={editQuentity} /></TouchableOpacity></> :<><TextInput  placeholder="Enter quentity" keyboardType="numeric"  style={styles.input1}/> <AntDesign name="check" style={{fontSize:20,fontWeight:'bold'}} onPress={editQuentity} /></>}</DataTable.Cell> 

      <DataTable.Cell>    <AntDesign name="delete" style={{fontSize:20,fontWeight:'bold'}} onPress={handleDeleteProducts}/></DataTable.Cell>
    </DataTable.Row> 
  
    </>
    
    )
}
export default SpaceProductsTable
const styles=StyleSheet.create({
    input1: {
        width: 50,
        height: 30,
        borderColor: 'red',
        borderWidth: 1,
        padding: 10,
      },
})