import React,{useState}from 'react';
import {View,Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale,verticalScale,moderateScale } from '../screens/dim';

const Profileprg=(props)=>{

    return (
        <View style={styles.main}> 
        <View style={styles.prgcircle}>
            <Text style={props.style} >Fill Profile</Text>
            <View style={{...styles.circle,
                borderWidth:props.mark==='100'?null:2,
                borderColor:'#4BA5FA',
                backgroundColor:props.mark==='100'||props.complete?"#4BA5FA":"#ffff"}}>  
                {props.complete[0]?<Icon name='check' size={24} color="#fff" />:null}
            </View>

        </View>
        <View style={styles.prgcircle}>
            <View style={styles.broadline}></View>
        </View>
        
            <View style={styles.prgcircle}>
            <Text style={props.style}>Add Clinic</Text>
        <View 
        style={{...styles.circle,
            borderWidth:props.mark==='110'?null:2,
            borderColor:'#4BA5FA',
            backgroundColor:props.mark==='110'||props.complete?"#4BA5FA":"#ffff"}}>
                 {props.complete[1]?<Icon name='check' size={24} color="#fff" />:null}

        </View>

            </View>
            
            <View style={styles.prgcircle}>
            <View style={styles.broadline}>
                
                </View>
         
            
           

            </View>
            <View style={styles.prgcircle}>
            <Text style={props.style}>Add User</Text>
            <View style={{...styles.circle, borderWidth:props.mark==='111'?null:2,
        borderColor:'#4BA5FA',
        backgroundColor:props.mark==='111'?"#4BA5FA":"#ffff"}}>

            {props.complete[2]?<Icon name='check' size={24} color="#fff" />:null}
        </View>


            </View>
            
        </View>
    )
}

const styles=StyleSheet.create({
    main:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
     
    },
    circle:{
        height:horizontalScale(48),
        width:horizontalScale(48),
        borderRadius:horizontalScale(48/2),
        backgroundColor:'#4BA5FA',
        justifyContent:'center',
        alignItems:'center',
        margin:2
    },
    broadline:{
        height:verticalScale(2),
        width:horizontalScale(240),
        backgroundColor:'#4BA5FA',
        margin:4,
        
        borderRadius:2
    },

    prgcircle:{
        justifyContent:'center',
        alignItems:'center',
        height:verticalScale(72),
       
     
    }
})
export default Profileprg;