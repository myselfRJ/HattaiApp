import { useLinkProps } from '@react-navigation/native';
import { View,Text, StyleSheet, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, moderateScale, verticalScale } from '../screens/dim';

const DashHead=(props)=>{


    return (
        <View style={styles.main}>
            <Image 
            style={{height:verticalScale(87),width:horizontalScale(156)}} source={require('../resources/images/blattai.png')} />
            <Text style={styles.wlctxt}>
            Good Morning, {props.name}
            </Text>
            <Pressable onPress={()=>console.log('I am Doctor')}style={{flexDirection:'row',alignItems:'center',marginLeft:horizontalScale(40)}}>

            
            <Image  style={styles.avatar}source={{uri:props.url}}/>
            <Text style={styles.profilename}>{props.name}</Text>
            <Icon name='menu-down' size={24} color="#ffffff"></Icon>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        flexDirection:'row',
        width:horizontalScale(834),
        height:verticalScale(138),
        backgroundColor:'#4BA5FA',
        paddingHorizontal:horizontalScale(24),
        paddingVertical:verticalScale(24),
        alignItems:'center'
    },
    wlctxt:{
        fontSize:moderateScale(28),
        lineHeight:moderateScale(42),
        fontWeight:'700',
        color:"#fff"
    },
    avatar:{
        width:horizontalScale(32),
        height:horizontalScale(32),
        borderRadius:horizontalScale(32/2),
        marginRight:horizontalScale(8)
    },
    profilename:{
        fontSize:moderateScale(14),
        lineHeight:moderateScale(18),
        color:'#ffffff',
        fontWeight:'700',
        maxWidth:horizontalScale(120),
        flexWrap:'wrap'
        
    }
    
})

export default DashHead;