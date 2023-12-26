import { View,Text,Image,StyleSheet } from "react-native"

const LikedPosts=()=>{
    return(
        <View>
            <Text>Heloo</Text>
            <Image source={{uri:'https://getwallpapers.com/wallpaper/full/7/c/7/624165.jpg'}} style={styles.postImages}/>
            
        </View>
    )
}
export default LikedPosts
const styles=StyleSheet.create({
    postImages:{
        height:100,
        width:100
        
    }
})