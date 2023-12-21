import { SafeAreaView,View,Text ,Image,StatusBar,StyleSheet,TouchableOpacity,Button} from "react-native"
import {Row,Col} from 'react-native-responsive-grid-system'
import AsyncStorage from "@react-native-async-storage/async-storage"

const ProductList=(props)=>{
    const {products,  onClick}=props
    const {title,brandName,thumbnail,productId}=products
    const splitedImages=thumbnail.split(',')[0]
    const hiii=async()=>{
        onClick(productId)
        await AsyncStorage.setItem('singleProductId',productId.toString())
    }
    return(
      
             <Col   md={6} lg={4}>
    <TouchableOpacity  style={{color:"#fff"}} onPress={hiii}>
  <View style={styles.productCard}>
    <Image source={{ uri: `http://192.168.1.44:9000/${splitedImages}` }} style={{ width: '100%', height: 200, borderRadius: 8 }} />
    <Text style={styles.brandText}>{title}</Text>
    <Text  style={styles.brandText}>{brandName}</Text>
  </View>
  </TouchableOpacity>
</Col>
      
    )
}
export default ProductList

const styles=StyleSheet.create({
    productCard:{
        width: '96%', height: 260, borderRadius: 8,backgroundColor:'#fff' ,marginBottom:10
    },
    brandText:{
     
        fontSize:16,
        marginLeft:6

    }
})