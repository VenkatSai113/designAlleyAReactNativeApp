import {View,Text,SafeAreaView,StatusBar,Image,StyleSheet,Platform,Dimensions,TouchableOpacity,TextInput,ScrollView} from 'react-native'
// import {Row,Col} from 'react-native-responsive-grid-system'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views-native';
import { Table, Row, Rows } from 'react-native-table-component';

const getDeviceSize = () => {
    const screenWidth = Dimensions.get('window').width; 
    if (screenWidth >= 600) {
      return 'large';
    } else {
      return 'medium';
    }
  };
const SpaceDetails=()=>{
    const deviceSize = getDeviceSize();
    const [singleProduct,setSingleProduct]=useState('')
    const [productImages,setProductImages]=useState([])
    const [stateTableData,setStateTableData]=useState({ tableHead: ['Item Description', 'Units', 'Qty'],
    tableData: [
      ['1dfgdfgdfgdfgdf ggdsgf sdfsdfsdfsdf sdfsdfsdfsdxcvxcvxcv ssdfsdfsdfsdf sdfsdfsdfsdferwe wwerwerwerwerwerwe werfsfsdfsdf sdfsdfsd sdfsdfsd fsdfsdfsd sdfsdfsdfsdfsdfsdfsd sdfsdfs sdfsdfsdfsdf sdfsdf', '2', '3'],
      ['a', 'b', 'c'],
      ['1', '2', '3'],
      ['a', 'b', 'c']
    ]})
    useEffect(()=>{
        const singleProductView=async()=>{
            const parseProductId=await AsyncStorage.getItem("singleProductId")
            const productId=JSON.parse(parseProductId)
            const jwtToken=await AsyncStorage.getItem('jwtToken')
            const productDetails={productId,hello:"hello"}
            const apiUrl='http://192.168.1.26:9000/productDetailview'
            const options={
                method:'POST',
                headers:{
                    'Content-Type':'Application/json',
                    'Authorization':`Bearer ${jwtToken}`
                },
                body:JSON.stringify(productDetails)
            }
            const response=await fetch(apiUrl,options)
            const data=await response.json()
            setSingleProduct(data)
            console.log(data.thumbnail)
            const splitedImages=data.thumbnail.split(',')
            setProductImages(splitedImages)

           
        }
        singleProductView()
    },[])
      
    return(
        <SafeAreaView>
            <StatusBar backgroundColor='#fff'/>            
            <ScrollView style={{width:wp('99%'),height:hp('80%'),margin:0,padding:0}} showsVerticalScrollIndicator={false}>
          
                <View style={ deviceSize === 'large'?     {display:'flex',flexDirection:'row',}:{display:'flex',flexDirection:'column',}}>
                    
                    {productImages.length===0?
                     <Image source={{uri:`http://192.168.1.26:9000/feedUploads/1697444271494_interior-design-of-a-house-1571460.jpg`}} resizeMode='contain' style={ deviceSize === 'large'?styles.webProductImage:styles.productImage}  />
                    :<SwipeableViews>{productImages.map(eachProduct=>
                        <Image source={{uri:`http://192.168.1.26:9000/feedUploads/1697444271494_interior-design-of-a-house-1571460.jpg`}} resizeMode='contain' style={ deviceSize === 'large'?styles.webProductImage:styles.productImage}  />
                            )}</SwipeableViews>
                            }
                    
        
         <View>
         <View >
                    {/* <View style={ deviceSize === 'large'?  styles.largeDeviceCard:styles.smallDeviceCard}>
                        <View>
                    <Text style={styles.brandName}>{singleProduct.brandName}</Text>
                    <Text style={styles.byName}>By:{singleProduct.title}</Text>
                    <Text  style={styles.byName}>SUK:9000</Text>
                 </View>
                 <View>
                        <Text style={styles.saveIcon}><Feather name="bookmark" style={{fontSize:25}}/></Text>
                    </View>
                    </View>  */}
                    
                    {/* <View style={ deviceSize === 'large'?  styles.largeDeviceCard:styles.smallDeviceCard}>
                        <View>
                            <Text style={styles.brandName}>₹{singleProduct.price}</Text>
                        </View>
                        <View>
                        
                            <Text style={styles.brandName}>Quantity: </Text>
                            <TextInput
        style={{ height: 30,width:80, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8,borderRadius:3 }}
        placeholder="Qty..."
      />
                        </View>
                    </View> */}
                  <View style={ deviceSize === 'large'?  styles.largeDeviceDescription:styles.smallDeviceDescription}>
                  <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: 'gray'}}>
          <Row data={stateTableData.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={stateTableData.tableData} textStyle={styles.text}/>
        </Table>
       
        
      </View>
      <TouchableOpacity style={styles.statusButton}>
            <Text style={styles.statusText}>
                Status
            </Text>
        </TouchableOpacity>
                    {/* <Text style={styles.descriptionText}>Description : </Text>
                    <Text style={styles.description}>{singleProduct.description}</Text> */}

                  </View>
                  {/* <View style={ deviceSize === 'large'?  styles.largeDeviceDescription:styles.smallDeviceDescription}>
                    <Text style={styles.descriptionText}>Spacifications : </Text>
                    <Text style={styles.descriptionText}>Brand : <Text style={styles.description}>{singleProduct.brandName}</Text> </Text>
                    <Text style={styles.descriptionText}>Colour : <Text style={styles.description}>{singleProduct.color}</Text> </Text>
                    <Text style={styles.descriptionText}>MaterialType : <Text style={styles.description}>{singleProduct.name}</Text> </Text>
                    <Text style={styles.descriptionText}>Usage : <Text style={styles.description}>{singleProduct.usages}</Text> </Text>
                    <Text style={styles.descriptionText}>Estimate Delivery : <Text style={styles.description}>{singleProduct.estimateDelivery}</Text> </Text>

                    <Text style={styles.descriptionText}>Product Size : <Text style={styles.description}>{singleProduct.productSize}</Text> </Text>

                    <Text style={styles.descriptionText}>Quantity : <Text style={styles.description}>{singleProduct.quantity}</Text> </Text>  
                   
                    <Text style={styles.descriptionText}>Shipping Charges : <Text style={styles.description}>{singleProduct.shippingCharges}</Text> </Text>
                    <Text style={styles.descriptionText}>Tax : <Text style={styles.description}>{singleProduct.tax}</Text> </Text>
                  </View> */}
                  {/* <View style={ deviceSize === 'large'?  styles.largeDeviceCard:styles.smallDeviceCard}>
                    <TouchableOpacity style={styles.touchableButton}>
                    <Text style={styles.favoriteText}><AntDesign name="hearto" style={{fontSize:15}} />  Add to Favorite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableButton}>
                    <Text style={styles.favoriteText}><Ionicons name="add-circle-outline" style={{fontSize:15}} />  Add to Project</Text>
                    </TouchableOpacity>
                   
                   
                  </View> */}
                    </View>
         </View>
         </View>
  
      






                
              {/* <Row>
                <Col md={6}>
               <Image source={{uri:"http://192.168.1.26:9000/feedUploads/1691661773771_31 - Copy.jpg"}} resizeMode='contain' style={[styles.productImage,Platform.OS==='web' && styles.webProductImage]} />
                </Col>
                <Col md={6} style={{backgroundColor:'red'}}>
                    <View style={{width:wp('90%'),display:'flex',flexDirection:'row',justifyContent:'space-between',marginLeft:20,}}>
                    <View>
                    <Text style={styles.brandName}>Brand Name</Text>
                    <Text style={styles.byName}>By:Name</Text>
                    <Text  style={styles.byName}>SUK:9000</Text>
                    </View> 
                    <View>
                        <Text style={styles.saveIcon}><Feather name="bookmark" style={{fontSize:25}}/></Text>
                    </View>
                    </View>
                </Col>
              </Row> */}
            </ScrollView>
        </SafeAreaView>
    )
}
export default SpaceDetails
const styles=StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { backgroundColor: '#f1f8ff'  },
    text: { margin: 6 },
    favoriteText:{
        fontFamily:'roboto',
        fontSize:15,
        fontWeight:'normal',
        color:'#fff'
    },
    touchableButton:{
        marginTop:15,
        height:30,
        width:180,
        backgroundColor:'#c99780',
        borderRadius:3,
        color:"#fff",
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        color:"#fff"
    },
    description:{
        fontFamily:'ROBOTO',
        fontSize:15,
        fontWeight:'normal',
        marginTop:10
    },
    descriptionText:{
        fontFamily:'ROBOTO',
        fontSize:15,
        fontWeight:'bold',
        marginTop:10
    },
    largeDeviceCard:{
        width:wp('60%'),display:'flex',flexDirection:'row',justifyContent:'space-around',marginTop:20 ,
    },
    largeDeviceDescription:{
        width:wp('60%'),marginTop:20 ,
    },
    smallDeviceDescription:{
        width:wp('90%'),marginTop:20 ,
        marginLeft:10
    },
    smallDeviceCard:{
        width:wp('90%'),display:'flex',flexDirection:'row',justifyContent:'space-between',marginLeft:20,
    },
    productImage:{
        width:wp('100%'),
        height:hp('40%')
    },
    webProductImage:{
        width:'46vw',
        height:'80vh'
    },
    brandName:{
        fontSize:15,
        fontWeight:'bold',
        fontFamily:'roboto',
        marginBottom:4
    },
    byName:{
        fontSize:15,
        fontWeight:'normal',
        fontFamily:'roboto',
        marginBottom:4
    },
    saveIcon:{
        // textAlign:'left'
        
    },
    statusButton:{width:'80%',height:40,backgroundColor:'#c99780',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',marginLeft:'10%'},
    statusText:{
        color:'#fff',
        fontSize:14,
        fontWeight:'normal'
    }
})