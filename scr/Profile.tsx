import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Style.js'
import LinearGradient from 'react-native-linear-gradient';
const Profile = ({ route, navigation }:any) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(
          `http://192.168.1.6:5094/api/User/profile/${route.params.email}`,
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setName(data.name);
          setRole(data.role);

          if (data.avatarUri) {
            const avatarResponse = await fetch(
              `http://192.168.1.6:5094/api/User/avatar/${data.avatarUri}`,
              {
                headers: {
                  Authorization: 'Bearer ' + token,
                },
              }
            );
            if (avatarResponse.ok) {
              const avatarData = await avatarResponse.json();
              //setImageSrc({ uri: 'data:image/jpeg;base64,' + avatarData.fileContents });
            }
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [route.params.email]);

  const handleUpdateProfile = () => {
    navigation.navigate('UpdateProfile', {
      email: route.params.email,
      username,
      name,
    });
  };

  const handleUpdateAvatar = () => {
    navigation.navigate('UpdateAvatar', {
      email: route.params.email,
    });
  };

  const handleDevicePosition = () => {
    navigation.navigate('DevicePosition', {
      email: route.params.email,
    });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
    colors={['#7439db', '#C66FBC', '#F7944D']}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        style={styles.container}
    >
    <View style={ styles.backgroundImage}>
      <Text style={{fontWeight:'bold',fontSize:22,color:'black'}}>User Profile</Text>
      <View >
        <Text>Username: {username}</Text>
        <Text>Email: {route.params.email}</Text>
        <Text>Fullname: {name}</Text>
        <Text>Role: {role}</Text>
      </View>
      {imageSrc && (
        <Image
          source={imageSrc}
          style={{ width: '100%', height: 200 }}
        />
      )}
      <TouchableOpacity onPress={handleUpdateProfile}>
        <Text>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUpdateAvatar}>
        <Text>Update Avatar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDevicePosition}>
        <Text>View Device Position</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.button1}>
        <Text >Log out</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};

export default Profile;
