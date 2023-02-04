import {View,Text, StyleSheet,Image, Pressable} from 'react-native';

import { horizontalScale, verticalScale ,moderateScale} from '../screens/dim';

const AppointTck=(props)=>{
    const calculateAge = (birthday) => {
        const ageDifMs = Date.now() - new Date(birthday).getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
    return(
        <Pressable style={styles.main} onPress={()=>{console.log("pressed prt");
        props.item.item["is_complete"]?console.log("done"):props.action.navigate("Prescription",{data:props.item.item,new:false})}}>
            <View style={styles.token}>
                <Text>
                    Token
                </Text>
                <Text>
                   {("00"+props.index)}
                </Text>
            </View>
            <View >
                <View style={{paddingLeft:horizontalScale(100),
                    paddingVertical:verticalScale(16),
                    flexDirection:'row'}}>
                    <View 
                    >
                        <Image style={{width:horizontalScale(48),height:horizontalScale(48),borderRadius:horizontalScale(24)}}
                        source={props.item.item["patient_data"]["photo"].length>0&&props.item.item["patient_data"]["photo"][0]["url"]?{uri: `${props.item.item["patient_data"]["photo"][0]["url"]}`}:require('../resources/images/healthcare.png')} />

                    </View>
                    <View style={{marginLeft:horizontalScale(8),paddingTop:verticalScale(8)}}>

                    
                    <Text style={styles.name}>{props.item.item["patient_data"]["name"]}</Text>
                    <Text style={styles.info}>Age {calculateAge(props.item.item["patient_data"]["birthDate"])} | {props.item.item["patient_data"]["gender"]==="male"?"M": props.item.item["patient_data"]["gender"]==="female"?"F":"UNK"}</Text>
                    <Text style={styles.diagnosis}>{props.item.item["serviceCategory"]}</Text>
                    </View>
                </View>   

            </View>

            <View style={props.item.item["is_paid"]?styles.paid:styles.due}>
                        <Text style={styles.paidtxt}>{props.item.item["is_paid"]?"Paid":"Due"}</Text>
                    </View>
            <View style={styles.penview}>
                <View style={{...styles.peninner , backgroundColor:props.item.item["is_complete"]?"#4BA5FA":"white"}} onPress={() => console.log('Pressed')}>
                   <Text color={"red"} style={{fontSize:moderateScale(10),color:props.item.item["is_complete"]?"white":"grey"}}>{props.item.item["is_complete"]?"Completed":"Pending"}</Text>
                   </View>

                        <Text style={styles.timetxt}>{props.item.item["timeslot"][0].slice(11,16)} - {props.item.item["timeslot"][1].slice(11,16)}</Text>
                
                    </View>
         
        </Pressable>
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
    complete:{
        alignItems:'center',
                position:'absolute',
                bottom:0,
                right:0,
                justifyContent:'center',
                width:horizontalScale(72),
                height:verticalScale(32),
                backgroundColor:"#4BA5FA",
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
    color:'#000000'
},
info:{fontSize:moderateScale(10),
    fontWeight:'500'
},
diagnosis:{width:360,
    fontSize:moderateScale(12),
    lineHeight:moderateScale(16),
    color:'#000000'}
    
})
export default AppointTck;