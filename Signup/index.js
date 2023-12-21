import React ,{useState} from 'react';
import {View,Text,SafeAreaView,StyleSheet,Dimensions,Image,ScrollView,TouchableOpacity,Button,Platform,StatusBar,TextInput } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo'
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const Signup = () => {
  const screenSize = Dimensions.get('window').width;
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedValue, setSelectedValue] = useState('option1');
  const [checked, setChecked] = useState('first');
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
 
    name: '',
    address: '',
    email: '',
    area: '',
    budget: '',
    bankName: '',
    accountNumber: '',
    branch: '',
    ifscCode: '',
    PhoneNumber: '',
    gstNumber:"",
    // logoFile: '',
  });
  const onchangeName=(text)=>{
    setName(text)
   
  }

  const onChangeField = (fieldName, text) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: text,
     
    }));
    console.log(text)
  };

  const handleButtonPress = () => {
    // Do something with formData, for example, log it
    console.log(formData);
  };
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      setSelectedFile(result.assets[0]); 
      console.log(result.assets[0])

      if (!result.cancelled) {
        setSelectedImage(result);
      }
    } catch (err) {
      console.error('Error picking an image', err);
    }
  };
    const handleApiCall = async () => {
      const { ...otherData } = formData;
      if (selectedFile) {
        const formDataToSend = new FormData();
        console.log(selectedFile,'selectedFile')
        formDataToSend.append('logoFile', {
          uri: selectedFile.uri,
          type: 'image/jpg',
          name: 'file.jpg',
        });
        console.log(selectedFile.type)
        // Add additional data from otherData
        Object.keys(otherData).forEach((key) => {
          formDataToSend.append(key, otherData[key]);
        });
    
        try {
          const response = await axios.post('http://192.168.1.44:9000/designer/signup/', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          // Handle the server response here
          console.log('API call response:', response.data);
        } catch (error) {
          // Handle errors
          console.error('Error making API call:', error);
        }
      } else {
        console.log('No image selected');
      }
    };





    // if (selectedImage) {
    //   const formData = new FormData();

    //   formData.append('logoFile', {
    //     uri: selectedImage.uri,
    //     type: 'image/jpeg', // Adjust the type according to your file type
    //     name: 'image.jpg',
    //   });
    //   formData.append('name', name);
    //   formData.append('address', address);
    //   formData.append('email', email);
    //   formData.append('area', area);
    //   formData.append('budget', budget);
    //   formData.append('bankName', bankName);
    //   formData.append('accountNumber', accountNumber);
    //   formData.append('ifscCode', ifscCode);
    //   formData.append('PhoneNumber', PhoneNumber);
    //   formData.append('gstNumber', gstNumber);



    //   try {
    //     const response = await axios.post('http://192.168.1.44:9000/designer/signup/', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });

    //     // Handle the server response here
    //     console.log('API call response:', response.data);
    //   } catch (error) {
    //     // Handle errors
    //     console.error('Error making API call:', error);
    //   }
    // } else {
    //   console.log('No image selected');
    // }
 
  const uploadImage = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('logoFile', {
        uri: selectedImage.uri,
        type: 'image/jpeg', // Adjust the type according to your file type
        name: 'image.jpg',
      });

      try {
        const response = await axios.post('YOUR_UPLOAD_ENDPOINT', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle the server response here
        console.log('File upload response:', response.data);
      } catch (error) {
        // Handle errors
        console.error('Error uploading file:', error);
      }
    } else {
      console.log('No image selected');
    }
  };
  const signupApiCall=()=>{
    console.log(formData)
  }
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={'#fff'}/>
      <View style={styles.logoView}>
        <Image source={require('../assets/logo.jpeg')} style={{width:160,resizeMode:'contain',height:100}}/>
      </View>
      <View style={styles.bodySignupView}>
     <View style={screenSize>786?styles.largeScreenContainer:styles.mobileSignupContainer}>
     <TouchableOpacity onPress={pickImage} style={styles.pickButton}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
        </View>
      )}
      <TouchableOpacity onPress={uploadImage} style={styles.uploadButton}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
     <Text style={styles.registerText}>Register with Design Alley</Text>
     <View style={{width:'100%',marginBottom:30,height: 40,
    borderBottomColor: 'gray', 
    borderBottomWidth: 1,
    paddingLeft: 10,}}>
      <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
        <View style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around',}}>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
          <RadioButton value="first" />
            <Text style={styles.organization}>Organization</Text>
        </View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
          <RadioButton value="second" /> 
          <Text  style={styles.organization}>Individual Designer</Text>
        </View>
        </View>
        {/* Add more RadioButton components for additional options */}
      </RadioButton.Group>
    </View>
    <View style={{width:'100%'}}>
        <Text  style={styles.atachLogoText}>Name</Text>
        <TextInput  placeholder='  Enter Name'  value={formData.name}
              onChangeText={(text) => onChangeField('name', text)}  style={{fontFamily:'roboto',fontSize:14,width:'95%',marginTop:5,height:35,borderRadius:3,backgroundColor:'#ececec',border:'none'}}/>
       </View>
       <View style={{width:'100%'}}>
        <Text  style={styles.atachLogoText}>address</Text>
        <TextInput
       style={{fontFamily:'roboto',fontSize:14,width:'95%',marginTop:5,borderRadius:3,backgroundColor:'#ececec',border:'none'}}
        multiline={true}
        value={formData.address}
              onChangeText={(text) => onChangeField('address', text)}
        numberOfLines={4} // Set the number of lines you want to display initially
        placeholder="  Enter address..."/>
       </View>
       <View style={{width:'100%'}}>
        <Text  style={styles.atachLogoText}>Email</Text>
        <TextInput
        style={{fontFamily:'roboto',fontSize:14,width:'95%',marginTop:5,height:35,borderRadius:3,backgroundColor:'#ececec',border:'none'}}
        keyboardType="email-address" // Use the email-address keyboard type
        autoCapitalize="none" // Disable auto-capitalization for email
        numberOfLines={4} // Set the number of lines you want to display initially
        value={formData.email}
              onChangeText={(text) => onChangeField('email', text)}
        placeholder="  Enter your email"
      />
       <View style={{width:'100%'}}>
        <Text  style={styles.atachLogoText}>Phone Number</Text>
      <TextInput keyboardType='numeric' placeholder='  Enter Phone Number' value={formData.PhoneNumber}
              onChangeText={(text) => onChangeField('PhoneNumber', text)} style={{fontFamily:'roboto',fontSize:14,width:'95%',marginTop:5,height:35,borderRadius:3,backgroundColor:'#ececec',border:'none'}}/>
