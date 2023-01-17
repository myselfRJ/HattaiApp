import React from "react";
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
const Btn=(props)=>{
    return(
        <Button 
        style={styles.BtnBG} 
        mode="contained"
        labelStyle={props.labelStyle?props.labelStyle:styles.BtnText} 
        contentStyle={styles.contentstyle}
      
        onPress={props.action}>
            {props.label}
        </Button>
    )
}

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
    
 
    BtnBG: {
        backgroundColor: '#4BA5FA',
        borderRadius:4,
        
        height: 80,
        width: 240
    },
    contentstyle:{
        height: 80,
        width: 240,
        
    },
    BtnText: {
    
  
        fontSize: 24,
        lineHeight:32,
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

export default Btn;