import React, { useEffect, useState } from 'react';
import {StyleSheet, Pressable,Text} from 'react-native';
const DaySym=(props)=>{
    const [bg,setBg]=useState('#ffffff');
    const [bw,setBw]=useState(0.5);
    const [bcl,setBcl]=useState("#4BA5FA");
    const stylehandle=(bg,wd,bcl)=>{
        setBg(bg);
        setBw(wd);
        setBcl(bcl);

    }

    const selecthandle=()=>{
        var dayselect=props.daySelect;
        console.log("change appear",props.select)
    
            if(props.daySelect[props.id].select){
                dayselect[props.id].select=false;
                stylehandle('#ffffff',0.5,"#4BA5FA")
                props.setDay(dayselect);
                console.log("unselected",dayselect)
                
            }else{
                dayselect[props.id].select=true;
                stylehandle("#4BA5FA",0,null)
                props.setDay(dayselect);
                console.log("selected",dayselect);
            }

        }

    
    
    

    return (
        
         <Pressable onPress={selecthandle}style={{...styles.main,
                backgroundColor:bg,
                borderWidth:bw,
                borderColor:bcl}}>
            <Text>
                {props.day}
            </Text>
         </Pressable>
        
    )
}

const styles=StyleSheet.create({

    main:{
        width:40,
        height:40,
        borderRadius:40/2,
        justifyContent:'center',
        alignItems:'center',
        margin:8

    }
})
export default DaySym;