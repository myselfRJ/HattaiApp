import * as React from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';
import styles from './signupss'
import Btn from './btn';
import Inp from './inp';
const LoginComponent = props => {
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
      <Inp placeholder="8218513243" />

      </View>
      <View style={styles.child}>
      <Inp placeholder="Password"
      password={true}/>

      </View>
     <View style={styles.child}>
     <Btn label='Login'
     action={()=>props.signupbtn}/>

     </View>
     <Text style={styles.child}>
     Don’t have an account?
     <Text style={{...styles.text2,fontWeight:'700'}} onPress={props.signupbtn}
     > Signup </Text>
    

     </Text>
   
   
    </View>
   
  );
};


export default LoginComponent;
