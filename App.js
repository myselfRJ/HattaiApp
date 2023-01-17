// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signuppageview from './screens/doctor/signuppage';
import ProfilePage from './screens/profile';
import Editprofile from './screens/doctor/editprofile';




const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}><Stack.Screen name="EditProfile" component={Editprofile} />
        <Stack.Screen name="Signup" component={Signuppageview} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;