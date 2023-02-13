import * as React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './signupss';
import Btn from './btn';
import Inp from './inp';
import {ActivityIndicator} from 'react-native-paper';
import {horizontalScale, moderateScale, verticalScale} from '../screens/dim';

const SignupComponent = props => {
  return (
    <View style={styles.main}>
      <View style={styles.child}>
        <Image source={require('../resources/images/user.png')} />
      </View>
      <View style={styles.child}>
        <Text style={styles.text}>Signup</Text>
      </View>

      <View style={styles.child}>
        <Inp
          placeholder="Enter Phone Number"
          value={props.phone}
          onChangeText={text => props.setPhone(text)}
          keyboardType="numeric"
          inputMode="numeric"
          maxLength={10}
        />
      </View>
      <View style={styles.child}>
        <Inp
          placeholder="Password"
          contextMenuHidden={!props.passwordtoggle}
          value={props.password}
          secureTextEntry={!props.passwordtoggle}
          onChangeText={text => props.setPassword(text)}
          pwdtoggle={() => props.pwdtoggle()}
          passwordtoggle={props.passwordtoggle}
          maxLength={20}
        />
      </View>

      <View style={styles.child}>
        <Inp
          placeholder="Re-enter Password"
          value={props.password2}
          onChangeText={text => props.setPassword2(text)}
          maxLength={20}
          passwordtoggle={props.passwordtoggle}
        />
      </View>
      <View style={styles.child}>
        {props.loading ? (
          <ActivityIndicator size={32} color="#4BA5FA" />
        ) : (
          <Btn
            label="Signup"
            loading={props.loading}
            action={() => {
              props.otpbtn();
            }}
          />
        )}
      </View>
      <Text style={styles.child}>
        Have an account?
        <Text
          style={{...styles.text2, fontWeight: '700'}}
          onPress={props.loginbtn}>
          Login
        </Text>
      </Text>
    </View>
  );
};
export default SignupComponent;
