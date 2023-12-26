import { TouchableOpacity,Text } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const StoreProjects=(props)=>{
    const {projectDetails,handleSelectedProject}=props
    const {title,projectId}=projectDetails
    const handleProjectName=async()=>{
        handleSelectedProject(title)
        console.log(projectId,"projectId projectId")
       await AsyncStorage.setItem('selectedProjectId',projectId)
    }
    return(
    <TouchableOpacity style={{height:40,width:'100%',marginBottom:10,alignContent:'center'}} onPress={handleProjectName}>
        <Text style={{fontSize:14,fontWeight:'bold'}}>{title}</Text>
    </TouchableOpacity>
    )
}
export default StoreProjects