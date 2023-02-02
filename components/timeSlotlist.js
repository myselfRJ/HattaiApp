import React from 'react';
import { View,Text,StyleSheet,ScrollView,TouchableHighlight} from 'react-native';
import { Searchbar, Title } from 'react-native-paper';
import { horizontalScale, moderateScale, verticalScale } from '../screens/dim';

const TimeSlotList=(props)=>{

    const setTime=(value)=>{
        console.log(value,"time val")
        props.settimeSlot(value)
        props.hideModal()
    }
console.log(props.timeslotList,"lkist")


    return (
        <View style={styles.main}>
            <Text style={styles.texthead}>
            Choose Clinic

            </Text>
            <View style={styles.searchbar}>
            <Searchbar  style={{backgroundColor:'#ffffff'}}/>

            </View>
            
            <ScrollView>
                {
                    props.timeslotList.map((value,index)=>{
                        return(
                            <TouchableHighlight key={index}
                            underlayColor='#85C1FA'
                            style={styles.clinic} onPress={()=>setTime(value)}>
                            <Text style={styles.clinictext}>
                            {value}
        
                            </Text>
                            
                            
                        </TouchableHighlight>

                        )
                    })
                }
               
             
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    main:{
        width:horizontalScale(480)
    },
    texthead:{
        fontSize:moderateScale(24),
        fontWeight:'700',
        color:'#000000',
        paddingVertical:verticalScale(16)
    },
    clinic:{
        width:'100%',
        height:verticalScale(56),
        justifyContent:'center', paddingHorizontal:horizontalScale(16),
        paddingVertical:verticalScale(8),
        marginBottom:verticalScale(4),
        borderWidth:0.5,
        borderRadius:4,
        borderColor:'#4BA5FA'


    },
    clinictext:{
        fontSize:moderateScale(14),
        fontWeight:'500',
        color:'#000000'
    },
    searchbar:{
        paddingVertical:verticalScale(16)

    }
})

export default TimeSlotList;

