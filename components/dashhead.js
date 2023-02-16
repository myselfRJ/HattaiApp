import { useLinkProps } from '@react-navigation/native';
import { View,Text, StyleSheet, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, moderateScale, verticalScale } from '../screens/dim';

const DashHead=(props)=>{


    return (
        <View style={styles.main}>
            <Image 
            style={{position:'absolute',top:verticalScale(24),left:horizontalScale(16),height:verticalScale(65),width:horizontalScale(127)}} source={require('../resources/images/blattai.png')} />
            <Text style={styles.wlctxt}>
            Welcome, {props.name}
            </Text>
            <Pressable onPress={()=>console.log('I am Doctor')}style={{position:'absolute',top:verticalScale(48),right:horizontalScale(56),alignItems:'center',borderRadius:horizontalScale(160/2),marginLeft:horizontalScale(40)}}>

            
            <Image  style={styles.avatar}source={{uri:props.url}}/>
            {/* <Text style={styles.profilename}>{props.name}</Text>
            <Icon name='menu-down' size={24} color="#ffffff"></Icon> */}
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
        position:'absolute',
        zIndex:2,
        top:verticalScale(96),
        left:horizontalScale(100),
        fontSize:moderateScale(16),
        lineHeight:moderateScale(22),
        fontWeight:'600',
        color:"#fff"
    },
    avatar:{
       
        width:horizontalScale(160),
        height:horizontalScale(160),
        borderRadius:horizontalScale(160/2),
      
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