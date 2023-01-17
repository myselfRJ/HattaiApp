import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import LoginComponent from '../../components/logincomponent';
import OtpComponent from '../../components/otpcomponent';
import SignupComponent from '../../components/signupcomponent';

const Signuppageview = ({navigation}) => {
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordtoggle, setPasswordtoggle] = React.useState(false);
  const [password2, setPassword2] = React.useState('');
  const [pagenum, setPagenum] = React.useState(0); //[0,1,2,3]=signup,otp,success,login
  const [loading, setloading] = React.useState(false);
  color_list = ['#4BA5FA', 'red'];
  const [pwdcolor, setPwdcolor] = React.useState(color_list[0]);
  React.useEffect(() => {
    console.log(pagenum);
    setloading(false);
    setPassword('');
    setPwdcolor(color_list[0]);
  }, [pagenum]);

  const headers = {
    'Content-Type': 'application/json',
  };
  const erroredResponsse = () => {
    setPwdcolor(color_list[1]);
    setloading(false);
  };
  const otpbtn = async () => {
    //2 steps 1. display otp component 2. send post request
    if (password === password2 && password && phone) {
      setloading(!loading);
      const data = await axios
        .post(
          'http://192.168.29.6:8000/api/v1/signup/doctor',
          {
            phone: phone,
            password: password,
            password2: password2,
          },
          {headers},
        )
        .then(function (response) {
          console.log(response.data);
          if (response.status === 201) {
            setloading(false);
            setPagenum(1);
          } else {
            erroredResponsse();
            console.warn(response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          erroredResponsse();
        });
    } else {
      erroredResponsse();
    }
  };
  const loginbtn = () => {
    setPagenum(3);
  };
  const signupbtn = () => {
    setPagenum(0);
  };
  const loginserver = async () => {
    setloading(!loading);
    {
      phone && password
        ? await axios
            .post(
              'http://192.168.29.6:8000/api/v1/signup/token/',
              {
                phone_number: phone,
                password: password,
              },
              {headers},
            )
            .then(function (response) {
              console.log(response.data);
              setloading(false);
              setPwdcolor(color_list[0]);
              navigation.navigate('Profile', {name: 'Jane'});
            })
            .catch(function (error) {
              console.log(error);
              erroredResponsse();
            })
        : erroredResponsse();
    }
    //
  };
  const signupserver = async (phone, otp) => {
    setloading(!loading);
    console.log(phone,otp)
    {
      phone && otp
        ? await axios
            .post(
              'http://192.168.29.6:8000/api/v1/signup/otp',
              {
                phone: phone,
                otp: otp,
              },
              {headers},
            )
            .then(function (response) {
              console.log(response.data);
              if (response.data['status'] === 'success') {
                setloading(false);
                setPwdcolor(color_list[0]);
                navigation.navigate('Profile', {name: 'Jane'});
              } else {
                console.warn(response.data.message);
              }
            })
            .catch(function (error) {
              console.log(error);
              erroredResponsse();
            })
        : erroredResponsse();
    }
    //
  };
  const pwdtoggle = () => {
    setPasswordtoggle(!passwordtoggle);
  };
  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex:1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            backgroundColor: 'white',
          }}>
          <View style={{...styles.container}}>
            <Image
              source={require('../../resources/images/headmain.png')}
              resizeMode="cover"
            />
          </View>

          {pagenum === 0 ? (
            <SignupComponent
              phone={phone}
              password={password}
              setPassword={setPassword}
              setPhone={setPhone}
              password2={password2}
              setPassword2={setPassword2}
              loginbtn={loginbtn}
              pwdcolor={pwdcolor}
              otpbtn={otpbtn}
              pwdtoggle={pwdtoggle}
              passwordtoggle={passwordtoggle}
            />
          ) : (
            <></>
          )}
          {pagenum === 1 ? (
            <OtpComponent phone={phone} signupserver={signupserver} />
          ) : (
            <></>
          )}
          {pagenum === 3 ? (
            <LoginComponent
              signupbtn={signupbtn}
              loginserver={loginserver}
              loading={loading}
              pwdcolor={pwdcolor}
              phone={phone}
              password={password}
              setPassword={setPassword}
              setPhone={setPhone}
            />
          ) : (
            <></>
          )}
        </View>
      </TouchableWithoutFeedback>
    
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
export default Signuppageview;
