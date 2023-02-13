import { View,Text,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale,verticalScale,moderateScale} from '../screens/dim';


const MedList=()=>{
    return(
        <View style={styles.main
           }>
        <Text style={styles.text}>Paracetamol 500mg AF 1-0-1 120</Text>
        <Icon  style={styles.icon}name='delete' size={moderateScale(24)}/>
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