import {View,Text,SafeAreaView,StatusBar,Image,StyleSheet,Platform,Dimensions,TouchableOpacity,TextInput,ScrollView,Alert} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views-native';
import Modal from 'react-native-modal';
import ProjectSpaces from './projectSpaces'

const getDeviceSize = () => {
    const screenWidth = Dimensions.get('window').width; 
    if (screenWidth >= 600) {
      return 'large';
    } else {
      return 'medium';
    }
  };
const ProductDetailView=()=>{
    const deviceSize = getDeviceSize();
    const [singleProduct,setSingleProduct]=useState('')
    const [productImages,setProductImages]=useState([])
    const [isModalVisible, setModalVisible] = useState(false);
    const [availableSpaces,setAvailableSpaces]=useState([])
    const [checked, setChecked] = useState(false);
    const [quentity,setProductQuentity]=useState('')


  const toggleCheckBox = () => {
    setChecked(!checked);
  }
    useEffect(()=>{
        const singleProductView=async()=>{
            const parseProductId=await AsyncStorage.getItem("singleProductId")
            console.log(parseProductId,'parsdfsdkfnlsdm')
            const productId=JSON.parse(parseProductId)
            const jwtToken=await AsyncStorage.getItem('jwtToken')
            const productDetails={productId,hello:"hello"}
            const apiUrl='http://192.168.1.36:9000/productDetailview'
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
            console.log(data,'productview')
            const splitedImages=data.thumbnail.split(',')
            setProductImages(splitedImages)
        }
        singleProductView()
        const projectSpaces=async()=>{
          const projectId= JSON.parse (await AsyncStorage.getItem('projectId1'))
          console.log(projectId,'projectId projectId')
          const jwtToken=await AsyncStorage.getItem('jwtToken')          
          const spaceDetails={projectId,hello:"hello"}
          const apiUrl='http://192.168.1.36:9000/spaceCards'
          const options={
              method:'POST',
              headers:{
                  'Content-Type':'Application/json',
                  'Authorization':`Beare ${jwtToken}`
              },
              body:JSON.stringify(spaceDetails)
          }
          const response=await fetch(apiUrl,options)
          const data=await response.json()
          setAvailableSpaces(data)
          console.log(data)
          
      }
      projectSpaces()
       
    },[])
  
    const toggleModal=()=>{
     

        console.log("Hello")
        setModalVisible(!isModalVisible);
    }
    const handleSpaceProducts=async()=>{
      const jwtToken=await AsyncStorage.getItem('jwtToken')
      const {productId,productType,productSize,}=singleProduct
      const parseSpacesId=await AsyncStorage.getItem('spaceIdArray')
      const spacesIds =JSON.parse(parseSpacesId)
      const spacesId=spacesIds.join(',')  
      console.log(spacesId,'spacesId ')
      const spaceProducts={productId,productType,productSize,spacesId,quentity}
      const apiUrl='http://192.168.1.36:9000/projectSpaceProducts'
      const options={
        method:'post',
        headers:{
          'Content-Type':'Application/json',
          'Authorization':`Bearer ${jwtToken}` 
        },
        body:JSON.stringify(spaceProducts)
      }
      const response=await fetch(apiUrl,options)
      const data=await response.json()
      console.log(data,'dataaaa')
      if(response.ok===true){
        setModalVisible(!isModalVisible);
        Alert.alert("Product Added successfully")
      }
      

    
    }
    const handleQuentity=(text)=>{
      console.log(text)
      setProductQuentity(text)
    }
    return(
        <SafeAreaView>
            <StatusBar backgroundColor='#fff'/>            
            <ScrollView style={{width:wp('99%'),height:hp('80%'),margin:0,padding:0}} showsVerticalScrollIndicator={false}>
          
                <View style={ deviceSize === 'large'?     {display:'flex',flexDirection:'row',}:{display:'flex',flexDirection:'column',}}>
                    {productImages.length===1?
                     <Image source={{uri:`http://192.168.1.36:9000/${productImages[0]}`}} resizeMode='contain' style={ deviceSize === 'large'?styles.webProductImage:styles.productImage}  />
                    :<SwipeableViews>{productImages.map(eachProduct=>
                        <Image source={{uri:`http://192.168.1.36:9000/${eachProduct}`}} resizeMode='contain' style={ deviceSize === 'large'?styles.webProductImage:styles.productImage}  />
                            )}</SwipeableViews>}        
         <View>
         <View >
                    <View style={ deviceSize === 'large'?  styles.largeDeviceCard:styles.smallDeviceCard}>
                        <View>
                    <Text style={styles.brandName}>{singleProduct.brandName}</Text>
                    <Text style={styles.byName}>By:{singleProduct.title}</Text>
                    <Text  style={styles.byName}>SUK:9000</Text>
                 </View>
                 <View>
                        <Text style={styles.saveIcon}><Feather name="bookmark" style={{fontSize:25}}/></Text>
                    </View>
                    </View> 
                    <View style={ deviceSize === 'large'?  styles.largeDeviceCard:styles.smallDeviceCard}>
                        <View>
                            <Text style={styles.brandName}>₹{singleProduct.price}</Text>
                        </View>
                        <View>
                            <Text style={styles.brandName}>Quantity: </Text>
                            <TextInput style={{ height: 30,width:80, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8,borderRadius:3 }} placeholder="Qty..."/>
                        </View>
                    </View>
                  <View style={ deviceSize === 'large'?  styles.largeDeviceDescription:styles.smallDeviceDescription}>
                    <Text style={styles.descriptionText}>Description : </Text>
                    <Text style={styles.description}>{singleProduct.description}</Text>
                  </View>
                  <View style={ deviceSize === 'large'?  styles.largeDeviceDescription:styles.smallDeviceDescription}>
                    <Text style={styles.descriptionText}>Spacifications : </Text>
                    <Text style={styles.descriptionText}>Brand : <Text style={styles.description}>{singleProduct.brandName}</Text> </Text>
                    <Text style={styles.descriptionText}>Colour : <Text style={styles.description}>{singleProduct.color}</Text> </Text>
                    <Text style={styles.descriptionText}>Material Type : <Text style={styles.description}>{singleProduct.name}</Text> </Text>
                    <Text style={styles.descriptionText}>Usage : <Text style={styles.description}>{singleProduct.usages}</Text> </Text>
                    <Text style={styles.descriptionText}>Estimate Delivery : <Text style={styles.description}>{singleProduct.estimateDelivery}</Text> </Text>
                    <Text style={styles.descriptionText}>Product Size : <Text style={styles.description}>{singleProduct.productSize}</Text> </Text>
                    <Text style={styles.descriptionText}>Quantity : <Text style={styles.description}>{singleProduct.quantity}</Text> </Text>  
                    <Text style={styles.descriptionText}>Shipping Charges : <Text style={styles.description}>{singleProduct.shippingCharges}</Text> </Text>
                    <Text style={styles.descriptionText}>Tax : <Text style={styles.description}>{singleProduct.tax}</Text> </Text>
                  </View>
                  <View style={ deviceSize === 'large'?  styles.largeDeviceCard:styles.smallDeviceCard}>
                    <TouchableOpacity style={styles.touchableButton}>
                    <Text style={styles.favoriteText}><AntDesign name="hearto" style={{fontSize:15}} />  Add to Favorite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableButton} onPress={toggleModal}>
                    <Text style={styles.favoriteText}><Ionicons name="add-circle-outline" style={{fontSize:15}} />  Add to Spaces</Text>
                    </TouchableOpacity>
                  </View>
                    </View>
         </View>
         </View>
              {/* <Row>
                <Col md={6}>
               <Image source={{uri:"http://192.168.1.36:9000/feedUploads/1691661773771_31 - Copy.jpg"}} resizeMode='contain' style={[styles.productImage,Platform.OS==='web' && styles.webProductImage]} />
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
            <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}>
        <View style={styles.modalContent}>
            <View style={styles.popupModelView}>
            <TouchableOpacity onPress={toggleModal}>
            <AntDesign name="closecircle" style={styles.closeIcon}/>
          </TouchableOpacity>
          <Text style={{textAlign:'center',fontSize:14,fontWeight:'bold'}}>Select Spaces</Text>
         <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
         <Text style={styles.brandName}>Quantity: </Text>
                            <TextInput onChangeText={handleQuentity}  keyboardType="numeric" style={{ height: 30,width:80, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8,borderRadius:3 }} placeholder="Qty..."/>
         </View>
          
          <ScrollView  style={{height:hp('50%')}}>
               <View style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
                {/* {storeProjects.map(eachProject=>
                <StoreProjects projectDetails={eachProject} key={eachProject.projectId} handleSelectedProject={handleSelectedProject}/>
                  )} */}
                  {availableSpaces.map(eachProject=>
                   <View>
                    <ProjectSpaces spaceNames={eachProject} key={eachProject.spaceId} singleProductData={singleProduct}/>
                 </View>)}
                 {/* <View><Text>Hello</Text></View> */}
                 
               </View>
              
               </ScrollView>
               <TouchableOpacity onPress={handleSpaceProducts} style={styles.submitButton}>
                  <Text style={styles.submitText}>Submit</Text>
                 </TouchableOpacity>
            </View>
        </View>
      </Modal>
        </SafeAreaView>
    )
}
export default ProductDetailView
const styles=StyleSheet.create({
  submitButton:{
    height:30,
    width:100,
    backgroundColor:'#c99780',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:3,
  },
  submitText:{
    fontSize:14,
    color:'#fff'
  },
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
        width:'40vw',
        height:'40vh'
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modal: {
        margin: 0,
        justifyContent: 'flex-end',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
    homeContainer:{
        display:'flex',
        flexDirection:'row',
    },logoImage:{
        width:150,
        height:60,
        resizeMode:"contain",
    },closeIcon:{
      fontSize:25,
      color:'#ca9881',
      marginLeft:'auto'
  },
  rightView:{
    height:12,
    width:200,
    
  },
  popupModelView:{
    display:'flex',
    flexDirection:'column',
    
},
})