import { View,Text,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale,verticalScale,moderateScale} from '../screens/dim';


const MedList=(props)=>{
    return(
        <View style={styles.main
           }>
        <Text style={styles.text}>{props.medicine} {props.dose} {props.foodtime}  {props.fre} {props.dur[0]?1:0}-{props.dur[1]?1:0}-{props.dur[2]?1:0}  {props.quantity} </Text>
        <Icon  onPress={props.remove} style={styles.icon}name='delete' size={moderateScale(24)}/>
      </View>
    )
}

const styles=StyleSheet.create({
    main: {flexDirection:'row',
    alignItems:'center',
    
    paddingHorizontal:horizontalScale(8),
    paddingVertical:verticalScale(8)},
    text:{
        fontSize:moderateScale(14),
        fontWeight:600,
        color:'#000000'},
    icon:{marginLeft:horizontalScale(8)}
})

export default MedList;