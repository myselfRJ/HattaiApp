// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signuppageview from './screens/doctor/signuppage';
import ProfilePage from './screens/profile';
import Editprofile from './screens/doctor/editprofile';
import Dashboard from './screens/doctor/dashboard';
import BookingApp from './screens/doctor/appointment';

const Stack = createNativeStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    {/* <Stack.Screen name="BookApp" component={BookingApp} /> */}
 
    <Stack.Screen name="Signup" component={Signuppageview} />
       <Stack.Screen name="EditProfile" component={Editprofile} />
    <Stack.Screen name="Dashboard" component={Dashboard} />

    
    
  <Stack.Screen name="Profile" component={ProfilePage} />

  </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;