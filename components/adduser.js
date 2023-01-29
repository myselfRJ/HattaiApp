import { useLinkProps } from '@react-navigation/native';
import React,{useState,useEffect}from 'react';
import {View,Text,ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { horizontalScale, moderateScale, verticalScale } from '../screens/dim';
import Addbtn from './addbtn';
import Btn from './btn';
import Datebtn from './datebtn';
import DaySym from './daysym';
import Inp from './inp';
import styles from './signupss';

const Adduser=(props)=>{
  const [name,setName]=useState();
  const [phone,setPhone]=useState();
  const [email,setEmail]=useState();
  const [role,setRole]=useState();
  const [clinic,setClinic]=useState();

    return (
        <View style={styles.editprofile}>
        <ScrollView>
        <Text style={{...styles.text,textAlign:'left',marginTop:verticalScale(40)}}>
            Add User
        </Text>
        
        <View style={{justifyContent:'flex-start'}}>
           <View style={styles.child}>
             <Inp textAlign='left' placeholder='Full Name'/>
           </View>
           <View style={styles.child}>
             <Inp textAlign='left' placeholder='Phone Number'/>
           </View>
          
           <View style={styles.child}>
             <Inp textAlign='left' placeholder='Email'/>
           </View>
           
           <View style={{...styles.child}}>
            
            
           <Datebtn name='account' text='Role' 
           action={props.showModal}/>
         
            </View>
            <View style={{...styles.child}}>
            
            
            <Datebtn name='medical-bag' text='Clinic' 
           action={props.showModal}/>
         
            </View>
           

           
           <View style={{...styles.child,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <Btn 
                label='Skip'/>
                 <Btn 
                label='Save' 
                action={()=>{props.setComplete([true,true,true]);
                  props.setMark('1111')}}/>
           </View>
           
          
        </View>
        <Addbtn text='Add user'/>
      
        </ScrollView>
        </View>
    )
}

export default Adduser;