</View>
        
       </View>
       <View style={{width:'100%'}}>
        <Text  style={styles.atachLogoText}>Area/City</Text>
        <TextInput  placeholder='  Enter Area/City'  value={formData.area}
              onChangeText={(text) => onChangeField('area', text)}   style={{fontFamily:'roboto',fontSize:14,width:'95%',marginTop:5,height:35,borderRadius:3,backgroundColor:'#ececec',border:'none'}}/>
       </View>
      <View style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-evenly',marginTop:15}}>
     
        <Text style={styles.atachLogoText}>Attach Logo</Text>
        <TouchableOpacity style={styles.UploadImageButton}>
          <Text style={styles.UploadImageButtonText}> <Entypo name="attachment" style={{fontSize:15}}/>   Upload logo Image</Text>
        </TouchableOpacity>
        
      </View>
      <View style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
      {/* <View style={styles.budgetView}>
      <Picker
       style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Option 1" value="option1" />
        <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" />
      </Picker>
      <Picker
       style={styles.picker}
        selectedValue={selectedValue}
      
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      > 
        <Picker.Item label="Option 1" value="option1" />
        <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" />
      </Picker>
    </View> */}
     <View style={{width:'100%'}}>
        <Text  style={styles.atachLogoText}>Budget</Text>
        <TextInput  placeholder='  Enter Budget' keyboardType='numeric' value={formData.budget}
              onChangeText={(text) => onChangeField('budget', text)} style={{fontFamily:'roboto',fontSize:14,width:'95%',marginTop:5,height:35,borderRadius:3,backgroundColor:'#ececec',border:'none'}}/>
       </View>
      </View>
      
      {/* <Picker
       style={{width:'95%',marginTop:5,height:40,borderRadius:3,backgroundColor:'#ececec',border:'none'}}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Option 1" value="option1" />
        <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" />
      </Picker> */}
      <View style={{width:'100%'}}>
        <Text  style={styles.atachLogoText}>Bank Name</Text>
        <TextInput  placeholder='  Enter Bank Name' value={formData.bankName}
              onChangeText={(text) => onChangeField('bankName', text)} style={{fontFamily:'roboto',fontSize:14,width:'95%',marginTop:5,height:35,borderRadius:3,backgroundColor:'#ececec',border:'none'}}/>
       </View>
       <View style={{width:'100%'}}>
        <Text  style={styles.atachLogoText}>Branch</Text>
        <TextInput  placeholder='  Enter Branch' value={formData.branch}
              onChangeText={(text) => onChangeField('branch', text)} style={{fontFamily:'roboto',fontSize:14,width:'95%',marginTop:5,height:35,borderRadius:3,backgroundColor:'#ececec',border:'none'}}/>
       </View>
       <View style={{width:'100%'}}>
        <Text  style={styles.atachLogoText}>Account Number</Text>
      <TextInput keyboardType='numeric' placeholder='  Enter Account Number' value={formData.accountNumber}
              onChangeText={(text) => onChangeField('accountNumber', text)} style={{fontFamily:'roboto',fontSize:14,width:'95%',marginTop:5,height:35,borderRadius:3,backgroundColor:'#ececec',border:'none'}}/>
      </View>
      <View style={{width:'100%'}}>
        <Text  style={styles.atachLogoText}>Re-Account Number</Text>
      <TextInput keyboardType='numeric' placeholder='  Re-Enter Account Number' value={formData.accountNumber}
              onChangeText={(text) => onChangeField('accountNumber', text)}  style={{fontFamily:'roboto',fontSize:14,width:'95%',marginTop:5,height:35,borderRadius:3,backgroundColor:'#ececec',border:'none'}}/>
      </View>
      <View style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-evenly',marginTop:10}}>
      <Text style={styles.ifscCodeText}>IFSC code</Text>
      <TextInput keyboardType='numeric' placeholder='  Enter IFSC code' value={formData.ifscCode}
              onChangeText={(text) => onChangeField('ifscCode', text)} style={{fontFamily:'roboto',fontSize:14,width:'45%',marginTop:5,height:35,borderRadius:3,backgroundColor:'#ececec',border:'none'}} />
      </View>
      <View style={{width:'100%'}}>
        <Text  style={styles.atachLogoText}>GST Number</Text>
      <TextInput keyboardType='numeric' placeholder='  GST(IF Applicable)'  value={formData.gstNumber}
              onChangeText={(text) => onChangeField('gstNumber', text)}  style={{fontFamily:'roboto',fontSize:14,width:'95%',marginTop:5,height:35,borderRadius:3,backgroundColor:'#ececec',border:'none'}}/>
      </View>
      <TouchableOpacity onPress={handleApiCall} style={{width:'95%',marginTop:20,marginBottom:9,height:40,borderRadius:3,backgroundColor:'#c99780',border:'none',display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
        <Text style={{fontFamily:'roboto',fontSize:14,color:'#fff'}}>Next    <AntDesign name="arrowright" style={{fontSize:14,marginTop:3}}/></Text>
      </TouchableOpacity>
     
     </View>
     </View>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pickButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  organization:{
    fontFamily:'roboto',
    fontSize:14,
  },
  container1: {
    flex: 1,
  },
  registerText:{
    fontFamily:'roboto',
    fontSize:14,
    marginBottom:20
  },
  budgetView:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:5
  },
  picker: {
    height: 35, // Adjust the height as needed
    width: '45%', // Adjust the width as needed
    backgroundColor: '#ececec',
       border:'none'
  },
  UploadImageButtonText:{
    fontFamily:'roboto',
    fontSize:14,
    color:'#000000'
  },
  UploadImageButton:{
    height:35,
    width:160,
    backgroundColor:'#ececec',
    borderRadius:3,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  atachLogoText:{
    fontFamily:'roboto',
    fontSize:15,
    fontWeight:'bold',
    marginTop:10
  },
  ifscCodeText:{
    fontFamily:'roboto',
    fontSize:15,
    fontWeight:'bold',
    marginTop:10
  },
  bodySignupView:{
    width:wp('100%'),
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
   
  },
  logoView:{
    width:wp('100%'),
   height:100,
    borderBottomWidth:2,
    borderBottomColor:'#f1f1f1',
    borderTopWidth:2,
    borderTopColor:'#f1f1f1',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  mobileSignupContainer:{
   
    width:wp('80%'),
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingTop:50
  },
  largeScreenContainer:{
   
    width:wp('30%'),
    borderWidth:1,
    borderColor:'#1f1f1f',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:3,
    paddingLeft:10
  
  },
  container: {
   
    backgroundColor: 'white',
  },
  smallScreenText: {
    fontSize: 16,
    color: 'red',
  },
  largeScreenText: {
    fontSize: 24,
    color: 'green',
  },
});

export default Signup;
