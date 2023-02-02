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
import { PostApi ,PostForm} from '../api/postapi';
const Adduser=(props)=>{
  const [name,setName]=useState();
  const [phone,setPhone]=useState();
  const [email,setEmail]=useState();
  const [role,setRole]=useState("Receptionist");
  const [clinic,setClinic]=useState(props.clinicId["id"]);
console.log(props.clinicId,name,phone,email,"clinic id")

const saveUser=()=>{
  const data={
    clinic:clinic,
    name:name,
    phone_number:phone,
    email:email
  }
  console.log(data);
  PostApi('receptionist/save', data, true)
    .then(function (response) {
      console.log(response.data);
      if (response.data['status'] === 'success') {
      props.setComplete([true, true, true]);
          props.setMark('1111');}}
          )
      
      .catch(function (error) {
        console.log(error);
      });

}
    return (
        <View style={styles.editprofile}>
        <ScrollView>
        <Text style={{...styles.text,textAlign:'left',marginTop:verticalScale(40)}}>
            Add User
        </Text>
        
        <View style={{justifyContent:'flex-start'}}>
           <View style={styles.child}>
             <Inp textAlign='left' placeholder='Full Name'
             value={name}
             onChangeText={setName}/>
           </View>
           <View style={styles.child}>
             <Inp textAlign='left' placeholder='Phone Number'
             value={phone}
             onChangeText={setPhone}/>
           </View>
          
           <View style={styles.child}>
             <Inp textAlign='left' placeholder='Email'
             value={email}
             onChangeText={setEmail}/>
           </View>
           
           <View style={{...styles.child}}>
            
            
           <Datebtn name='account' text='Receptionist' action={()=>{console.log("pressed for nothing")}}
           //action={props.showModal} uncomment and change text to Role
           />
         
            </View>
            <View style={{...styles.child}}>
            
            
            <Datebtn name='medical-bag' text={props.clinicId["name"]} action={()=>{console.log("pressed for nothing")}}
          // action={props.showModal} uncomment and change text to Clinic
           />
         
            </View>
           

           
           <View style={{...styles.child,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <Btn 
                label='Skip'action={()=>{
                  props.setComplete([true,true,true]);
                  props.setMark('1111')}
                  }/>
                 <Btn 
                label='Save' 
                action={()=>{saveUser()
                  props.setComplete([true,true,true]);
                  props.setMark('1111')}
                  }/>
           </View>
           
          
        </View>
        {name&&phone&&email&&<Addbtn text='Add user'/>}
      
        </ScrollView>
        </View>
    )
}

export default Adduser;