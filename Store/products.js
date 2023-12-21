import { SafeAreaView,View,Text ,Image,StatusBar,StyleSheet,TouchableOpacity,Button,ScrollView} from "react-native"
import {Row,Col} from 'react-native-responsive-grid-system'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import  ProductDetailView from './productDetailView'
import Projects from '../Projects/index'
import {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductList from './productList'

const StoreProducts=()=>{
    const navigation = useNavigation();
    const [statestoreProducts,setStoreProducts]=useState([])
    const handlePress=()=>{
        navigation.navigate('ProductDetailView');
    }
    useEffect(()=>{
      const storeItems=async()=>{
        const jwtToken=await AsyncStorage.getItem('jwtToken')
        const storeApi='http://192.168.1.44:9000/exploreStoreProducts'
        const options={
          headers:{
            'Content-Type':'Application/json',
            'Authorization':`Bearer ${jwtToken}`
          },
          method:'GET'
        }
        const response=await fetch(storeApi,options)
        const data=await response.json()
        console.log(data,";ouityuiyuiyfiuyuiy")
        if(response.ok==true){
          setStoreProducts(data)
        }
      }
      storeItems()
    },[])
    const handleChildClick=(childMessage)=>{
      navigation.push('ProductDetailView', { screen: 'ProductDetailView' });
    }
    return(
        <ScrollView style={{width:wp('96%'),height:hp('70%'),marginLeft:'auto',marginRight:'auto'}} showsVerticalScrollIndicator={false} >  
            <StatusBar backgroundColor={'#fff'}/>
            <Row>
              {statestoreProducts.map(eachItem=>
              <ProductList products={eachItem} key={eachItem.productId} onClick={handleChildClick}/>
                )}
            
     
      
            </Row>
        </ScrollView>
    )
}
export default StoreProducts

const styles=StyleSheet.create({
    productCard:{
        width: '96%', height: 260, borderRadius: 8,backgroundColor:'#fff' ,marginBottom:10
    },
    brandText:{
     
        fontSize:16,
        marginLeft:6

    }
})