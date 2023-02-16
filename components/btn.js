import React from "react";
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import '../screens/globlevariable';
import {horizontalScale,verticalScale,moderateScale} from '../screens/dim';
const Btn=(props)=>{
    return(
        <Button 
        style={props.mode!='outlined'?styles.BtnBG:{borderRadius:4,borderColor:global.themecolor}} 
        mode={props.mode}
        loading={props.loading}
        labelStyle={props.mode!='outlined'?props.labelStyle?props.labelStyle:styles.BtnText:{...styles.BtnText,color:global.themecolor}} 
        contentStyle={props.contentStyle?props.contentStyle:styles.contentstyle}
        icon={props.icon?props.icon:null}
      
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
    // image: {
    //   flex: 1,
    //   justifyContent: 'center',
    // },
    
 
    BtnBG: {
        backgroundColor: '#4BA5FA',
        borderRadius:4,
        borderColor:global.themecolor
        
    },
    contentstyle:{  
      paddingHorizontal:horizontalScale(16),
      paddingVertical:verticalScale(8)
        
    },
    BtnText: {
        fontSize: moderateScale(24),
        lineHeight:28,
        fontWeight: 500,
        color: 'white',
    },
  });

export default Btn;