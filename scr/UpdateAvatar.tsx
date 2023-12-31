import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button ,PermissionsAndroid } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
const UpdateAvatar = ({ route, navigation }:any) => {
  const [email] = useState(route.params.email);
  const [avatarUri, setAvatarUri] = useState(null);
  
  /**
  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        //maxHeight: 200,
        //maxWidth: 200,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } 
        else {
          //const source = { uri: response.uri };
          setAvatarUri({ uri: response.uri });
        }
      }
    );
  };
   */

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        const result:any = await launchImageLibrary({mediaType:'photo'})
        setAvatarUri(result.assets[0].uri);
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  

  const handleSubmit = async () => {
    // Implement the logic to upload the image to your server here

    // Example fetch:
    const formData = new FormData();
    formData.append('email', email);
    formData.append('file', {
      uri: avatarUri,
      name: 'avatar.jpg',
      type: 'image/jpg',
    });

    try {
      const response = await fetch('http://192.168.1.6:5094/api/User/avatar', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + AsyncStorage.getItem('token') , // Replace with your access token logic
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      // Handle the response as needed
      console.log('Upload success:', response);

      // Navigate back to the profile screen
      navigation.navigate('Profile', { email });
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Update Avatar</Text>
      <Button title="Choose Image" onPress={requestCameraPermission} />
      {avatarUri && (
        <View>
          <Image
            source={{ uri: avatarUri }}
            style={{ width: 150, height: 200 }}
          />
        </View>
      )}
      <Button title="Save Avatar" onPress={handleSubmit} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default UpdateAvatar;
