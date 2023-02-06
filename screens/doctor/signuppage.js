import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import LoginComponent from '../../components/logincomponent';
import OtpComponent from '../../components/otpcomponent';
import SignupComponent from '../../components/signupcomponent';
import {pwdCheck} from '../../auth/pwdauth';
import {horizontalScale, verticalScale} from '../dim';
import SelectModal from '../../components/selectmodal';
import {PostApi} from '../../api/postapi';
import EncryptedStorage from 'react-native-encrypted-storage';

const Signuppageview = ({navigation}) => {
  
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordtoggle, setPasswordtoggle] = React.useState(false);
  const [password2, setPassword2] = React.useState('');
  const [pagenum, setPagenum] = React.useState(0); //[0,1,2,3]=signup,otp,success,login
  const [visible, setVisible] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  React.useEffect(() => {
    console.log(pagenum);
    setloading(false);
    setPassword('');
    setPassword2('');
  }, [pagenum]);

  const requestFailed = () => {
    console.log('error',phone,password);
    setloading(false);
  };
  //function to call when signup button pressed on signup component and navigate to otp component
  const otpbtn = () => {
    var check = pwdCheck(password, password2);
    console.log(check);
    if (check) {
      // setPagenum(1);
      data = {
        phone: phone,
        password: password,
        password2: password2,
      };
      setloading(!loading);
      PostApi('signup/doctor', data,false)
        .then(function (response) {
          console.log(response.data);
          if (response.status === 201) {
            setloading(false);
            setVisible(!visible);
          } else {
            requestFailed();
          }
        })
        .catch(function (error) {
          requestFailed();
          console.log(error.response.data, 'l');
        });
    }
  };
 // login text press function in signupcomponent to enable logincomponent
  const loginbtn = () => {
    setPagenum(3);
  };
  // signup text press function in logincomponent to enable signupcomponent
  const signupbtn = () => {
    setPagenum(0);
  };
  //function to make login request to server to fetch tokens
  const loginserver = async () => {
    setloading(!loading);
    async function storeUserSession(data,phone) {
      try {
          await EncryptedStorage.setItem(
              "user_session",
              JSON.stringify({
                  refresh : data["refresh"],
                  token : data["access"],
                  phone : phone,
                  languages : ["fr", "en", "de"]
              })
          );
  
          // Congrats! You've just stored your first value!
      } catch (error) {
          // There was an error on the native side
      }
  }
  console.log(phone,password,"data",globalurl)
    {
      phone && password
        ? PostApi('signup/token/',
              {
                phone_number: phone,
                password: password,
              },false
            )
            .then(function (response) {
              console.log(response.data);
              if (response.status===200){
                console.log("loged in")
              setloading(false);
              global.user_session=response.data["access"]
              storeUserSession(response.data,phone);
              navigation.navigate('Profile', {name: 'Jane'});}
            })
            .catch(function (error) {
              console.log(error,phone,password);
              requestFailed();
            })
        : requestFailed();
    }
    
  };
  const signupserver = async (phone, otp) => {
    setloading(!loading);
    console.log(phone, otp, 'phone otp');
    {
      phone && otp
        ? PostApi('signup/otp',
              {
                phone: phone,
                otp: otp,
              },false
            )
            .then(function (response) {
              console.log(response.data);
              if (response.data['status'] === 'success') {
                
                setloading(false);
                setPagenum(3);
                hideModal()
              } else {
                console.warn(response.data.message);
              }
            })
            .catch(function (error) {
              console.log(error);
              requestFailed();
            })
        : requestFailed();
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
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
        <View style={{...styles.container}}>
          <Image
            source={require('../../resources/images/headmain.png')}
            style={{height: verticalScale(387), width: horizontalScale(834)}}
            resizeMode="contain"
          />
        </View>

        {pagenum === 0 ? (
          <SignupComponent
            phone={phone}
            loading={loading}
            password={password}
            setPassword={setPassword}
            setPhone={setPhone}
            password2={password2}
            setPassword2={setPassword2}
            loginbtn={loginbtn}
            otpbtn={otpbtn}
            pwdtoggle={pwdtoggle}
            passwordtoggle={passwordtoggle}
          />
        ) : (
          <></>
        )}

        {pagenum === 3 ? (
          <LoginComponent
            signupbtn={signupbtn}
            loginserver={loginserver}
            loading={loading}
            phone={phone}
            password={password}
            setPassword={setPassword}
            pwdtoggle={pwdtoggle}
            passwordtoggle={passwordtoggle}
            setPhone={setPhone}
          />
        ) : (
          <></>
        )}
        <SelectModal
          visible={visible}
          mode="otp"
          phone={phone}
          signupserver={signupserver}
          loading={loading}
          setloading={setloading}
          showModal={showModal}
          hideModal={hideModal}
        />
        {/* <SelectModal visible={visible} 
               mode='login'
              phone={phone} signupserver={signupserver}
              loading={loading}
              setloading={setloading}
              showModal={showModal} 
              hideModal={hideModal}/> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 1,
    backgroundColor:'#4BA5FA'
  },
  image: {
    flex: 1,
    // justifyContent: 'center',
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
