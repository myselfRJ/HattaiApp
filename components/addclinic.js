import { useLinkProps } from '@react-navigation/native';
import React,{useEffect, useState} from 'react';
import {View,Text,ScrollView, TouchableOpacity} from 'react-native';
import { verticalScale ,horizontalScale,moderateScale} from '../screens/dim';
import ProfilePage from '../screens/profile';
import Addbtn from './addbtn';
import Btn from './btn';
import Datebtn from './datebtn';
import DaySym from './daysym';
import Inp from './inp';
import styles from './signupss';

const Addclinic=(props)=>{
  const [clinic,setClinic]=useState();
  const [address,setAddress]=useState();
  const [ctiming,setCtiming]=useState();
  const [cfess,setCfess]=useState();
  const [speciality,setSpeciality]=useState();
  const [experience,setExperience]=useState();
  const [daySelect,setDay]=useState([{day:'M',select:false},
                                      {day:'T',select:false},
                                      {day:'W',select:false},
                                      {day:'TH',select:false},
                                      {day:'F',select:false},
                                      {day:'S',select:false},
                                      {day:'Su',select:false},
                                    ])

  useEffect(()=>{
    console.log('Hello world')

  },[daySelect])
  
    return (
        <View style={styles.editprofile}>
        <ScrollView>
        <Text style={{...styles.text,textAlign:'left',marginTop:verticalScale(40)}}>
            Add Clinic
        </Text>
        
        <View style={{justifyContent:'flex-start'}}>
           <View style={styles.child}>
             <Inp textAlign='left' placeholder='Clinic Name'/>
           </View>
           <View style={styles.child}>
             <Inp textAlign='left' placeholder='Address'/>
           </View>
           <View style={styles.child}>
           <Text style={{...styles.text,fontSize:moderateScale(24),textAlign:'left'}}>
            Choose day
        </Text>
            <View style={{flexDirection:'row'}}>
              {daySelect.map((value,index)=>{
                return(
                  <DaySym  
                     
                      key={index}
                      id={index} 
                      day={value.day} 
                      select={value.select}
                      daySelect={daySelect} 
                      setDay={setDay}/>
                )
              })}

            </View>
           </View>
           
           <View style={styles.child}>
           <Datebtn name='clock' text='Clinic Timings' 
           action={props.showModal}/>
           </View>
           
           <View style={{...styles.child}}>
            
            
            <Inp textAlign='left' placeholder='Clinic Fees' />
         
            </View>
            <View style={{...styles.child}}>
            <Text style={{...styles.text,fontSize:moderateScale(24),textAlign:'left'}}>
            Add Photo
        </Text>
        </View>
            <View style={styles.img}>
             
           </View>

           
           <View style={{...styles.child,justifyContent:'center',alignItems:'center'}}>
                <Btn 
                label='Save'
                action={()=>{props.setComplete([true,true,false]);
                  props.setMark('111')
                }}/>
           </View>
           
          
        </View>
        <Addbtn text='Add Clinic'/>

        </ScrollView>
        
        </View>
    )
}

export default Addclinic;