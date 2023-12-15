import React from 'react';
import { View, Button } from 'react-native';
import * as Sharing from 'expo-sharing';

const SharePostComponent = () => {
  const handleShare = async () => {
    try {
      const result = await Sharing.shareAsync({
        message: 'Check out this awesome post!',
      });

      if (result.action === Sharing.sharedAction) {
        console.log('Shared successfully');
      } else if (result.action === Sharing.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  return (
    <View  style={{flex:1,alignItems:"center",justifyContent:"center"}}>
      <Button title="Share Post" onPress={handleShare} />
    </View>
  );
};

export default SharePostComponent;
