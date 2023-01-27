import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, moderateScale, verticalScale } from '../screens/dim';
import Btn from './btn';

const Setup=(props)=>{

    return(
        <View style={styles.main}>
            <View style={styles.iconstyle}>
                <Icon name='check' size={40} color='#fff'/>
            </View>
            <Text style={styles.successtext}> Account setup Successfully</Text>
            <Btn label='Done' />
        </View>
    )
}
const styles=StyleSheet.create({
    main:{
        marginTop:verticalScale(180),
        alignItems:'center'
    },
    iconstyle:{
        width:horizontalScale(120),
        height :horizontalScale(120),
        justifyContent:'center',
        borderRadius:horizontalScale(60),
        alignItems:'center',
        backgroundColor:'#158F22'
    },
    successtext:{
        fontWeight:'700',
        fontSize:moderateScale(32),
        lineHeight:moderateScale(42),
        marginVertical:verticalScale(24)
    }
})
export default Setup;