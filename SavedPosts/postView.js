import {TouchableOpacity,Image,StyleSheet} from "react-native"
import { useNavigation} from "@react-navigation/native"

const SavedPostList=(props)=>{
    const {savedPosts}=props
    const {thumbnail,postId}=savedPosts
    const navigation = useNavigation();
    const previewSavedPosts=()=>{
        navigation.navigate('savedpostHome', { savedPostId:postId  })
    }
    return(
        <TouchableOpacity onPress={previewSavedPosts}>
            <Image source={{uri:`http://192.168.1.44:9000/${thumbnail}`}} style={styles.savedImages}/> 
        </TouchableOpacity>

    )
}
export default SavedPostList

const styles=StyleSheet.create({
    savedImages:{
        height:150,
        width:150,
        margin:6,
        borderRadius:3
    }
})