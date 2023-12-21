import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Swiper from 'react-native-web-swiper';
import { View,Text,StyleSheet,TextInput,Image,Platform,FlatList,ScrollView,SafeAreaView, TouchableOpacity } from "react-native"
import Topbar from '../Home/topbar';
import RNPickerSelect from 'react-native-picker-select';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';




const Store=({ navigation })=>{
    const [selectedValue, setSelectedValue] = useState('');
    const [productImages,setProductImages]=useState('')
    const [availableProjects,setAvailableProjects]=useState('')
    const navigateToNewDetails = () => {
      // Replace "DetailsScreen" with "NewDetailsScreen"
      // navigation.replace('Store', { screen: 'StoreProducts' });
      console.log("Hello")
    };
    const placeholder = {
      label: 'Select an option...',
      value: null,
      color: '#9EA0A4',
    };
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
        console.log(data)
        if(response.ok==true){
          setProductImages(data)
        }
      }
      storeItems()
      const ongoingProjects=async()=>{
        const jwtToken=await AsyncStorage.getItem('jwtToken')
        const apiUrl='http://192.168.1.44:9000/projectsInStore';
        const option={
          method:'GET',
          headers:{
            'Content-Type':'Application/json',
            'Authorization':`Bearer ${jwtToken}`
          }
        }
        const response=await fetch(apiUrl,option)
        const data=await response.json()
        setAvailableProjects(data)
      }
      ongoingProjects()
    },[])
    const items = [
      { label: 'Project 1', value: 'Project 1' },
      { label: 'Project 2', value: 'Project 2' },
      { label: 'Project 3', value: 'Project 3' },
      
    ];
    const images = [
        'http://192.168.1.44:9000/vendorProducts/1692433004877_caffitable.jpg',
        'http://192.168.1.44:9000/vendorProducts/1692433004877_caffitable.jpg',
        'http://192.168.1.44:9000/vendorProducts/1692433004877_caffitable.jpg',
        // Add more image URLs as needed
      ];
     
      const helllo=()=>{
        navigation.push('StoreProducts', { screen: 'StoreProducts' });
      }
      const renderItem = ({ item }) => {
        const {thumbnail}=item
        const splitedImages= thumbnail.split(',')[0]
        return(
        <TouchableOpacity onPress={helllo}>
        <Image source={{uri:`http://192.168.1.44:9000/${splitedImages}`}} style={styles.exploreThumbnail}  />
       </TouchableOpacity>)
      };
      const popularBrands = ({ item }) => {
        const {thumbnail}=item
        const splitedImages= thumbnail.split(',')[0]
        return(
        <Image source={{uri:`http://192.168.1.44:9000/${splitedImages}`}} style={styles.popularBrandsThumbnail} />
        )
      };
      const material = ({ item }) => {
        const {thumbnail}=item
        const splitedImages= thumbnail.split(',')[0]
        return(
        <Image source={{uri:`http://192.168.1.44:9000/${splitedImages}`}} style={styles.exploreThumbnail} />
      )
        }
    return(
      <SafeAreaView>
        <ScrollView style={styles.storeContainer}>
            <Topbar/>
            <View style={styles.projectSelectView}>
                <View>
            <Text style={styles.label}>Select Project:</Text>
            <Picker   style={styles.picker}
        itemStyle={styles.pickerItem}>
            <Picker.Item label="Option 1" value="option1"  style={{color:'red'}} />
        <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" />
            </Picker>
      {/* <RNPickerSelect
        placeholder={placeholder}
        items={items}
        onValueChange={(value) => setSelectedValue(value)}
        style={pickerSelectStyles}
        value={selectedValue}
      /> */}
      </View>
      <TextInput
          style={styles.input}
          placeholder="  Search"
        
        />
            </View >
            
            <View   style={Platform.OS==='ios'  ?(styles.androidSliderView):(styles.sliderView)}>
              {Platform.OS==='ios' ?
               <Swiper style={styles.wrapper} showsButtons={true}>
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: image }} style={styles.mobileImage} />
          </View>
        ))}
      </Swiper> :<Swiper autoPlay interval={1000}>
      <View>
      <Image source={{ uri: "http://192.168.1.44:9000/vendorProducts/1692433004877_caffitable.jpg" }} style={styles.image} resizeMode='cover' />
      </View>
      <View>
      <Image source={{ uri: "http://192.168.1.44:9000/vendorProducts/1692868214980_Wooden-bookshelf-display-case-Bookcase-cabinet-sideboard_717cbce3-5248-4e67-a549-3962e7c7961d_1200x.jpg" }} style={styles.image} resizeMode='contain' />
      </View>
      <View>
      <Image source={{ uri: "http://godfatherstyle.com/wp-content/uploads/2015/12/Interior-Design-Ideas-.jpg" }} style={styles.image} resizeMode='contain' />
      </View>
    </Swiper>}
  
            </View>
            <View style={styles.exploreTextView}>
      <Text style={styles.exploreText}>Explore</Text>
      <Text style={styles.exploreText}>Show all</Text>
      </View> 
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
      data={productImages}
      renderItem={renderItem}
      keyExtractor={(item) => item.productId}
      horizontal={true}
      
      onPress={navigateToNewDetails}

    />
           </ScrollView> 
           <View style={styles.exploreTextView}>
      <Text style={styles.exploreText}>Popular Brands</Text>
      <Text style={styles.exploreText}>Show all</Text>
      </View> 
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
      data={productImages}
      renderItem={popularBrands}
      keyExtractor={(item) => item.productId}
      horizontal={true}
      showsHorizontalScrollIndicator={false} // Hide the scrollbar
    />
           </ScrollView> 
           <View style={styles.exploreTextView}>
      <Text style={styles.exploreText}>Material</Text>
      <Text style={styles.exploreText}>Show all</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
       data={productImages}
      renderItem={material}
      keyExtractor={(item) => item.productId}
      horizontal={true}
      showsHorizontalScrollIndicator={false} // Hide the scrollbar
    />
           </ScrollView> 
        </ScrollView>
        </SafeAreaView>
    )
}
export default Store

