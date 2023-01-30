import { ScrollView, View,Text,FlatList,TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';

import React,{useState,useEffect} from 'react';
import Datebtn from './datebtn';
import TimeBtn from './timebtn';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Btn from './btn';
const ClinicTiming=(props)=>{
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [timelist, setTimelist] = useState([["start","end"]]);
    const [timelistO, setTimelistO] = useState([["start","end"]]);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [timelist2, setTimelist2] = useState([["start","end"]]);
    const [timelist2O, setTimelist2O] = useState([["start","end"]]);
    const [reflect, setreflect] = useState(0);
    const [indexData,setIndexData] = useState(0)
    const [indexData2,setIndexData2] = useState(0)
    const [checked, setChecked] = React.useState(false);
    useEffect(()=>{
        console.log('Hello world2',timelist,timelist2)
      },[indexData,indexData2,reflect,timelist,timelist2])
      useEffect(()=>{
        {props.parentclincTiming["weekday"]!==undefined&&setTimelist(props.parentclincTiming["weekday"])}
        {props.parentclincTiming["weekend"]!==undefined&&setTimelist2(props.parentclincTiming["weekend"])}
      },[])
    const finalDone=()=>{
        data=timelist
        const arrayWithout1 = data.filter(function (item) {
            return JSON.stringify(item) !== JSON.stringify(["start","end"]);
        });
        data2=timelist2
        const arrayWithout2 = data2.filter(function (item) {
            return JSON.stringify(item) !== JSON.stringify(["start","end"]);;
        });
        props.onTimeSelect(arrayWithout1,arrayWithout2)
       props.hideModal()
    }
const starttime=(val,i)=>{
    const data = timelist
    console.log(val)
    data[i][0]=val
setTimelist(data)
setreflect(reflect+1)
}
const endtime=(val,i)=>{
    const data = timelist
    data[i][1]=val
setTimelist(data)
setreflect(reflect+1)
}
const additem = ()=>{
    const data = timelist
    data.push(["start","end"])
    setTimelist(data)
    setreflect(reflect+1)
   // setIndexData(indexData+1)
}
const deleteSlot = (i)=>{
    const data = timelist
    data.splice(i,1)
    setTimelist(data)
   setIndexData(i)
}
const starttime2=(val,i)=>{
    const data = timelist2
    data[i][0]=val
setTimelist2(data)
setreflect(reflect+1)
}
const endtime2=(val,i)=>{
    const data = timelist2
    data[i][1]=val
setTimelist2(data)
setreflect(reflect+1)
}
const additem2 = ()=>{
    const data = timelist2
    data.push(["start","end"])
    setTimelist2(data)
    setreflect(reflect+1)
   // setIndexData2(indexData2+1)
}
const deleteSlot2 = (i)=>{
    const data = timelist2
    data.splice(i,1)
    setTimelist2(data)
   setIndexData2(i)
}
    let Arr = timelist.map((a, i) => {
        return  <View key={i} style={{flexDirection:"column",paddingBottom:20}}>
        <View style={{flexDirection:"row"}}>
            <View style={{width:"48%",backgroundColor:"white",flexDirection:"column"}}>
                <Text style={{fontWeight:"bold",fontSize:18,color:'grey',marginVertical:10}}>From</Text>
                <Datebtn name='clock-plus-outline' text={a[0]} width={"95%"}
action={()=>{setIndexData(i);setOpen(!open)}}/>
            </View>
            <View style={{width:"48%",flexDirection:"column"}}>
            <Text style={{fontWeight:"bold",fontSize:18,color:'grey',marginVertical:10}}>To</Text>
                <Datebtn name='clock-plus-outline' text={a[1]} width={"95%"}
action={()=>{setIndexData(i);setOpen2(!open2)}}/>
            </View>
            
            <Icon onPress={()=>{deleteSlot(i)}} name="delete" size={32} color="red" style={{position:"absolute",bottom:0,right:0}} />
        </View>
</View>
      }) 
      let Arr2 = timelist2.map((a, i) => {
        return  <View key={i} style={{flexDirection:"column",paddingBottom:20,marginBottom:10}}>
        <View style={{flexDirection:"row"}}>
            <View style={{width:"48%",backgroundColor:"white",flexDirection:"column"}}>
                <Text style={{fontWeight:"bold",fontSize:18,color:'grey',marginVertical:10}}>From</Text>
                <Datebtn name='clock-plus-outline' text={a[0]} width={"95%"}
action={()=>{setOpen3(!open3)}}/>
            </View>
            <View style={{width:"48%",flexDirection:"column"}}>
            <Text style={{fontWeight:"bold",fontSize:18,color:'grey',marginVertical:10}}>To</Text>
                <Datebtn name='clock-plus-outline' text={a[1]} width={"95%"}
action={()=>{setOpen4(!open4)}}/>
            </View>
            
            <Icon onPress={()=>{deleteSlot2(i)}} name="delete" size={32} color="red" style={{position:"absolute",bottom:0,right:0}} />
        </View>
</View>
      }) 
    return(
        <View style={{width:"80%",alignItems:"center"}}>
            <Text style={{fontWeight:"bold",fontSize:24,color:'black'}}>
                Choose Timings
            </Text>
            <ScrollView>
            {Arr}
            
            <Btn label={"Add more Slots"} action={additem} />
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",marginVertical:10}}><Checkbox
      status={checked ? 'checked' : 'unchecked'}
      color={global.themecolor}
      onPress={() => {
        setChecked(!checked);;
      }}
    />
    <Text>Saturday and Sunday different Timings.</Text>
    </View>
    {checked&&<><>{Arr2}</><Btn label={"Add more Slots"} action={additem2} /></>}
    </ScrollView>
            <TimeBtn open={open} setOpen={setOpen} sendTime={starttime} index={indexData} />
        <TimeBtn open={open2} setOpen={setOpen2} sendTime={endtime} index={indexData} />
        <TimeBtn open={open3} setOpen={setOpen3} sendTime={starttime2} index={indexData2} />
        <TimeBtn open={open4} setOpen={setOpen4} sendTime={endtime2} index={indexData2} />
        <Btn label ={"Done"} action={finalDone}
        BtnText={{fontSize:12,lineHeight:32}}
        contentstyle={{height:40,width:100}}
        BtnBG={{position:"absolute",top:0,right:0,width:100,height:40,backgroundColor:global.themecolor,borderRadius:5,justifyContent:"center",alignItems:"center"}}/>
        </View>
    )
}
export default ClinicTiming;