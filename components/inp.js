import React from 'react';
import { TextInput } from 'react-native-paper';
import {StyleSheet} from 'react-native';
import { verticalScale,horizontalScale,moderateScale} from '../screens/dim';

const Inp=(props)=>{
  
    return(
        
        <TextInput 
            style={{...styles.input,
                height:props.height?verticalScale(props.height):verticalScale(78),
                width:props.width?horizontalScale(props.width):horizontalScale(480),
                fontSize: props.fontSize?moderateScale(props.fontSize):moderateScale(24),
                textAlign:props.textAlign?props.textAlign:'left'}}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            value={props.value}
            onChangeText={props.onChangeText}
            inputMode={props.inputMode}
            maxLength={props.maxLength?props.maxLength:25}

            placeholderTextColor='#797B7E'
            underlineColor='#ffffff'
            activeUnderlineColor='#4BA5FA'
            outlineColor='#4BA5FA'
            activeOutlineColor='#4BA5FA'
            secureTextEntry={ props.passwordtoggle}
            right={props.pwdtoggle?
            <TextInput.Icon 
            style={{fontSize:24,color:'#4BA5FA'}} 
            onPress={props.pwdtoggle} 
            icon={props.passwordtoggle?'eye-off':'eye'}/>:null}
        >

        </TextInput>
    )
}
export default Inp;
const styles = StyleSheet.create({
    
   
    input: {
   
      borderRadius: 4,
      
      lineHeight:32,
      borderColor: '#4BA5FA',
      backgroundColor:'#ffffff',
      marginVertical:4

    },
    
  });