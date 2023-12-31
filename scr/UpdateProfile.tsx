import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import styles from './Style.js'
import LinearGradient from 'react-native-linear-gradient';
const UpdateProfile = ({ route, navigation }:any) => {
  const { email, username: initialUsername, name: initialName } = route.params;
  const [username, setUsername] = useState(initialUsername);
  const [name, setName] = useState(initialName);
  const [password, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSubmit = () => {
    if (password === confirmPass) {
      const user = { email, username, name, password };
      Alert.alert('Update Successful', 'Your profile has been updated successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert('Password Mismatch', 'Please make sure your passwords match.');
    }
  };

  return (
    <LinearGradient
    colors={['#7439db', '#C66FBC', '#F7944D']}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        style={styles.container}
    >
      <View style={ styles.backgroundImage}>
        <Text style={{fontWeight:'bold',fontSize:22,color:'black'}}>Update Profile</Text>
        <TextInput style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Enter your username"
        />
        <TextInput style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter your fullname"
        />
        <TextInput style={styles.input}
          value={password}
          onChangeText={(text) => setPass(text)}
          secureTextEntry
          placeholder="Enter your new password"
        />
        <TextInput style={styles.input}
          value={confirmPass}
          onChangeText={(text) => setConfirmPass(text)}
          secureTextEntry
          placeholder="Confirm your password"
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button1}>
          <Text style={styles.text}>Confirm Update</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button1}>
          <Text style={styles.text}>BACK</Text>
        </TouchableOpacity>
    </View>
    </LinearGradient>

  );
};

export default UpdateProfile;
