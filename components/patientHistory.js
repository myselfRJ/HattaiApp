import {View,Text, StyleSheet,Image, Pressable,ImageBackground,FlatList} from 'react-native';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import { Chip ,Divider} from 'react-native-paper';
import { useState } from 'react';
import { horizontalScale, verticalScale ,moderateScale} from '../screens/dim';
import Datebtn from './datebtn';
import DatePicker from 'react-native-date-picker';
import { GetApi } from '../api/postapi';
const PatienthistoryComponent=(props)=>{
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [medlist, setMedlist] = useState([]);
    console.log(props,"props in med hist")
    const fetchMedData=(date2)=>{
        GetApi('patient/prescription/get/'+props["data"]["id"]+'/'+date2.toISOString().split('T')[0],true).then(
            function(response){
console.log(response.status,response.data[0])
setMedlist(response.data)
            }).catch(function(error){
                console.log(error,"patient search error")
            })
    }
const renderMedicationList=(item)=>{
    console.log(item,"item inside")
    return(
        <View style={{flexDirection:"row"}}>
            <Chip style={{width:150,margin:10,backgroundColor:"#ffcb9a"}}>{item.item["medicine"]}</Chip>
            <Chip style={{width:150,margin:10,backgroundColor:"#f5e6cc"}}>Dose : {item.item["dose"]}</Chip>
            <Chip style={{width:180,margin:10,backgroundColor:"#f5e6cc"}}>{item.item["frequency"]} | {item.item["time"]}</Chip>
            <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-around"}}>
            {item.item["duration"].map((value, index) => {
            return (<View key={index} style={{borderRadius:12,backgroundColor:value?global.themecolor:"#ee4c7c",width:24,height:24,marginHorizontal:4}}></View>)})}
            </View>

        </View>
    )
}
    return(
        <View>
            <Datebtn action={() => setOpen(!open)}
                        name="calendar"
                        text={date.toLocaleDateString()}
                        width={200}/>
            <DatePicker
                    mode="date"
                    modal
                    textColor={global.themecolor}
                    maximumDate={new Date()}
                    open={open}
                    date={date}
                    onConfirm={date1 => {
                        setOpen(false);
                        setDate(date1);
                        fetchMedData(date1)
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                    />
            {medlist.length>0&&(<View style={{padding:2,marginVertical:10}}>
                <Text  style={{marginHorizontal:10 ,fontSize:18,fontWeight:500,color:"black"}}>Vitals :</Text>
            <View style={{marginTop:10,flexDirection:"row",justifyContent:"space-between"}}>
                <View>
                <Chip style={{width:200,margin:10}}>BP : {medlist[0]["bp"]} mmHg</Chip>
<Chip style={{width:200,margin:10}}>SPO2 : {medlist[0]["spo2"]} %age</Chip>
                </View>
                <View>
                <Chip style={{width:160,margin:10}}>TEMP : {medlist[0]["temp"]} °C</Chip>
<Chip style={{width:160,margin:10}}>PR : {medlist[0]["pr"]}</Chip>
                </View>
                <View>
                <Chip style={{width:200,margin:10}}>LMP : {medlist[0]["lmp"]}</Chip>
<Chip style={{width:200,margin:10}}>EDD : {medlist[0]["edd"]}</Chip>
                </View>
            </View>
            <Divider style={{borderColor:global.themecolor,marginVertical:20}}/>
            <View>
            <Text  style={{marginHorizontal:10 ,fontSize:18,fontWeight:500,color:"black"}}>Medication :</Text>
            <FlatList
          data={medlist[0]["medication"]}
          renderItem={renderMedicationList}
          scrollEnabled={true}
          keyExtractor={(item, index) => index}
         style={{marginTop:10}}
         contentContainerStyle={{justifyContent:"space-between"}}
        />
            </View>
            <Divider style={{borderColor:global.themecolor,marginVertical:20}}/>
            <View>
            <Text  style={{marginHorizontal:10 ,fontSize:18,fontWeight:500,color:"black"}}>Diagnosis / Clinical Notes :</Text>
            <Text  numberOfLines={10} style={{margin:12 ,fontSize:15,fontWeight:400,color:"black"}}>{medlist[0]["diagnosis"]}</Text>
            </View>
            </View>)}
        </View>
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
export default PatienthistoryComponent;