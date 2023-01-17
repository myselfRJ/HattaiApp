import React from 'react';
import {View,Text,ScrollView, TouchableOpacity} from 'react-native';
import Btn from './btn';
import DaySym from './daysym';
import Inp from './inp';
import styles from './signupss';

const Adduser=()=>{

    return (
        <View style={{margin:16}}>
        <ScrollView>
        <Text style={{...styles.text,textAlign:'left',marginHorizontal:16}}>
            Add User
        </Text>
        
        <View style={{justifyContent:'flex-start'}}>
           <View style={styles.child}>
             <Inp placeholder='Full Name'/>
           </View>
           <View style={styles.child}>
             <Inp placeholder='Phone Number'/>
           </View>
          
           <View style={styles.child}>
             <Inp placeholder='Email'/>
           </View>
           
           <View style={{...styles.child}}>
            
            
            <Inp placeholder='Role'/>
         
            </View>
            <View style={{...styles.child}}>
            
            
            <Inp placeholder='Clinic'/>
         
            </View>
           

           
           <View style={{...styles.child,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <Btn 
                label='Skip'/>
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

export default Adduser;