import React from 'react';
import { TextInput } from 'react-native-paper';
import {StyleSheet} from 'react-native';

const Inp=(props)=>{
  
    return(
        
        <TextInput 
            style={styles.input}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            value={props.value}
            onChangeText={props.onChangeText}
            inputMode={props.inputMode}
            maxLength={10}
            mode='outlined'
            outlineColor='#000000'
            activeOutlineColor='#4BA5FA'
            secureTextEntry={ props.password?true:false}
            right={props.password?<TextInput.Icon icon='eye'/>:null}
        >

        </TextInput>
    )
}
export default Inp;
const styles = StyleSheet.create({
    
   
    input: {
      height: 78,
      width: 480,
      borderRadius: 4,
      textAlign:'center',
      fontSize: 24,
      lineHeight:32,
      borderColor: '#4BA5FA',

    },
    
  });