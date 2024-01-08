import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View,Text,StyleSheet,ScrollView,Image,Dimensions, TouchableOpacity ,Alert,Platform} from "react-native"
import { DataTable } from 'react-native-paper'; 
import EstimateItems from './estimateItems'
import { useNavigation } from '@react-navigation/native';

let sum1=null
let margin=null
let priceArray=[]
let marginArray=[]
let spaceIdArray=[]
let productIdArray=[]
const EstimateList=({route})=>{
    const navigation = useNavigation();
    const {projectId} = route.params;
    const [productDetails,setProductDetails]=useState([])
    const [profileData,setProfileData]=useState([])
    const [totalEstimatePrice,setTotalEstimatePrice]=useState(sum1)
    const [allProductsPrice,setAllProductsPrice]=useState('')
    const [marginTotal,setMarginTotal]=useState('')
    const [spaceIdsData,setSpaceIdsData]=useState(spaceIdArray)
    const [estimateButtonStatus,setEstimateButtonStatus]=useState(true)
    const deviceSize= Dimensions.get('window').width
    useEffect(()=>{
     
        const estimateSpaceProducts=async()=>{
            const jwtToken=await AsyncStorage.getItem("jwtToken")
            const projectDetails={projectId,hello:"hello"}
            const apiUrl="http://192.168.1.36:9000/estimateProducts"
            const options={
                method:"POST",
                headers:{
                    "Content-Type":"Application/json",
                    "Authorization":`Bearer ${jwtToken}`
                },
                body:JSON.stringify(projectDetails)
            }
            const response=await fetch(apiUrl,options);
            const data=await response.json()
            console.log(data,"poihgfdxs")
            setProductDetails(data)
            let priceDataArray=[]
           
        let i=0
            data.map(item=>
                priceDataArray.push(item.price*item.quentity),
                console.log(priceDataArray,'dfsdfsdfs'),
               )
               data.forEach(element => {
                priceArray.push(0)
                marginArray.push(0)
                spaceIdArray.push(element.spaceId)
                productIdArray.push(element.productId)
               });
               console.log(priceDataArray,"priceeeeee")
               const productPriceValue = priceDataArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
               console.log(productPriceValue); // Output: 15
               setAllProductsPrice(productPriceValue)

        }
        estimateSpaceProducts()
        const getDesignerDetails=async()=>{
            const jwtToken=await AsyncStorage.getItem("jwtToken")
            const apiUrl="http://192.168.1.36:9000/estimateDesignerDetails"
            const options={
                method:"GET",
                headers:{
                    "Content-Type":"Application/json",
                    "Authorization":`Bearer ${jwtToken}`
                },
            }
            const response=await fetch(apiUrl,options)
            const data=await response.json()
            console.log(data,"data")
            setProfileData(data)
        }
        getDesignerDetails()
    },[])

   
    const totalPrices=(index,totalPrice,marginPrice)=>{
      
        priceArray.splice(index,1,parseInt(totalPrice))
        console.log(priceArray,index,"guiyitysdfs")
        marginArray.splice(index,1,parseInt(marginPrice))
        hello()
    }

    const hello=()=>{
          sum1 = priceArray.reduce((acc, currentValue) => acc + currentValue, 0);
        console.log(sum1); // Output: 15 
        setTotalEstimatePrice(sum1) 
        margin= marginArray.reduce((acc, currentValue) => acc + currentValue, 0);
        setMarginTotal(margin)
        console.log(margin,'marginnn'); 

    }
    const handleGenerateEstimate=async()=>{
        const jwtToken=await AsyncStorage.getItem('jwtToken')
        console.log(marginArray,priceArray,spaceIdArray,productIdArray)
        const estimateData={marginArray,priceArray,spaceIdArray,productIdArray}
        const apiUrl='http://192.168.1.36:9000/estimateDataApi'
        const options={
            method:'POST',
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${jwtToken}`
            },
            body:JSON.stringify(estimateData)
        }
        const response=await fetch(apiUrl,options)
        const data=await response.json()
        if(response.ok===true){
            if(Platform.OS==='web'){
                alert(data)
                setEstimateButtonStatus(!estimateButtonStatus)
            }
            else{
                Alert.alert(data)
                setEstimateButtonStatus(!estimateButtonStatus)
            }
           
        }
        console.log(data)
    }
    const params={projectId:projectId}
    const handleEditEstimate=()=>{
        navigation.navigate('EditEstimate',params ,{ screen: 'EditEstimate' });
       

    }
   
    return(
        
        <View>
        <ScrollView style={styles.bgContainer}>
           <View style={styles.estimateView}>
            <Image source={{uri:'http://192.168.1.36:9000/uploads/1692771676277_profileImage.jpeg'}} style={{height:100,width:100,borderRadius:3,margin:10}}/>
            <Text style={{fontSize:14,fontWeight:'bold',marginRight:'10%'}}>Estimate No:01</Text>
            </View>
            <View style={deviceSize>786?styles.middleView :styles.largeView}>
                <Text style={{fontSize:14,fontWeight:'bold',marginTop:10}}>Company name / Designer name:   <Text style={{fontSize:14,fontWeight:'normal',marginTop:10}}>{profileData.desigener_name}</Text></Text>
                <Text style={{fontSize:14,fontWeight:'bold',marginTop:10}}>Address:   <Text style={{fontSize:14,fontWeight:'normal',marginTop:10}}>{profileData.address}</Text></Text>
                <Text style={{fontSize:14,fontWeight:'bold',marginTop:10}}>City/Area:   <Text style={{fontSize:14,fontWeight:'normal',marginTop:10}}>{profileData.area}</Text></Text>
            </View>
            <View style={styles.container}>
                  <DataTable style={styles.container}> 
      <DataTable.Header style={styles.tableHeader}> 
        <DataTable.Title style={{color:'red'}}><Text  style={styles.tableHeaderText}>Space Name</Text></DataTable.Title> 
        <DataTable.Title><Text  style={styles.tableHeaderText}>Product</Text></DataTable.Title> 
        <DataTable.Title><Text  style={styles.tableHeaderText}>Units</Text></DataTable.Title> 
        <DataTable.Title><Text  style={styles.tableHeaderText}>Qty</Text></DataTable.Title> 
        <DataTable.Title><Text  style={styles.tableHeaderText}>Price</Text></DataTable.Title>
        <DataTable.Title><Text  style={styles.tableHeaderText}>Margin</Text></DataTable.Title> 
        <DataTable.Title><Text  style={styles.tableHeaderText}>Final Price</Text></DataTable.Title>
         
      </DataTable.Header> 
     
      {productDetails.map((eachItem,index)=>
      <EstimateItems spaceProducts={eachItem} index={index} totalPrices={totalPrices} key={eachItem.index} />
        )}
         <DataTable.Row> 
         <DataTable.Cell  ></DataTable.Cell> 
        <DataTable.Cell  ></DataTable.Cell> 
        <DataTable.Cell></DataTable.Cell> 
        <DataTable.Cell><Text style={{fontFamily:'roboto',fontWeight:'bold',fontSize:13}}>Total</Text></DataTable.Cell> 

        <DataTable.Cell  ><Text style={{fontFamily:'roboto',fontWeight:'bold',fontSize:13}}>{allProductsPrice}</Text></DataTable.Cell> 
        <DataTable.Cell  ><Text style={{fontFamily:'roboto',fontWeight:'bold',fontSize:13}}>{marginTotal}</Text></DataTable.Cell> 
        <DataTable.Cell><Text style={{fontFamily:'roboto',fontWeight:'bold',fontSize:13}}>{totalEstimatePrice}</Text></DataTable.Cell> 
        </DataTable.Row>
    </DataTable>
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'   }}> 
    <View>
    <TouchableOpacity style={styles.editEstimateButton} onPress={handleEditEstimate}>
        <Text style={styles.tableHeaderText}>Edit Estimate</Text>
    </TouchableOpacity>
    </View>
    <View>
    {estimateButtonStatus&&<TouchableOpacity style={styles.generateEstimateButton} onPress={handleGenerateEstimate}>
        <Text style={styles.tableHeaderText}>Generate Estimate</Text>
    </TouchableOpacity>}
    
    </View>
    </View>
      </View>
        </ScrollView>
        </View>

    )
}
export default EstimateList

const styles=StyleSheet.create({
    container: { flex: 1,width:wp('100%') , paddingTop: 10, backgroundColor: '#fff' },
    head: { backgroundColor: 'red',color:'red'  },
    text: { margin: 6 },
    bgContainer:{
        height:hp('85%'),
        width:wp('100%'),
    },
    estimateView:{
        width:"100%",
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center'
    },
    generateEstimateButton:{
        height:40,
        width:170,
        borderRadius:3,
        backgroundColor:'#c99780',
        color:"#fff",
        marginLeft:'auto',
        marginRight:'auto',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    editEstimateButton:{
        height:40,
        width:170,
        borderRadius:3,
        backgroundColor:'#8b8a8a',
        color:"#fff",
        marginLeft:'auto',
        marginRight:'auto',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    middleView:{
        width:wp('95%'),
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:10
      
    },
    largeView:{
        width:wp('100%'),
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        // alignItems:'center'
        marginLeft:15
    },
    container: { 
        padding: 10, 
      }, 
      tableHeader: { 
        backgroundColor: '#c99780', 
        
      },
      tableHeaderText:{
        color:"#fff",
        fontSize:14,
       
      }
})