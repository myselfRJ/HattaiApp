import { View,Text,StyleSheet } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../screens/dim';
const StatusTck=(props)=>{
   

    return(
        <View style={styles.apn}>
        <Text style={styles.stxt}>{props.txt}</Text>
        <Text style={styles.nmtxt}>{props.num}</Text>

    </View>

    )
}
const styles=StyleSheet.create({
    apn:{
        width:horizontalScale(170),
        height:verticalScale(96),
        backgroundColor:'#4BA5FA',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        marginRight:horizontalScale(24)
    },
    stxt:{
        fontSize:moderateScale(14),
        lineHeight:moderateScale(18),
        fontWeight:'500',
        color:'#ffffff'

    },
    nmtxt:{
        fontSize:moderateScale(32),
        lineHeight:moderateScale(42),
        fontWeight:'700',
        color:'#ffffff'
    }
})
export default StatusTck;