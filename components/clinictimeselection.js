import { ScrollView, View,Text,FlatList,TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';

import React,{useState,useEffect} from 'react';
import Datebtn from './datebtn';
import TimeBtn from './timebtn';
const ClinicTiming=(props)=>{
    const [time, setTime] = useState("start");
    const [open, setOpen] = useState(false);
    const [time2, setTime2] = useState("end");
    const [date2, setDate2] = useState(new Date());
    const [open2, setOpen2] = useState(false);
    const [timelist, setTimelist] = useState([["start","end"]]);
    const [reflect, setreflect] = useState(0);
    useEffect(()=>{
        console.log('Hello world2',timelist)
    
      },[timelist,reflect])
    const finalDone=()=>{
        console.log("final")
    }
    const sendTime=(data)=>{
        console.log(data)
    }
const starttime=(val,i)=>{
    const data = timelist
    data[i][0]=val.toLocaleTimeString()
setTimelist(data)
setreflect(reflect+1)
}
const endtime=(val,i)=>{
    const data = timelist
    data[i][1]=val.toLocaleTimeString()
setTimelist(data)
setreflect(reflect+1)
}
const additem = ()=>{
    const data = timelist
    data.push(["start","end"])
    setTimelist(data)
}
    let Arr = timelist.map((a, i) => {
        return  <View key={i} style={{height:200,flexDirection:"column"}}>
        <View style={{height:200,flexDirection:"row"}}>
            <View style={{width:"50%",backgroundColor:"white",height:200,flexDirection:"column"}}>
                <Text style={{fontWeight:"bold",fontSize:18,color:'grey',marginVertical:10}}>From</Text>
                <Datebtn name='clock-plus-outline' text={a[0]} width={"95%"}
action={()=>{setOpen(!open)}}/>
            </View>
            <View style={{width:"50%",height:200,flexDirection:"column"}}>
            <Text style={{fontWeight:"bold",fontSize:18,color:'grey',marginVertical:10}}>To</Text>
                <Datebtn name='clock-plus-outline' text={a[1]} width={"95%"}
action={()=>{setOpen2(!open2)}}/>
            </View>
        </View>
        <TimeBtn open={open} setOpen={setOpen} sendTime={starttime} index={i} />
        <TimeBtn open={open2} setOpen={setOpen2} sendTime={endtime} index={i} />
</View>                            
      }) 

    return(
        <View style={{width:"80%",alignItems:"center"}}>
            <Text style={{fontWeight:"bold",fontSize:24,color:'black'}}>
                Choose Timings
            </Text>
            <ScrollView>
            {Arr}
            </ScrollView>
            <TouchableOpacity onPress={additem} style={{borderWidth:1,width:"25%",justifyContent:"center",alignItems:"center",backgroundColor:global.themecolor}}>
<View ><Text>Add Slot</Text></View>
            </TouchableOpacity>
        </View>
    )
}
export default ClinicTiming;