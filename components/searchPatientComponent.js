import {View,Text, StyleSheet,Image, Pressable,ImageBackground} from 'react-native';
import { Divider } from 'react-native-paper';

import { horizontalScale, verticalScale ,moderateScale} from '../screens/dim';
import Btn from './btn';

const SearchPatientComponent=(props)=>{
    console.log(props)
    const calculateAge = (birthday) => {
        const ageDifMs = Date.now() - new Date(birthday).getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
    return(
        
        <View style={styles.main}  >
            
            {/* <View style={styles.token}>
                <Text>
                    ID
                </Text>
                <Text>
                   {("00"+props.item.item["id"])}
                </Text>
            </View> */}
           
                 
                        <Image style={{width:horizontalScale(72),height:horizontalScale(72),borderRadius:horizontalScale(36)}}
                        source={require('../resources/images/profile.jpg')} />

                

                    
                        <Text style={styles.name}>{props.item.item["name"]}</Text>
                        <Text style={styles.age}>Age  {calculateAge(props.item.item["birthDate"])}  |  {props.item.item["gender"].toUpperCase()}</Text>
                        <Divider/>
                        <Btn label='History' mode='contained' action={()=>{props.action(props.item["item"])}}/>
                        <Btn label='Prescribe' mode='outlined'/>
                        {/* <Text style={styles.diagnosis}>{props.item.item["phone_number"]}</Text> */}
              
            

         
        </View>
        // <Text style={styles.name}>   FHIR ID : {props.item.item["fhir_patient_id"].slice(0,18)}</Text>
        
    )
}
const styles=StyleSheet.create({
    main:{
        flexDirection: "column",
        alignItems: "center",
        padding: horizontalScale(16),
        marginRight:4,
        marginTop:4,
        gap: 8,
        width: 200,
        // height: 266,
        backgroundColor: "#FFFFFF",
        borderRadius: 8},
   
name:{
    fontSize:moderateScale(16),
    lineHeight:moderateScale(22),
    fontWeight:'700',
    color:'#000000'
},
age:{fontSize:moderateScale(10),
    lineHeight:moderateScale(14),
    fontWeight:'400',
    color:'#948D8D',
   
},
diagnosis:{width:360,
    fontSize:moderateScale(12),
    lineHeight:moderateScale(16),
    color:'white'}
    
})
export default SearchPatientComponent;