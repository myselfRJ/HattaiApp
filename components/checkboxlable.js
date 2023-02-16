import React,{useState} from 'react';
import { View,Text,StyleSheet } from 'react-native';
import {Checkbox  } from 'react-native-paper';
import { moderateScale } from '../screens/dim';

const CheckBoxLabel=(props)=>{
    const [checked, setChecked] = useState(false);
    const handlecheck=()=>{

        props.action();
    }
    return(
        <View style={styles.main}>
            <Checkbox style={styles.check}
            onPress={props.action}
            status={checked ? 'checked' : 'unchecked'}
            />
            <Text style={styles.label}>
                {props.label}
            </Text>
        </View>
    )
}

const styles=StyleSheet.create({
    main:{
        flexDirection:'row',
        alignItems:'center'

    },
    check:{
        
    },
    label:{
        fontSize:moderateScale(12),
        lineHeight:moderateScale(16),
        fontWeight:400
    }
})

export default CheckBoxLabel;