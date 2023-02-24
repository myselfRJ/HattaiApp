import {View,Text, StyleSheet,Image, Pressable} from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

import { useDispatch } from 'react-redux';
import {currentApn} from '../redux/apnslice';

import { horizontalScale, verticalScale ,moderateScale} from '../screens/dim';

const AppointTck=(props)=>{
    const dispatch=useDispatch()

    const loadData=()=>{
        dispatch(currentApn(props.item.item))
        props.action.navigate("Prescription")

    }
    const calculateAge = (birthday) => {
        const ageDifMs = Date.now() - new Date(birthday).getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
    return(
        <Pressable style={styles.main} onPress={()=>{console.log("pressed prt");
        props.item.item["is_complete"]?console.log("done"):loadData()}}>
            {/* <View style={styles.token}>
                <Text>
                    Token
                </Text>
                <Text>
                   {("00"+props.index)}
                </Text>
            </View> */}
            
                <View style={{
                    flexDirection:'row',alignItems:'center'}}>
                    <View 
                    >
                        <Image style={{width:horizontalScale(96),height:horizontalScale(96),borderRadius:horizontalScale(96/2)}}
                        source={props.item.item["patient_data"]["photo"].length>0&&props.item.item["patient_data"]["photo"][0]["url"]?{uri: `${props.item.item["patient_data"]["photo"][0]["url"]}`}:require('../resources/images/profile.jpg')} />

                    </View>
                    <View style={{marginLeft:horizontalScale(8)}}>

                    
                    <Text style={styles.name}>{props.item.item["patient_data"]["name"]}</Text>
                    <Text style={styles.info}>Age {calculateAge(props.item.item["patient_data"]["birthDate"])} | {props.item.item["patient_data"]["gender"]==="male"?"M": props.item.item["patient_data"]["gender"]==="female"?"F":"UNK"}</Text>
                    <Text style={styles.diagnosis}>{props.item.item["serviceCategory"]}</Text>
                    </View>
                </View>   
                <View style={{width:0.5,backgroundColor:'#E0F0FF'}}></View>

                <View style={{justifyContent:'center'}}>
                    <Text style={styles.timetxt}>Token:</Text>
                    <Text style={styles.timetxt}>Time:</Text>
                    <Text style={styles.timetxt}>Status:</Text>
                    <Text style={styles.timetxt}>Fee:</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={{...styles.timetxt,fontSize:moderateScale(12),fontWeight: 600,color:"black"}}>{("00"+props.index)}</Text>
                    <Text style={{...styles.timetxt,fontSize:moderateScale(12),fontWeight: 600,color:"black"}}>{props.item.item["timeslot"][0].slice(11,16)} - {props.item.item["timeslot"][1].slice(11,16)}</Text>
                    {/* <View style={{...styles.peninner , backgroundColor:props.item.item["is_complete"]?"#4BA5FA":"white"}} onPress={() => console.log('Pressed')}>
                  
                   </View> */}
                   <Text color={"red"} style={{...styles.timetxt,fontSize:moderateScale(12),fontWeight: 600,color:props.item.item["is_complete"]?"green":"#FEBA4B"}}>{props.item.item["is_complete"]?"Completed":"Pending"}</Text>
                    
                   {/* <View style={props.item.item["is_paid"]?styles.paid:styles.due}>
                       
                    </View> */}
                    <Text style={{...styles.timetxt,fontSize:moderateScale(12),fontWeight: 600,color:props.item.item["is_paid"]?"green":"#FEBA4B"}}>{props.item.item["is_paid"]?"Paid":"Due"}</Text>
                </View>
                <View>
                    <Icon name='dots-horizontal' size={24} color={global.themecolor}/>
                  
                </View>
               

           

            {/* <View style={props.item.item["is_paid"]?styles.paid:styles.due}>
                        <Text style={styles.paidtxt}>{props.item.item["is_paid"]?"Paid":"Due"}</Text>
                    </View>
            <View style={styles.penview}>
                <View style={{...styles.peninner , backgroundColor:props.item.item["is_complete"]?"#4BA5FA":"white"}} onPress={() => console.log('Pressed')}>
                   <Text color={"red"} style={{fontSize:moderateScale(10),color:props.item.item["is_complete"]?"white":"grey"}}>{props.item.item["is_complete"]?"Completed":"Pending"}</Text>
                   </View>

                        <Text style={styles.timetxt}>{props.item.item["timeslot"][0].slice(11,16)} - {props.item.item["timeslot"][1].slice(11,16)}</Text>
                
                    </View> */}
         
        </Pressable>
    )
}
const styles=StyleSheet.create({
    main:{
        position:'relative',
        flexDirection:'row',
        width:horizontalScale(672),
        height:verticalScale(120),
        // marginBottom:verticalScale(8),
        paddingHorizontal:horizontalScale(12),
        paddingVertical:verticalScale(12),
        backgroundColor:'#ffffff',
        // alignItems:'center',
        justifyContent:'space-between',
        // borderWidth:0.5,
        // borderColor:'#4BA5FA',
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
        
             
                paddingHorizontal:horizontalScale(2),
                paddingVertical:verticalScale(2),
                backgroundColor:"#32BF40",
                borderColor:'#4BA5FA',
                flexWrap:"wrap",
                borderWidth:1
                // borderWidth:0.5,
             

    },
    due:{
               
                // paddingHorizontal:horizontalScale(4),
                // paddingVertical:verticalScale(4),
                marginVertical:verticalScale(4),
                backgroundColor:"#ffd966",
                borderColor:'#4BA5FA',
                // borderWidth:0.5,
                borderTopLeftRadius:horizontalScale(2),
                borderBottomLeftRadius:horizontalScale(2),
                borderWidth:1

    },
    complete:{
        alignItems:'center',
                // position:'absolute',
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
        
        fontSize: moderateScale(10),
        fontWeight: 600,
    
        

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
   
    backgroundColor:"#ffffff",
    borderColor:'#4BA5FA',
    borderWidth:0.5,
       borderRadius:horizontalScale(24)
} ,
timetxt:{
paddingVertical:verticalScale(4)  ,
fontSize: moderateScale(10),
fontWeight: 400,
lineHeight: 16,


},
name:{
    fontSize:moderateScale(16),
    fontWeight:'700',
    color:'#000000'
},
info:{fontSize:moderateScale(12),
    fontWeight:'400',
    color:'#948D8D'
},
diagnosis:{
    minWidth:horizontalScale(240),
    fontSize:moderateScale(12),
    lineHeight:moderateScale(16),
    color:'#000000'}
    
})
export default AppointTck;