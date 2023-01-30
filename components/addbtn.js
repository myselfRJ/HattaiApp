import React from "react";
import {Text,View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { verticalScale,horizontalScale,moderateScale } from "../screens/dim";
 const Addbtn=(props)=>{
    return(
        <TouchableOpacity onPress={props.onPress} style={{position:'absolute',right:horizontalScale(16),top:verticalScale(300),justifyContent:'center',alignItems:'center'}}>
        < View style={{height:verticalScale(80),width:verticalScale(80),borderRadius:verticalScale(40),backgroundColor:'#4BA5FA',justifyContent:'center',alignItems:'center'}}>
        <Icon name='add' size={moderateScale(48)} color='#fff'/>
        </View>
        <Text style={{margin:4}}>{props.text}</Text>
        </TouchableOpacity>

    )
}
export default Addbtn;