import * as React from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const OtpComponent = props => {
  const [otp, setOtp] = React.useState('');
  const [counter, setCounter] = React.useState(4);
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

        height: '70%',
        paddingBottom: '10%',
      }}>
      {/* <Image source={require('../resources/images/user.png')} /> */}

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <Text style={{...styles.text, alignItems: 'flex-start', width: 400}}>
          Enter OTP
        </Text>
        <View style={{width: 400, alignItems: 'center'}}>
          <TextInput
            style={{...styles.input, width: 400, letterSpacing: 10}}
            placeholder="______"
            value={otp}
            onChangeText={text => setOtp(text)}
            keyboardType="numeric"
            inputMode="numeric"
            maxLength={6}></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: 400,
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
              fontSize: 24,
              fontWeight: 700,
            }}>
            {counter} sec
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.BtnBG}
        onPress={() => {
          console.log('pressed');
          props.signupserver(props.phone, otp);
        }}>
        <Text style={styles.BtnText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 32,
    lineHeight: 48,
    fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'flex-start',
    width: '50%',
    marginBottom: 20,
  },
  input: {
    height: 80,
    width: '50%',
    margin: 10,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    fontSize: 26,
    textAlign: 'center',
    borderColor: '#4BA5FA',
  },
  BtnBG: {
    backgroundColor: '#4BA5FA',
    height: 80,
    width: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtnText: {
    fontSize: 24,
    fontWeight: 500,
    color: 'white',
  },
  text2: {
    color: 'black',
    fontSize: 16,
    lineHeight: 31,
    fontWeight: '400',
    textAlign: 'center',
  },
});
export default OtpComponent;
