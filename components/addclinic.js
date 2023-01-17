import React from 'react';
import {View,Text,ScrollView, TouchableOpacity} from 'react-native';
import Btn from './btn';
import DaySym from './daysym';
import Inp from './inp';
import styles from './signupss';

const Addclinic=()=>{

    return (
        <View style={{margin:16}}>
        <ScrollView>
        <Text style={{...styles.text,textAlign:'left',marginHorizontal:16}}>
            Add Clinic
        </Text>
        
        <View style={{justifyContent:'flex-start'}}>
           <View style={styles.child}>
             <Inp placeholder='Clinic Name'/>
           </View>
           <View style={styles.child}>
             <Inp placeholder='Address'/>
           </View>
           <View style={styles.child}>
           <Text style={{...styles.text,fontSize:24,textAlign:'left'}}>
            Choose day
        </Text>
            <View style={{flexDirection:'row'}}>
               <DaySym day='M'/>
               <DaySym day='T'/>
               <DaySym day='W'/>
               <DaySym day='Th'/>
               <DaySym day='F'/>
               <DaySym day='Sa'/>
               <DaySym day='Su'/>
               <DaySym day='All'/>
            </View>
           </View>
           <View style={styles.child}>
             <Inp placeholder='Clinic Timings'/>
           </View>
           
           <View style={{...styles.child}}>
            
            
            <Inp placeholder='Clinic Fees'/>
         
            </View>
            <View style={{...styles.child}}>
            <Text style={{...styles.text,fontSize:24,textAlign:'left'}}>
            Add Clinic
        </Text>
        </View>
            <View style={styles.img}>
             
           </View>

           
           <View style={{...styles.child,justifyContent:'center',alignItems:'center'}}>
                <Btn 
                label='Save'/>
           </View>
           
          
        </View>
        <TouchableOpacity style={{position:'absolute',right:80,top:400,height:80,width:80,borderRadius:40,backgroundColor:'#4BA5FA',justifyContent:'center',alignItems:'center'}}>
<Text>Add</Text>
        </TouchableOpacity>

        </ScrollView>
        </View>
    )
}

export default Addclinic;