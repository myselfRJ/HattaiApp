import {View,Text, StyleSheet,Image, Pressable,ImageBackground,FlatList} from 'react-native';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import { Chip } from 'react-native-paper';
import { useState } from 'react';
import { horizontalScale, verticalScale ,moderateScale} from '../screens/dim';
import Datebtn from './datebtn';
import DatePicker from 'react-native-date-picker';
import { GetApi } from '../api/postapi';
const PatienthistoryComponent=(props)=>{
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [medlist, setMedlist] = useState([]);
    console.log(props)
    const fetchMedData=(date2)=>{
        GetApi('patient/prescription/get/'+props["data"]["id"]+'/'+date2.toISOString().split('T')[0],true).then(
            function(response){
console.log(response.status,response.data[0])
setMedlist(response.data)
            }).catch(function(error){
                console.log(error,"patient serach error")
            })
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
                    minimumDate={new Date()}
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
            {medlist.length>0&&(<View>
            <View style={{marginTop:20,borderWidth:2,borderRadius:10,borderColor:global.themecolor,flexDirection:"row",justifyContent:"space-between"}}>
                <View>
                <Chip style={{width:150,margin:10}}>BP : {medlist[0]["bp"]}</Chip>
<Chip style={{width:150,margin:10}}>SPO2 : {medlist[0]["spo2"]}</Chip>
                </View>
                <View>
                <Chip style={{width:150,margin:10}}>TEMP : {medlist[0]["temp"]}</Chip>
<Chip style={{width:150,margin:10}}>PR : {medlist[0]["pr"]}</Chip>
                </View>
                <View>
                <Chip style={{width:150,margin:10}}>LMP : {medlist[0]["lmp"]}</Chip>
<Chip style={{width:150,margin:10}}>EDD : {medlist[0]["edd"]}</Chip>
                </View>
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