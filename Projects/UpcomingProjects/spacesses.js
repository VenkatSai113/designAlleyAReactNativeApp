import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {View,Text,StatusBar,SafeAreaView, ScrollView,StyleSheet,Image,TouchableOpacity,TextInput,Dimensions,Alert} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Modal from "react-native-modal";
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';
import axios from 'axios';
import UpcomingSpaceCard from './spaceCards'


const UpcomingSpacesses=()=>{
 
    const [isModalVisible, setModalVisible] = useState(false);
    const [galleryPhoto,setGalleryPhoto]=useState('')
    const [spaceImage,setSpaceImage]=useState('')
    const [spacename,setSpaceName]=useState('')
    const [projectId,setProjectId]=useState('')
   const [spaceDetails,setSpaceDetails]=useState([])
   const deviceSize= Dimensions.get('window').width
    const screenWidth=Dimensions.get('window').width
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
      useEffect(()=>{
        const getProjectId=async()=>{
        const projectId=await AsyncStorage.getItem("projectId")
        const jwtToken=await AsyncStorage.getItem('jwtToken')
        console.log(projectId)
        setProjectId(projectId)
        const spaceDetails={projectId,hello:"hello"}
        const apiUrl="http://192.168.1.44:9000/spaceCards";
        const options={
          method:'POST',
          headers:{
            'Content-Type':'Application/json',
            'Authorization':`Bearer ${jwtToken}`
          },
          body:JSON.stringify(spaceDetails)
        }
        const response=await fetch(apiUrl,options)
        const data=await response.json()
        console.log(data,'data')
        setSpaceDetails(data)

        }
        getProjectId()
      },[])
      const projectNameFun=(text)=>{
        setSpaceName(text)
      }
      
      let options={
        saveToPhotos:true,
        mediaType:'photo'
    }
    //   const openGallery=async()=>{
    //     const result=await launchImageLibrary(options)
    //     setGalleryPhoto(result.assets[0].uri)
    //   }
      const openGallery = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          setGalleryPhoto(result.assets[0].uri)

          console.log(result.assets[0].uri)
          const spaceImage1={
            uri: result.assets[0].uri,
            type: result.assets[0].fileType, // Adjust the type based on your requirements
            name: result.assets[0].fileName,
          }
          setSpaceImage(spaceImage1)

    
          if (!result.cancelled) {
            // setSelectedImage(result);
            console.log(result)
          }
        } catch (err) {
          console.error('Error picking an image', err);
        }
      };
      const uploadImage = async () => {

        try {
          console.log(spaceImage,"ghdrtrktjeiprkteprjytinbmdfnpoier ijgerijt")
          const formData = new FormData();
          formData.append('spaceImage', JSON.stringify(spaceImage));
          formData.append('spacename', spacename);
          formData.append('projectId', projectId);
      
          // Log the formData to check its content
          for (let pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
          }
      
          const response = await axios.post('http://192.168.1.44:9000/createSpaces', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          console.log('Upload successful:', response.data);
          // Handle success, e.g., show a success message
          Alert.alert('Success', 'Image uploaded successfully');
        } catch (error) {
          console.error('Error uploading file:', error);
          // Handle error, e.g., show an error message
          Alert.alert('Error', 'Failed to upload image. Please try again.');
        }
      };
      const handleSaveProfile = async () => {
        try {
            console.log(selectedImageId)
            var formData = new FormData();
          formData.append('spacename', spacename);
          formData.append('projectId', projectId);
            if (selectedImageId) {
                let imageData = {
                    uri:
                        Platform.OS === 'android'
                            ? selectedImageId.uri
                            : selectedImageId.uri.replace('file://', ''),
                    type: selectedImageId.type,
                    name: selectedImageId.fileName,
                };
                formData.append('image', imageData);
            } else {
                // Use the existing avatarSource if the user didn't change the image
                formData.append('image', avatarSource);
            }

            const response = await UpdateUserProfileApiCall(formData);

            console.log("response UpdateUserProfileApiCall", response)
            if (response.success) {
                navigation.navigate('MainHome');
            } else {
                Alert.alert('Error', 'Failed to save profile changes');
            }
        } catch (error) {
            console.error(error);
        }
    };
      
      
    return(
        <SafeAreaView>
            <StatusBar backgroundColor='#fff'/>
            <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        backdropOpacity={0.5}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.projectName}>Create Space</Text>
          <Image source={{uri:galleryPhoto}} style={{height:100,width:100,borderRadius:3}}/>
          <TextInput placeholder='   Enter Space Name' style={styles.projectNameInput} onChangeText={projectNameFun}/>
          <TouchableOpacity style={styles.imagePickerButton} onPress={openGallery}>
            <Text style={{color:'#fff'}}>Upload Space Image</Text>
          </TouchableOpacity>
         
          <View style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
           <TouchableOpacity style={styles.okButton} onPress={uploadImage}>
            <Text>Ok</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
            <Text>Cancel</Text>
           </TouchableOpacity>

          </View>
          
        </View>
      </Modal>
            <ScrollView>
                <View>
                <View style={styles.spaceRowView}>
                    <Text style={styles.spaceText}>Space</Text>
                    <TouchableOpacity style={styles.createSpaceButton}  onPress={toggleModal}>
                        <Text style={styles.createSpaceText}> <Entypo name="circle-with-plus" style={{color:"#cfc3ad",fontSize:14}} />   Create Space</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabView}>
                    <TouchableOpacity>
                <Image source={require('../../assets/design.png')}  style={styles.tabIcons} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity>
                <Image source={require('../../assets/estimate.png')}  style={styles.tabIcons} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity>
                <Image source={require('../../assets/payments.png')}  style={styles.tabIcons} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity>
                <Image source={require('../../assets/tracking.png')}  style={styles.tabIcons} resizeMode='contain'/>
                </TouchableOpacity>
                </View>
                <View style={{width:wp('100%'),display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
                {spaceDetails.map(eachItem=>
                  <UpcomingSpaceCard spaceDetails={eachItem} key={eachItem.spaceId}/>)}
                  </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default UpcomingSpacesses
const { height, width } = Dimensions.get('window');
const modalWidth = width>786?0.5 * width:0.9 * width;
const styles=StyleSheet.create({
    
    spaceText:{
        fontSize:14,
        fontWeight:'bold',
    },
    tabView:{
        width:wp('100%'),
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    tabIcons:{
        height:70,
        width:70, 
    },
    spaceRowView:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:wp('95%'),
        padding:10
    },
    createSpaceButton:{
        width:160,
        height:35,
        borderRadius:3,
        borderWidth:1,
        borderColor:'#cfc3ad',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    createSpaceText:{
        fontSize:14
    },
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
        backgroundColor:'whiteSmoke',
        borderRadius:3,
        height:35
    },
    imagePickerButton:{
        width:'80%',
       display:'flex',
       flexDirection:'row',
       justifyContent:'center',
       alignItems:'center',
        marginTop:15,
        backgroundColor:'#c99780',
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
      upcomingProjectsView:{
        width:wp('100%'),
        height:hp('90%'),
    },
    upcomingProjectText:{
        fontSize:14,
        fontWeight:'bold',
        textAlign:'center',
    },
    upcomingCard:{
        width:"90%",
        marginTop:10,
        borderRadius:3
    },
    largeDeviceUpcomingCard:{
        width:"30%",
        marginTop:10,
        borderRadius:3,
        borderWidth:1,
        borderColor:'#cfc3ad'
    },
    cardImage:{
        width:'100%',
        height:200,
        borderRadius:3,
        borderWidth:1,
        borderColor:'#cfc3ad'
    },
    projectName:{
        fontWeight:'bold',
        fontSize:14,
        margin:10

    }
})