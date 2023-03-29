import React,{useEffect, useState} from 'react';
import { SafeAreaView,
    StyleSheet,
    Text,
    View,
    Linking,Image,
    ScrollView,Button } from 'react-native';
    import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
    import {horizontalScale, moderateScale, verticalScale} from '../dim';
import DashHead from '../../components/dashhead';


const PrAccount=()=>{
    console.log(practitionerData)
    const calculateAge = (birthday) => {
        const ageDifMs = Date.now() - new Date(birthday).getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
return(
    <SafeAreaView style={{flex: 1}}>
            <DashHead url={"https://cdn-icons-png.flaticon.com/512/2785/2785482.pn"} name={practitionerData?practitionerData["name"]:"Welcome"}/>
            <ScrollView>
            <View style={{flexDirection: 'row'}}>
            <View
                style={{
                paddingHorizontal: horizontalScale(50),
                paddingTop: verticalScale(30),width:"100%"
                }}>                 
                <Text style={style.Bap}>Personal Information</Text>
                <View style={style.personal}>
<View >
<Image style={style.avatar} source={{uri: "https://cdn-icons-png.flaticon.com/512/2785/2785482.png"}} />
</View>
<View>
    <Text style={{fontSize:verticalScale(20),fontWeight:"bold",color:"black"}}>{practitionerData&&practitionerData["name"]}</Text>
    <Text style={{fontSize:verticalScale(16),fontWeight:"bold",color:"grey"}}>Age : {practitionerData&&calculateAge(practitionerData["birthDate"])}  | {practitionerData&&practitionerData["gender"].toUpperCase()}</Text>
    <Text style={{fontSize:verticalScale(16),fontWeight:"bold",color:"grey"}}>DOB : {practitionerData&&practitionerData["birthDate"]}</Text>
</View>
                </View>
                <Text style={style.Bap}>Professional Information</Text>
                <View style={style.professional}>
<View style={{flexDirection:"row",alignItems:"center"}}>
<Icon name="account-outline" size={verticalScale(16)} color={"#4BA5FA"} />
    <Text style={{fontSize:verticalScale(16),fontWeight:"bold",color:"black",marginHorizontal:5}}>Registration Council :</Text>
    <Text style={{fontSize:verticalScale(16),fontWeight:"bold",color:"grey"}}>Medical Council</Text>
    </View>

    <View style={{flexDirection:"row",alignItems:"center"}}>
<Icon name="medical-bag" size={verticalScale(16)} color={"#4BA5FA"} />
    <Text style={{fontSize:verticalScale(16),fontWeight:"bold",color:"black",marginHorizontal:5}}>Medical Number :</Text>
    <Text style={{fontSize:verticalScale(16),fontWeight:"bold",color:"grey"}}>*****</Text>
    </View>

    <View style={{flexDirection:"row",alignItems:"center"}}>
<Icon name="tooltip-account" size={verticalScale(16)} color={"#4BA5FA"} />
    <Text style={{fontSize:verticalScale(16),fontWeight:"bold",color:"black",marginHorizontal:5}}>Speciality :</Text>
    <Text style={{fontSize:verticalScale(16),fontWeight:"bold",color:"grey"}}>{practitionerData&&practitionerData["specialization"]}</Text>
    </View>
                </View>
<View style={{justifyContent:"center",alignItems:"center",marginBottom:80}}>
<Text style={{fontSize:verticalScale(18),fontWeight:"bold",color:"black",marginBottom:20}}>Create your HealthCare Professional ID</Text>
<Button
  onPress={()=>Linking.openURL("https://doctor.abdm.gov.in/en/councilsearch")}
  title="Generate via Registration Number"
  color="#4BA5FA"
  accessibilityLabel="Learn more about this purple button"
/>
</View>
                <Text style={style.Bap}>Manage</Text>
                <View style={style.professional}>
<View style={{flexDirection:"row",alignItems:"center"}}>
<Icon name="home-plus-outline" size={verticalScale(16)} color={"#4BA5FA"} />
    <Text style={{fontSize:verticalScale(16),fontWeight:"bold",color:"black",marginHorizontal:5}}>Clinic :</Text>
    <Text style={{fontSize:verticalScale(16),fontWeight:"bold",color:"grey"}}>{practitionerData&&practitionerData["clinic"][0]["clinic_name"]}</Text>
    </View>

    <View style={{flexDirection:"row",alignItems:"center"}}>
<Icon name="directions" size={verticalScale(16)} color={"#4BA5FA"} />
    <Text style={{fontSize:verticalScale(16),fontWeight:"bold",color:"black",marginHorizontal:5}}>Address :</Text>
    <Text style={{fontSize:verticalScale(16),fontWeight:"bold",color:"grey"}}>{practitionerData&&practitionerData["clinic"][0]["clinic_address"]}</Text>
    </View>

    <View style={{flexDirection:"row",alignItems:"center"}}>
<Icon name="cellphone-wireless" size={verticalScale(16)} color={"#4BA5FA"} />
    <Text style={{fontSize:verticalScale(16),fontWeight:"bold",color:"black",marginHorizontal:5}}>Contact Details :</Text>
    <Text style={{fontSize:verticalScale(16),fontWeight:"bold",color:"grey"}}>{practitionerData&&practitionerData["phone_number"]}</Text>
    </View>
                </View>
            </View>
            </View>
            </ScrollView>
            </SafeAreaView>
)
}
const style = StyleSheet.create({
    Bap: {
      fontSize: moderateScale(28),
      fontWeight: '700',
      lineHeight: moderateScale(42),
      color: '#000000',
    },
    form: {
      marginTop: verticalScale(16),
    },
    img: {
      width: horizontalScale(100),
      height: horizontalScale(100),
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#4BA5FA',
      // marginVertical:verticalScale(20),
      // marginHorizontal:horizontalScale(8),
      borderRadius: 4,
    },
    text: {
      color: 'black',
      fontSize: moderateScale(32),
      lineHeight: moderateScale(38),
      fontWeight: 'bold',
      textAlign: 'center',
    },
    personal:{
        height:horizontalScale(160),
        width:"100%",
        backgroundColor:"white",
        borderRadius:10,
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row",
        marginBottom:30,
    },
    professional:{
        height:horizontalScale(120),
        width:"100%",
        backgroundColor:"white",
        borderRadius:10,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        flexDirection:"column",
        marginBottom:30,
        padding:20,
    },
    avatar: {
        width: horizontalScale(140),
        height: horizontalScale(140),
        borderRadius: horizontalScale(160 / 2),
        marginRight:10
      },
  });


export default PrAccount;