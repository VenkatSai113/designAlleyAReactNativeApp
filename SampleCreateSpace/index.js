import React, { useState } from 'react';
import { View, Text, Button, Image,TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function SampleCreateSpace() {
  const [spacename, setSpacename] = useState('');
  const [projectId, setProjectId] = useState(''); // Set the project ID here
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('spacename', spacename);
      formData.append('projectId', projectId);
      formData.append('spaceImage', {
        uri: image,
        name: 'spaceImage.jpg', // Change the filename as needed
        type: 'image/jpg',
      });

      const response = await axios.post('http://192.168.1.44:9000/createSpaces', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View>
      <Text>Space Name:</Text>
      <TextInput
        onChangeText={(text) => setSpacename(text)}
        value={spacename}
        placeholder="Enter space name"
      />
      
      {/* Other input fields as needed */}

      <Button title="Pick an image" onPress={pickImage} />

      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      <Button title="Upload" onPress={uploadImage} />
    </View>
  );
}
