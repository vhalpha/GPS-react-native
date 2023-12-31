import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Style.js'
const Register = ({navigation}:any) => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const handleSubmit = () => {
    if (password === confirmPass) {
      const user = { username, password, email, name, role: 'user' };
      fetch('http://192.168.1.6:5094/api/User', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
      navigation.navigate('Login');
    }
  };

  return (

    <LinearGradient
    colors={['#7439db', '#C66FBC', '#F7944D']}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        style={styles.container}
    >
      <View style={styles.backgroundImage}>
        <Text style={{fontWeight:'bold',fontSize:22,color:'black'}}>Register</Text>
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
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <TextInput style={styles.input} 
          value={password}
          onChangeText={(text) => setPass(text)}
          placeholder="Enter your password"
          secureTextEntry
        />
        <TextInput style={styles.input} 
          value={confirmPass}
          onChangeText={(text) => setConfirmPass(text)}
          placeholder="Confirm your password"
          secureTextEntry
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button1}>
          <Text>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} >
          <Text style={styles.linkButton}>Already have an account? Login here</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Register;
