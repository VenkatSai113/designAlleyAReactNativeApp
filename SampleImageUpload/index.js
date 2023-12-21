import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const apiBaseUrl = 'http://localhost:9000'; // Replace with your machine's local IP and port

const UpdateUserProfileApiCall = async (formData) => {
  try {
    const response = await fetch(`${apiBaseUrl}/createSpaces`, {
      method: 'POST',
      body: formData,
      // Add any necessary headers (e.g., authorization headers)
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('UpdateUserProfileApiCall Error:', error);
    throw error;
  }
};

const UserProfileEditor = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please allow access to the photo library to select an image.');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result);
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      if (!firstName || !lastName || !gender) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }

      var formData = new FormData();
      formData.append('spacename', firstName);
      formData.append('projectId', lastName);
      formData.append('gender', gender);

      if (selectedImage) {
        let imageData = {
          uri: selectedImage.uri,
          type: 'image/jpeg', // You may need to adjust the type based on the selected image format
          name: 'profile.jpg', // You can customize the filename
        };
        formData.append('spaceImage', imageData);
      }

      const response = await UpdateUserProfileApiCall(formData);

      console.log('response UpdateUserProfileApiCall', response);

      if (response.success) {
        Alert.alert('Success', 'Profile updated successfully.');
      } else {
        Alert.alert('Error', 'Failed to save profile changes');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>First Name:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text>Last Name:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={lastName}
        onChangeText={setLastName}
      />

      <Text>Gender:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={gender}
        onChangeText={setGender}
      />

      <TouchableOpacity onPress={handleImageSelect}>
        <Text>Select Image</Text>
      </TouchableOpacity>

      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={{ width: 100, height: 100, resizeMode: 'cover', marginBottom: 10 }}
        />
      )}

      <TouchableOpacity onPress={handleSaveProfile}>
        <Text>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileEditor;
