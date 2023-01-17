import React from 'react';
import {View,Text,ScrollView} from 'react-native';
import Btn from './btn';
import Inp from './inp';
import styles from './signupss';

const Fillprofile=()=>{

    return (
        <View style={{margin:16}}>
        <ScrollView>
        <Text style={{...styles.text,textAlign:'left',marginHorizontal:16}}>
            Fill Profile
        </Text>
        <View style={styles.img}>
             
           </View>
        <View style={{justifyContent:'flex-start'}}>
           <View style={styles.child}>
             <Inp placeholder='Name'/>
           </View>
           <View style={styles.child}>
             <Inp placeholder='Gender'/>
           </View>
           <View style={styles.child}>
             <Inp placeholder='DOB'/>
           </View>
           
           <View style={{...styles.child}}>
            <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:'flex-end'}}>

            
            <Inp placeholder='Medical Number'/>
            <Btn label="Upload Doc"/>
            </View>
            </View>

           <View style={styles.child}>
             <Inp placeholder='Speciality'/>
           </View>
           <View style={styles.child}>
             <Inp placeholder='Experience in years'/>
           </View>
           <View style={{...styles.child,justifyContent:'center',alignItems:'center'}}>
                <Btn 
                label='Save'/>
           </View>
          
        </View>

        </ScrollView>
        </View>
    )
}

export default Fillprofile;