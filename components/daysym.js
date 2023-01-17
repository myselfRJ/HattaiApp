import React from 'react';
import {StyleSheet, View,Text} from 'react-native';
const DaySym=(props)=>{
    return (
        
         <View style={styles.main}>
            <Text>
                {props.day}
            </Text>
         </View>
        
    )
}

const styles=StyleSheet.create({

    main:{
        width:40,
        height:40,
        borderRadius:40/2,
        backgroundColor:"#4BA5FA",
        justifyContent:'center',
        alignItems:'center',
        margin:8

    }
})
export default DaySym;