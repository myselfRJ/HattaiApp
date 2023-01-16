import * as React from 'react';
import {
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
const LoginComponent = props => {
  return (
    <View
      style={{
        ...styles.container,
        justifyContent: 'space-around',
        height: '70%',
        paddingTop: 30,
        paddingBottom: '10%',
      }}>
      <Image source={require('../resources/images/user.png')} />

      <Text style={styles.text}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="              Phone number              "
        value={props.phone}
        onChangeText={text => props.setPhone(text)}
        keyboardType="numeric"
        inputMode="numeric"
        maxLength={10}></TextInput>
      <TextInput
        style={{...styles.input, borderColor: props.pwdcolor}}
        secureTextEntry={true}
        placeholder="        Password       "
        contextMenuHidden={true}
        value={props.password}
        onChangeText={text => props.setPassword(text)}
        maxLength={20}></TextInput>
      <TouchableOpacity
        style={styles.BtnBG}
        onPress={() => {
          props.loginserver();
        }}>
        {!props.loading ? (
          <Text style={styles.BtnText}>Login</Text>
        ) : (
          <ActivityIndicator
            size="large"
            color="white"
            animating={props.loading}
          />
        )}
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Text style={{...styles.text2}}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            props.signupbtn();
          }}>
          <Text
            style={{
              ...styles.text2,
              color: '#4BA5FA',
              fontSize: 28,
              fontWeight: 700,
            }}>
            Signup Here
          </Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 42,
    lineHeight: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 80,
    width: '50%',
    margin: 10,
    borderWidth: 2,
    borderRadius: 5,
    padding: 20,
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
    fontSize: 22,
    lineHeight: 42,
    fontWeight: '400',
    textAlign: 'center',
  },
});
export default LoginComponent;
