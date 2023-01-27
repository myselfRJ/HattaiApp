import {View,Text, StyleSheet,Image} from 'react-native';

import { horizontalScale, verticalScale ,moderateScale} from '../screens/dim';

const AppointTck=()=>{
    return(
        <View style={styles.main}>
            <View style={styles.token}>
                <Text>
                    Token
                </Text>
                <Text>
                    0001
                </Text>
            </View>
            <View>
                <View style={{paddingLeft:horizontalScale(100),
                    paddingVertical:verticalScale(16),
                    flexDirection:'row'}}>
                    <View 
                    >
                        <Image style={{width:horizontalScale(48),height:horizontalScale(48),borderRadius:horizontalScale(24)}}source={require('../resources/images/profile.jpg')} />

                    </View>
                    <View style={{marginLeft:horizontalScale(8),paddingTop:verticalScale(8)}}>

                    
                    <Text style={{fontSize:moderateScale(16),fontWeight:'700',color:'#000000'}}>Chatvakular</Text>
                    <Text style={{fontSize:moderateScale(10),fontWeight:'500'}}>Age 26 | F</Text>
                    <Text style={{width:360,fontSize:moderateScale(12),lineHeight:moderateScale(16),color:'#000000'}}>Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit. Cras et turpis 
                        metus.Quisque vestibulum molestie ipsum id sagittis. Quisque vestibulum molestie ipsum id sagittis.</Text>
                    </View>
                </View>   

            </View>

            <View style={{alignItems:'center',
                position:'absolute',
                bottom:0,
                right:0,
                justifyContent:'center',
                width:horizontalScale(72),
                height:verticalScale(32),
                backgroundColor:"#32BF40",
                borderColor:'#4BA5FA',
                borderWidth:0.5,
                borderTopLeftRadius:horizontalScale(32),
                borderBottomLeftRadius:horizontalScale(32)}}>
                        <Text style={{fontSize:moderateScale(14),fontWeight:'700',color:"#ffffff"}}>Paid</Text>
                    </View>
            <View style={{alignItems:'center',
                position:'absolute',
                top:0,
                right:0,
                paddingRight:8,
                justifyContent:'center',
                flexDirection:'row',
                
                height:verticalScale(32),
                borderColor:'#4BA5FA'}}>
                <View style={{alignItems:'center',
               
               justifyContent:'center',
               width:horizontalScale(72),
               height:verticalScale(16),
               backgroundColor:"#ffffff",
               borderColor:'#4BA5FA',
               borderWidth:0.5,
               marginRight:horizontalScale(8),
               borderRadius:horizontalScale(24)}} 
               onPress={() => console.log('Pressed')}>
                   <Text style={{fontSize:moderateScale(10)}}>Pending</Text>
                   </View>

                        <Text style={{fontSize:moderateScale(16),fontWeight:'700'}}>6:30pm - 7:00pm</Text>
                
                    </View>
         
        </View>
    )
}
const styles=StyleSheet.create({
    main:{
        position:'relative',
        width:horizontalScale(672),
        height:verticalScale(120),
        marginBottom:verticalScale(4),
        borderWidth:0.5,
        borderColor:'#4BA5FA',
        borderRadius:4,
        
    },
    token:{
        position:'absolute',
        top:0,
        left:0,
        width:horizontalScale(90),
        height:horizontalScale(90),
        backgroundColor:'#B9DAFA',
        borderBottomRightRadius:horizontalScale(90),
        padding:8

    }
})
export default AppointTck;