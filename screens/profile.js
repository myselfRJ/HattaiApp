import * as React from 'react';
import {
  TextInput,
  Image,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { GetApi } from '../api/postapi';
const ProfilePage = ({navigation}) => {
  React.useEffect(() => {
    GetApi('data/check',true)//+global.CLINICID,true)
    .then(function(response){
      if(response.status===201){
        navigation.navigate("Dashboard")
      }else{
        navigation.navigate("EditProfile")
      }
    })
        }, []);
  return (
    <View
      style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <TouchableOpacity
        onPress={() => {
      console.log("here")
        }}>
        <ActivityIndicator size={48} color={global.themecolor}/>
        <Text>Data is Loading.....</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfilePage;
