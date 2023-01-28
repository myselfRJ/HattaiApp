import React from 'react';
import { Provider, Modal,Text,Button,Portal,List} from 'react-native-paper';
import { Pressable, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, verticalScale } from '../screens/dim';
import OtpComponent from './otpcomponent';
const SelectModal=(props)=>{

    const containerStyle = {backgroundColor: 'white',
    position:'absolute',
    bottom:0,
    left:0,
    width:"100%",
    height:verticalScale(660),
    justifyContent:'flex-start',
    alignItems:'center',
    borderTopLeftRadius:8,
    borderTopRighttRadius:8,
padding:20};

  
    
    return (


          <Modal dismissable={true} visible={props.visible} onDismiss={props.hideModal} 
          contentContainerStyle={containerStyle}>
           {
            props.mode='otp'?  <OtpComponent phone={props.phone} 
            signupserver={props.signupserver}
            loading={props.loading}
            setloading={props.setloading}
            
            
            />:null
          
           }
            
            

         
          
          </Modal>

       

        
    );
    }
    
    
    export default SelectModal;