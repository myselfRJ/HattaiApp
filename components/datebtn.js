import { useLinkProps } from "@react-navigation/native";
import { StyleSheet, Pressable,Text } from "react-native";
import { Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, verticalScale, moderateScale } from "../screens/dim";

const Datebtn=(props)=>{
console.log(props.name,props.text,"btn date")
let Arr = props.timelist!==undefined&&props.timelist.length>0?props.timelist.map((a, i) => {
    console.log(a,"a")
    return (
        <Chip key={i}  mode="outlined" style={{height:30}} compact={true} onPress={() => console.log('Pressed')}>{a.toString().replace(",","-")}</Chip>
    )}):(<Text style={styles.text}>
        {props.text}
        </Text>)

    return (
        <Pressable   onPress={()=>{props.action();console.log("pressed")}} style={{...styles.bg,width:props.width?props.width: horizontalScale(480)}}
        >
           {props.mode==="add clinic page"?<>
            {Arr}
           </> :<Text style={styles.text}>
            {props.text}
            </Text>}
            <Icon key={props.name} name={props.name} size={verticalScale(40)} color='#4BA5FA'/>
            
        </Pressable>
    )
}

const styles=StyleSheet.create({
    bg:{    flexDirection:'row',
            height:verticalScale(78),
            borderRadius: 4,
            justifyContent:'space-between',
            alignItems:'center',
            fontSize: moderateScale(24),
            borderWidth:0.5,
            lineHeight:32,
            backgroundColor:'#ffff',
            paddingHorizontal:horizontalScale(16),
            borderColor: '#4BA5FA',
      
         
    },
    contentStyle:{
        height:verticalScale(78),
        width: horizontalScale(480),
    },
    labelStyle:{
        fontSize: moderateScale(24),
        lineHeight:32,
        fontWeight: 400,
        color: '#000',
    },
    text:{
        fontSize:moderateScale(24),
    }

})

export default Datebtn;