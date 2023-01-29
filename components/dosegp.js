import React,{useState} from 'react';
import {View, Text,StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Inp from './inp';
const DoseGroup=(props)=>{
    const DoseList=['600mg','1000mg','5000mg']
    const [checked, setChecked] = useState();

    const selectdose=(value)=>{
        setChecked(value)
        var medi=[...props.medication];
        medi[props.index].dose=value;
        props.setMedication([...medi])
    }

    return(

        <View>
        <RadioButton.Group>
            {
                DoseList.map((value,index)=>{
                    return(
                        <View key={index} style={{flexDirection:'row',alignItems:'center'}}>
                        <RadioButton status={checked==value?'checked':'unchecked'}onPress={()=>selectdose(value)}/>
                            <Text>
                                {value}
                            </Text>
                          
                        </View>
                    )

                })
            }
               
            
            
              </RadioButton.Group>
              
              <Inp placeholder='others'textAlign='left' height={32} width={120} fontSize={12}/>
              </View>

    )
}

const styles=StyleSheet.create({
   
})

export default DoseGroup;