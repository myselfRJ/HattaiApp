import {View,Text, StyleSheet,Image, Pressable,ImageBackground} from 'react-native';

import { horizontalScale, verticalScale ,moderateScale} from '../screens/dim';

const SearchPatientComponent=(props)=>{
    console.log(props)
    const calculateAge = (birthday) => {
        const ageDifMs = Date.now() - new Date(birthday).getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
    return(
        <ImageBackground style={styles.main} source={require('../resources/images/bg.jpeg')} resizeMode="cover">
        <Pressable  onPress={()=>{props.action(props.item["item"])}}>
            
            <View style={styles.token}>
                <Text>
                    Patient
                </Text>
                <Text>
                   {("00"+props.item.item["id"])}
                </Text>
            </View>
            <View >
                <View style={{paddingLeft:horizontalScale(100),
                    paddingVertical:verticalScale(16),
                    flexDirection:'row'}}>
                    <View style={{justifyContent:"center"}}>
                        <Image style={{width:horizontalScale(48),height:horizontalScale(48),borderRadius:horizontalScale(24)}}
                        source={require('../resources/images/healthcare.png')} />

                    </View>
                    <View style={{marginLeft:horizontalScale(8),paddingTop:verticalScale(8)}}>

                    
                    <Text style={styles.name}>{props.item.item["name"]}</Text>
                    <Text style={styles.info}>Age : {calculateAge(props.item.item["birthDate"])}  Gender : {props.item.item["gender"].toUpperCase()}</Text>
                    <Text style={styles.diagnosis}>{props.item.item["phone_number"]}</Text>
                    </View>
                </View>   

            </View>

         
        </Pressable>
        <Text style={styles.name}>   FHIR ID : {props.item.item["fhir_patient_id"].slice(0,18)}</Text>
        </ImageBackground>
    )
}
const styles=StyleSheet.create({
    main:{
        position:'relative',
        width:horizontalScale(334),
        height:verticalScale(150),
        marginBottom:verticalScale(4),
        marginHorizontal:verticalScale(4),
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

    },
    paid:{
        alignItems:'center',
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
                borderBottomLeftRadius:horizontalScale(32)

    },
    due:{
        alignItems:'center',
                position:'absolute',
                bottom:0,
                right:0,
                justifyContent:'center',
                width:horizontalScale(72),
                height:verticalScale(32),
                backgroundColor:"#ffd966",
                borderColor:'#4BA5FA',
                borderWidth:0.5,
                borderTopLeftRadius:horizontalScale(32),
                borderBottomLeftRadius:horizontalScale(32)

    },
    paidtxt:{
        fontSize:moderateScale(14),
        fontWeight:'700',
        color:"#ffffff"

    },
    penview:{
        alignItems:'center',
        position:'absolute',
        top:0,
        right:0,
        paddingRight:horizontalScale(8),
        justifyContent:'center',
        flexDirection:'row',
        
        height:verticalScale(32),
        borderColor:'#4BA5FA'
    },
    peninner:{
        alignItems:'center',
    justifyContent:'center',
    width:horizontalScale(72),
    height:verticalScale(16),
    backgroundColor:"#ffffff",
    borderColor:'#4BA5FA',
    borderWidth:0.5,
    marginRight:horizontalScale(8),
    borderRadius:horizontalScale(24)
} ,
timetxt:{
    fontSize:moderateScale(16),
    fontWeight:'700'
},
name:{
    fontSize:moderateScale(16),
    fontWeight:'700',
    color:'white'
},
info:{fontSize:moderateScale(10),
    fontWeight:'500',
    color:'white',marginVertical:10,
},
diagnosis:{width:360,
    fontSize:moderateScale(12),
    lineHeight:moderateScale(16),
    color:'white'}
    
})
export default SearchPatientComponent;