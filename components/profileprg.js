import React from 'react';
import {View,Text, StyleSheet} from 'react-native';

const Profileprg=()=>{

    return (
        <View style={styles.main}> 
        <View style={styles.prgcircle}>
            <Text>Fill Profile</Text>
            <View style={styles.circle}>  
            </View>

        </View>
        <View style={styles.prgcircle}>
            <Text>progress</Text>
        <View style={styles.broadline}>
                
                </View>
         
            
           

            </View>
            <View style={styles.prgcircle}>
            <Text>Add Clinic</Text>
        <View style={styles.circle}></View>

            </View>
            
            <View style={styles.prgcircle}>
            <Text>progress</Text>
        <View style={styles.broadline}>
                
                </View>
         
            
           

            </View>
            <View style={styles.prgcircle}>
            <Text>Add User</Text>
            <View style={styles.circle}></View>

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
        height:48,
        width:48,
        borderRadius:48/2,
        backgroundColor:'#4BA5FA',
        margin:4
    },
    broadline:{
        height:4,
        width:240,
        backgroundColor:'#4BA5FA',
        margin:4,
        borderRadius:2
    },

    prgcircle:{
        justifyContent:'center',
        alignItems:'center',
        height:72
    }
})
export default Profileprg;