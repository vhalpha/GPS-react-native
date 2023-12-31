import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './scr/Login';
import Register from './scr/Register';
import Profile from './scr/Profile';
import UpdateProfile from './scr/UpdateProfile';
import UpdateAvatar from './scr/UpdateAvatar';
import DevicePosition from './scr/DevicePosition';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="UpdateAvatar" component={UpdateAvatar} />
        <Stack.Screen name="DevicePosition" component={DevicePosition} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
