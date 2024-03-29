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
import PatientHistory from './screens/doctor/patientrecord';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import Tabs from './navigation/tabnavigator';
import { Provider } from 'react-redux';
import store from './redux/store';
const Stack = createNativeStackNavigator();



function App(){
  axios.get("https://raw.githack.com/myselfRJ/mcqdata/main/ip.json") .then(function (response) {
    // handle success
    console.log(response.data["ip"]);
    global.globalurl=response.data["ip"]+"/api/v1/"
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
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

const session =retrieveUserSession();

if (session){
  
}
// var config = {
//   method: 'get',
//   url: 'http://localhost:8000/api/v1/data/check',
//   headers: { 
//     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1MjQ2NTYxLCJpYXQiOjE2NzUxNjAxNjEsImp0aSI6IjE5NzIxY2VkZTM2NDQ0YTNhZmQyZjRhNTgwOWZiODM4IiwidXNlcl9pZCI6Ijk5OTk5OTk5OTkifQ.Ebo8FRikkYZ5sCQTneyqxunWM-aB2dQ1j0VkGfulZvI'
//   }
// };
// const [isFilled,setisFilled]=React.useState(false)
// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
//   if( response.data["data"]){
//       setisFilled(true)
//   }
// })
// .catch(function (error) {
//   console.log(error);
// });

// if (retrieveUserSession){
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{
//     headerShown: false
//   }}>
   
//       <Stack.Screen name="EditProfile" component={Editprofile} />
//      <Stack.Screen name="Dashboard" component={Dashboard} />
//       <Stack.Screen name='Prescription' component={Prescription}/>
//     <Stack.Screen name="BookApp" component={BookingApp} />
//     <Stack.Screen name="Profile" component={ProfilePage} />
//     <Stack.Screen name="Signup" component={Signuppageview} />
//   </Stack.Navigator>
//   </NavigationContainer>
//   );
// }
// else{
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="Signup" component={Signuppageview} />
    <Stack.Screen name="Profile" component={ProfilePage} />
    <Stack.Screen name="EditProfile" component={Editprofile} />
     {/* <Stack.Screen name="Dashboard" component={Dashboard} />
     <Stack.Screen name="BookApp" component={BookingApp} />*/}
      <Stack.Screen name='Prescription' component={Prescription}/>
      <Stack.Screen name='PatientHistory' component={PatientHistory}/>
    <Stack.Screen name='Tabs'  component={Tabs} />
    
   
  </Stack.Navigator>
  </NavigationContainer>
  </Provider>
  );
}

export default App;