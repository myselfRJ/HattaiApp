import React,{useEffect, useState} from 'react';
import { View,Text } from 'react-native';
import {Canvas,Image,Path,useCanvasRef} from '@shopify/react-native-skia'
import {Gesture,GestureDetector,GestureHandlerRootView} from 'react-native-gesture-handler';


const PrAccount=()=>{

    const [path,setPath]=useState([]);
    const imgref=useCanvasRef();

    

    const pan=Gesture.Pan()
    .onStart((g)=>{
        setPath([...path,`M ${g.x} ${g.y}`]

        )
    
    })
    .onUpdate((g)=>{
        setPath([...path,`L ${g.x} ${g.y}`])

    })
    .onEnd((g)=>{
        const image=imgref.current?.makeImageSnapshot();
        if(image){
            const bytes=image.encodeToBytes();
            console.log(bytes)
            setPath(()=>[])

        }
     
        
    })
    .minDistance(1)

    return(
        <GestureHandlerRootView style={{flex:1,borderWidth:10}}>
            <GestureDetector gesture={pan}>

        <View style={{flex:1,borderWidth:10,backgroundColor:"yellow"}}>
        <Canvas style={{flex:1}} ref={imgref}>
        <Path 
                 
                    path={path.join(" ")}
                    strokeWidth={5}
                    style="stroke"
                    color='#000000' 
        />

        </Canvas>
        </View>
        </GestureDetector>

</GestureHandlerRootView>
    )
}

export default PrAccount;