import * as React from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { horizontalScale, moderateScale, verticalScale } from '../screens/dim';
import Btn from './btn';
import Inp from './inp';

const OtpComponent = props => {
  const [otp, setOtp] = React.useState('');
  const [counter, setCounter] = React.useState(45);
  {
    counter > 0
      ? setTimeout(() => {
          setCounter(counter - 1);
          console.log(counter);
        }, 1000)
      : console.log('over');
  }

  return (
    <View
      style={{
        ...styles.container,

        // height: '70%',
        
      }}>
      {/* <Image source={require('../resources/images/user.png')} /> */}
 
     
        <Text style={{...styles.text, alignItems: 'flex-start'}}>
          Enter OTP
        </Text>
        
          <Inp
          placeholder="______"
          value={otp}
          onChangeText={text => setOtp(text)}
          keyboardType="numeric"
          inputMode="numeric"
          maxLength={6}/>
      
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems:'flex-end',
          
            marginBottom:verticalScale(72),
            marginTop:verticalScale(32)
          }}>
          {counter == 0 ? (
            <TouchableOpacity
              onPress={() => {
                setCounter(5);
              }}>
              <Text style={{...styles.text2}}>Resend OTP </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <Text
            style={{
              ...styles.text2,
              color: '#4BA5FA',
              fontSize: moderateScale(24),
              fontWeight: 700,
            }}>
            {counter} sec
          </Text>
          
        </View>
        <View style={{alignItems:"center"}}>
        <Btn label='Send' action={() => {
          console.log('pressed');
          props.signupserver(props.phone, otp);
        }}/>

        
        </View>
        <View style={{marginVertical:verticalScale(16)}}>
        {props.loading?<ActivityIndicator size={32} color='#4BA5FA'/>:null}
        </View>
        
       

      
     
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal:horizontalScale(158),
    paddingVertical:verticalScale(120)
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: moderateScale(32),
    lineHeight: moderateScale(48),
    fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'flex-start',
    marginBottom: moderateScale(20),
   

  },
 

  text2: {
    color: 'black',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(32),
    fontWeight: '400',
    textAlign: 'center',
  },
});
export default OtpComponent;
