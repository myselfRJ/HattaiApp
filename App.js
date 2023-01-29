// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signuppageview from './screens/doctor/signuppage';
import ProfilePage from './screens/profile';
import Editprofile from './screens/doctor/editprofile';
import Dashboard from './screens/doctor/dashboard';
import BookingApp from './screens/doctor/appointment';
import Prescription from './screens/doctor/prescription';
import EncryptedStorage from 'react-native-encrypted-storage';

const Stack = createNativeStackNavigator();

function App(){
  async function retrieveUserSession() {
    try {   
        const session = await EncryptedStorage.getItem("user_session");
    
        if (session !== undefined) {
          console.log(session,"Session")
          global.user_session = session
            return session// Congrats! You've just retrieved your first value!
        }
    } catch (error) {
        return error// There was an error on the native side
    }
}
retrieveUserSession()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
      {/* <Stack.Screen name="EditProfile" component={Editprofile} /> */}
     {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      <Stack.Screen name='Prescription' component={Prescription}/>
    {/* <Stack.Screen name="BookApp" component={BookingApp} /> */}
 
      <Stack.Screen name="Signup" component={Signuppageview} />
     
   

    
    
    <Stack.Screen name="Profile" component={ProfilePage} />

  </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;