import * as React from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';
import styles from './signupss';
import Btn from './btn';
import Inp from './inp';
const LoginComponent = props => {
  console.log(global.user_session,"user",props)
  return (
    <View style={styles.main}>
      <View style={styles.child}>
      <Image source={require('../resources/images/user.png')} />
      </View>
      <View style={styles.child}>
      <Text style={styles.text}>
        Login
      </Text>

      </View>
   
      <View style={styles.child}>
      <Inp placeholder="Phone" maxLength={10}
      onChangeText={text => {props.setPhone(text)}}
      />

      </View>
      <View style={styles.child}>
      <Inp placeholder="Password" maxLength={20}
      pwdtoggle={()=>props.pwdtoggle()}
      onChangeText={text => {props.setPassword(text)}}
      passwordtoggle={props.passwordtoggle}/>

      </View>
     <View style={styles.child}>
     <Btn label='Login'
     action={()=>{props.loginserver()}}/>

     </View>
     <Text style={styles.child}>
     Don’t have an account?
     <Text style={{...styles.text2,fontWeight:'700'}} onPress={props.signupbtn}>
       Signup 
       </Text>
     </Text>
   
   
    </View>
   
  );
};


export default LoginComponent;
