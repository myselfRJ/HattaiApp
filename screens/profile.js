import * as React from 'react';
import {
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const ProfilePage = ({navigation}) => {
  return (
    <View
      style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={{fontSize: 48, fontWeight: 700}}>Profile Page</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfilePage;
