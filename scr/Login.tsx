import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Style.js'
const Login = ({navigation}:any) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const handleSubmit = async () => {
        try {
        const user = { email, password };
        const response = await fetch('http://192.168.1.6:5094/api/User/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        });
        if (response) {
            const data = await response.text();
            console.log('Token:', data);
            navigation.navigate('Profile', {email});
        } else {
            console.log('Login failed');
        }
        } catch (error) {
        console.error('Error:', error);
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
            <Text style={{fontWeight:'bold',fontSize:22,color:'black'}}>Login</Text>
            <TextInput style={styles.input} 
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter your email"
                keyboardType="email-address"/>
            <TextInput style={styles.input}
                value={password}
                onChangeText={(text) => setPass(text)}
                placeholder="Enter your password"
                secureTextEntry/>
            <TouchableOpacity onPress={handleSubmit} style={styles.button1}>
                <Text style={styles.text}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkButton}>Don't have an account? Register here</Text>
            </TouchableOpacity>
        </View>
        </LinearGradient>
    );
};
export default Login;
