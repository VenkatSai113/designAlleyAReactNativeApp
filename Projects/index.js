import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Topbar from '../Home/topbar'
import { View,Text,StyleSheet,TouchableOpacity,Dimensions,Image,ScrollView,SafeAreaView,Button,TextInput} from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Modal from "react-native-modal";
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

const Projects=({ navigation })=>{
    const [isModalVisible, setModalVisible] = useState(false);
    const screenWidth=Dimensions.get('window').width
    const [projectName,setProjectName]=useState("")
    
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
      const createProject=async()=>{
        const projectData={projectName,hello:"hello"}
        const jwtToken=await AsyncStorage.getItem('jwtToken')
       const apiUrl='http://192.168.1.44:9000/createProject'
       const options={
        method:'POST',
        headers:{
            'Content-Type':'Application/json',
            'Authorization':`Bearer ${jwtToken}`
        },
        body:JSON.stringify(projectData)
       }
       const response=await fetch(apiUrl,options)
       const data=await response.json()
       console.log(data)
      }
      const projectNameFun=(text)=>{
        setProjectName(text)
      }
      const showToast = () => {
        console.log("hEKKI")
        setTimeout(() => {
          Toast.show('This is a toast message', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }, 500); // Adjust the delay as needed
      };
      const helllo=()=>{
        navigation.push('UpcomingProjects', { screen: 'UpcomingProjects' });
      }
      const ongoingProjects=()=>{
        navigation.push('OngoingProjects', { screen: 'OngoingProjects' });
      }
    return(<SafeAreaView >
        <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        backdropOpacity={0.5}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.projectName}>Project Name</Text>
          <TextInput placeholder='   Enter Project Name' style={styles.projectNameInput} onChangeText={projectNameFun}/>
          <View style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
           <TouchableOpacity style={styles.okButton} onPress={createProject}>
            <Text>Ok</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
            <Text>Cancel</Text>
           </TouchableOpacity>

          </View>
          
        </View>
      </Modal>
           {screenWidth<786?<Topbar/>:null}
       <ScrollView>
    
        <View>
           
            
            <TouchableOpacity style={styles.createProjectsButtons}  onPress={toggleModal}>
                <Text style={styles.createProjectButtonText}><AntDesign name="plus" style={{fontSize:16}}  />  create Project</Text>
            </TouchableOpacity>
            <View style={ screenWidth<786?styles.projectsContainer:styles.smallScreenProjectsContainer}>
            <View style={screenWidth<786?styles.onGoingProjectsCard:styles.smallOnGoingProjectsCard}>
                <Image style={styles.onGoingProjectsImage} source={{uri:"https://media.designcafe.com/wp-content/uploads/2023/01/05102507/wfh-friendly-living-room-for-working-professionals.jpg"}} />
                <TouchableOpacity style={styles.projectsButton} onPress={ongoingProjects}>
                <Text style={styles.createProjectButtonText}>Ongoing Projects</Text>
            </TouchableOpacity>
            </View>
            <View style={screenWidth<786?styles.onGoingProjectsCard:styles.smallOnGoingProjectsCard}>
                <Image style={styles.onGoingProjectsImage} source={{uri:"http://cdn.home-designing.com/wp-content/uploads/2018/01/flying-pendant-lights-colourful-stools-kitsch-living-room.jpg"}} />
                <TouchableOpacity style={styles.projectsButton} onPress={helllo}>
                <Text style={styles.createProjectButtonText}>Upcoming Projects</Text>
            </TouchableOpacity>
            </View>
            <View style={screenWidth<786?styles.onGoingProjectsCard:styles.smallOnGoingProjectsCard}>
                <Image style={styles.onGoingProjectsImage} source={{uri:"http://cdn.home-designing.com/wp-content/uploads/2018/01/orange-cushions-grey-curtains-dark-living-room.jpg"}} />
                <TouchableOpacity style={styles.projectsButton}>
                <Text style={styles.createProjectButtonText}>Completed Projects</Text>
            </TouchableOpacity>
            </View>
            </View>
            </View>
       </ScrollView>
       </SafeAreaView>
    )
}
export default Projects
const { height, width } = Dimensions.get('window');
const modalWidth = width>786?0.5 * width:0.9 * width;
const styles=StyleSheet.create({
    
    okButton:{
        height:35,
        width:80,
        borderRadius:3,
        backgroundColor:'#c99780',
       display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
       
    },
    cancelButton:{
        height:35,
        width:80,
        borderRadius:3,
        backgroundColor:'#d9d9d9',
       display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
       
    },
    projectNameInput:{
        width:'80%',
        borderWidth:1,
        borderColor:'black',
        marginTop:5,
       
        borderRadius:3,
        height:35
    },
    projectName:{
        fontSize:14,
        fontWeight:'bold'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      openButton: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
      },
      modal: {
        margin: 0,
        justifyContent: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 3,
        width: modalWidth,
        alignSelf: 'center',
        alignItems: 'center',
      },
      closeButton: {
        color: 'red',
        marginTop: 10,
      },
    projectsButton:{
        width:'100%',
        height:'20%',
        borderRadius:5,
        backgroundColor:'#cec2ab',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
       
    },
    onGoingProjectsCard:{
        width:'90%',
        height:230,
        borderRadius:5,
        marginTop:10,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
        
    },
    smallOnGoingProjectsCard:{
        width:'30%',
        height:230,
        borderRadius:5,
        marginTop:10,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
        
    },
    onGoingProjectsImage:{
        height:'80%',
        width:'100%',
        borderTopLeftRadius:3,
        borderTopRightRadius:3
    },
    hideBigScreens:{
        display:'none'
    },
    projectsContainer:{
        height:hp('100%'),
        width:wp('100%'),
         padding:5,
         display:'flex',
         flexDirection:'column',
        alignItems:"center"
    },
    smallScreenProjectsContainer:{
        height:hp('100%'),
        width:wp('90%'),
         padding:5,
         display:'flex',
         flexDirection:'row',
         justifyContent:'space-around'
           
    },
    createProjectsButtons:{
        width:'90%',
        height:40,
        borderRadius:3,
        backgroundColor:'#d9d9d9',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginLeft:'auto',
        marginRight:'auto'
        },
    createProjectButtonText:{
        color:'#000000',
        textAlign:'center',
        fontSize:16,
        fontWeight:'bold'
    }
        
})