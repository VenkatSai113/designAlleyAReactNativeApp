import React,{useRef,useState,useEffect} from 'react';
import { View,Text,Button,StyleSheet,Image,TextInput,TouchableOpacity,SafeAreaView,ImageBackground,Platform,Dimensions,Alert } from "react-native"
const { width, height } = Dimensions.get('window');
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config';
import firebase  from 'firebase/compat/app';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let appVerifier=""
const Login=()=>{
 
  const navigation = useNavigation();
  const screenWidth=Dimensions.get('window').width;
  const largeScreenWidth = 1024;

  const [phoneNumber ,setPhoneNumber]= useState('');
  const [code ,setCode] = useState('');
  const [verificationId,setVerificationId] =useState(null);
  const recaptchaverifier =useRef(null);
  const [toggleOtpCard,setToggleOtpCard]=useState(true)
  const [errorMessage,setErrorMessage]=useState('')
  const [jwtToken,setJwtToken]=useState('')
const onChangePhoneNumber=(text)=>{
  setPhoneNumber(text)
}
const onChangeverifyOtp=(text)=>{
  setCode(text)
}
  const sendVerification =() =>{
    setToggleOtpCard(false)
    let phone=`+91${phoneNumber}`
    const auth = firebase.auth();
       appVerifier=new firebase.auth.RecaptchaVerifier('recaptcha');
       auth.signInWithPhoneNumber(phone, appVerifier)
    setPhoneNumber('');
    
   
  };
  const confirmCode = async() =>{
    try {
      // Save the JWT token to AsyncStorage
      await AsyncStorage.setItem('jwtToken', jwtToken);
      console.log('JWT token saved successfully');
      navigation.navigate('Explore')
    } catch (error) {
      console.error('Error saving JWT token:', error);
    }
    // let phone=`+91${phoneNumber}`
    // const auth = firebase.auth();
    // auth.signInWithPhoneNumber(phone, appVerifier)
    // .then((confirmationResult) => {
    //   console.log(otp)
    //   confirmationResult.confirm(otp)
     
    // })
    // .then(async (result) => {
    //   await SecureStore.setItemAsync('designerToken',jwtToken);
    //   const token = await SecureStore.getItemAsync('designerToken');
    //   console.log(token); // output: sahdkfjaskdflas$%^&
    //    console.log("successfully varified")
       
    //   //  navigation.navigate('Explore')
    //  })
    //  .catch((error) => {
    //   // Verification code is incorrect
      
    //   console.log("Verification code is incorrect",error)
    
    // });
  }

 const otpHandleClick=async(e)=>{
    let hello="hi"
    console.log('hello')
      const extra= {phoneNumber,hello}
      const url="http://192.168.1.36:9000/checkingPhonenumbers/"
      const options={
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        mode:"cors",
        body:JSON.stringify(extra)
      }
      const response=await fetch(url,options)
      const data=await response.json()
      setErrorMessage(data.error_msg)
     console.log(data)

      if(response.ok===true){ 
        setJwtToken(data.jwtToken)
      const token=  await AsyncStorage.setItem('jwtToken', data.jwtToken);
      console.log(token,'token')
        // sendVerification(data.jwtToken,"data.jwtTokendata.jwtTokendata.jwtToken")
        console.log(data.jwtToken,"heloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
       
        
      
       
      
      
       
       
      }
  }
    return(
      <SafeAreaView style={styles.container}>
            <FirebaseRecaptchaVerifierModal
        ref={recaptchaverifier}
        firebaseConfig={firebaseConfig}/>
         <View id="recaptcha"></View> 
        {screenWidth>largeScreenWidth?
       <View style={styles.sideImageView}>
        <Image source={require("../assets/interior.jpg")} style={styles.interiorSideImage} />
       </View>:null}
   
       <ImageBackground source={require("../assets/Login.png")} style={styles.imageContainer} resizeMode="stretch">
      {toggleOtpCard?
       <View style={[styles.loginCardContainer , screenWidth>786?styles.largerScreen:styles.smallerScreen]} >
                <Image source={require("../assets/logo.jpeg")} style={styles.logoImage}/>
               <View>
                <TextInput style={styles.input} placeholder="Enter Mobile number" type="number" onChangeText={onChangePhoneNumber} keyboardType="number-pad" autoCompleteType="tel" />
                <TouchableOpacity title="Send OTP" style={styles.optButton}  
          onPress={otpHandleClick}>
                    <Text style={styles.customButtonText}>Send OTP</Text>
                   
                </TouchableOpacity>

                </View>
                <Text>{errorMessage}</Text>
                <Text style={styles.signupLinkText}>Don't have an Account</Text>              
               
            </View>
:

      <View style={[styles.loginCardContainer , screenWidth>786?styles.largerScreen:styles.smallerScreen]} >
                <Image source={require("../assets/logo.jpeg")} style={styles.logoImage}/>
               <View>
               <TextInput style={styles.input} placeholder="Enter OTP" type="number" onChangeText={onChangeverifyOtp}/>
                <TouchableOpacity title="Send OTP" style={styles.optButton}  
          onPress={confirmCode}>
                    <Text style={styles.customButtonText}>Verify OTP</Text>
                </TouchableOpacity>
                </View>
                <Text style={styles.signupLinkText}>Don't have an Account</Text>              
               
            </View> 
          }
        
       </ ImageBackground>
      </SafeAreaView>
    )
}
export default Login

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
       flexDirection:"row",
       width: '100%',
       height: '100%',
      },
      imageContainer:{
        flex: 1,
        alignItems: 'center',
       flexDirection:"row",
        justifyContent: 'center',
      },
      sideImageView:{
       width:"70%",
      },
      loginCardOuterImage:{
        height:"100%",
        flex:1,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center"
      },
      loginCardContainer:{
        height: 350,
        backgroundColor: '#ffffff',
        boxShadow: 'brown',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopRightRadius:25,
        borderBottomLeftRadius:25,
      },
      largerScreen:{
        width:350,
        height: 350,
        backgroundColor: 'white', // Background color for your content
        shadowColor: 'gray',  // Set the shadow color to red
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,  // Set the shadow opacity
        shadowRadius: 5,
        elevation: 5,  // Add elevation for Android shadow
      },
      smallerScreen:{
        width:"80%",
         backgroundColor: 'white', // Background color for your content
        shadowColor: 'gray',  // Set the shadow color to red
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,  // Set the shadow opacity
        shadowRadius: 5,
        elevation: 5,  // Add elevation for Android shadow
     
      },
      logoImage:{
        height:"20%",
        width:"90%",
        resizeMode:"contain"
      }
      ,interiorSideImage:{ 
        height:"100%",
        width:"100%",
        resizeMode:"cover"
      },
      input: {
        width: 300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius:3
      },
      optButton:{
        backgroundColor: '#cb937e', // Background color
        padding: 10, // Padding around the button text
        borderRadius: 3, // Border radius to round the corners
        textAlign:"center"
      },
      customButtonText:{
        color:"#ffffff",
        textAlign:"center"
      },
      signupLinkText:{
        color:"black",
        fontSize:10,
        textDecorationLine:"underline",
        marginBottom:10

      },
      sideLogoImage:{
        height:'auto',
        width:'50%'
      }
})