const styles=StyleSheet.create({
  picker: {
    width: 200,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#a0a0a0',
  },
  pickerItem: {
    fontSize: 16,
    color: 'red',
  },
  thumbRow:{
    display:'flex',
    flexDirection:'row'
  },
  popularBrandsThumbnail:{
    height:100,
    width:100,
    borderRadius:50,
    margin:10,
  },
  exploreThumbnail:{
    height:100,
    width:100,
    borderRadius:4,
    margin:10
  },
  exploreText:{
    fontFamily:'robot',
    fontSize:15,
    fontWeight:'bold',
    margin:5
  },
  exploreTextView:{
    width:wp('95%'),
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
},
    wrapper: {},
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mobileImage:{
      width:'100%',
      height:250,
    flex: 1,
    borderRadius:8
    },
    image: {
        width:'100%',
        height:400,
      flex: 1,
      borderRadius:8
    },
    sliderView:{
        width:wp('99%'),
        height:400,
        resizeMode:'cover',
        marginLeft:'auto',
        marginRight:'auto'
    },
    androidSliderView:{
      width:wp('96%'),
      height:250,
      resizeMode:'cover',
      marginLeft:'auto',
      marginRight:'auto',
      marginTop:20
    },
    input: {
        fontSize: 13,
       
        width: wp("50%"),
        height:30,
        marginTop:30,
        borderWidth:1,
        borderColor:'gray',
        marginRight:5,
        borderRadius:3
      },
    storeContainer:{
        width:wp('100%'),
        height:hp('80%'),
        
        marginBottom:160
       
       
    },
    projectSelectView:{
        width:wp('100%'),
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'

    },
    label: {
        fontSize: 18,
        marginBottom: 10,
      },
      selectedValue: {
        marginTop: 20,
        fontSize: 16,
      },
})
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 13,
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'red',
      paddingRight: 30,
    },
  });
  