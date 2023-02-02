import React,{useRef,useState,useEffect}from 'react';
import {View,Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Pressable, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppointTck from '../../components/apntck';
import DashHead from '../../components/dashhead';
import Datebtn from '../../components/datebtn';
import SelectModal from '../../components/selectmodal';
import StatusTck from '../../components/statustck';
import { horizontalScale, moderateScale, verticalScale } from '../dim';
import { GetApi } from '../../api/postapi';
const Dashboard=({navigation})=>{
    const [appointmentData,setAppointmentData]=useState([]);
    const [practitionerData,setPractitionerData]=useState();
    const [clinicData,setClinicData]=useState([]);
    const [visible, setVisible] = useState(false);
    const [open,setOpen]=useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [clinicSelectid,setclinicselectid]=useState();
    const fadeAnim = useRef(new Animated.Value(horizontalScale(-424))).current;
    useEffect(() => {
        GetApi('data/init',true)//+global.CLINICID,true)
        .then(function(response){
           setPractitionerData(response.data)
           setclinicselectid(response.data["clinic"][0]["id"])
           global.CLINICID=response.data["clinic"][0]["id"]
           global.practitionerData=response.data
        global.fhir_practitioner_id=response.data["fhir_practitioner_id"]})
            }, []);
    useEffect(() => {
        {clinicSelectid&&GetApi(`appointment/get/${clinicSelectid}/${new Date().toISOString().split('T')[0]}`,true)//+global.CLINICID,true)
        .then(function(response){
            setAppointmentData(response.data["data"])
        console.log(response.data,"appointment data")
        }).catch(function (error) {
            console.log(error);
        });}
            }, [clinicSelectid]);
    console.log("outvalue",open)
   const handleAnim=()=>{
    if(!open){
        fadeIn()
        setOpen(!open)
    }else{
        fadeOut()
        setOpen(!open)
    }
   }

    const fadeIn = () => {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: horizontalScale(-504),
        duration: 300,
        useNativeDriver: true,
      }).start(finish=>{
        console.log(finish)
      });
  
    };
  
    const fadeOut = () => {
      // Will change fadeAnim value to 0 in 3 seconds
      Animated.timing(fadeAnim, {
        toValue: 48,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
const renderAppointment=(item)=>{
    return <AppointTck index={item.index+1} item={item} action={navigation} />
}
    return (
        <View style={{flex:1
        }}>
            <DashHead url={practitionerData?practitionerData["photo"][0]["url"]:"https://cdn-icons-png.flaticon.com/512/2785/2785482.png"} name={practitionerData?practitionerData["name"]:"Welcome"} />
            <View style={{paddingHorizontal:horizontalScale(72),width:'100%',paddingVertical:verticalScale(24)}}>
            <View style={{flexDirection:'row',alignItems:'center',width:'98%',justifyContent:'space-between'}}>
            <Datebtn name='medical-bag' text={practitionerData?practitionerData["clinic"][0]["clinic_name"]:"Clinic"} 
                action={showModal}/>
            <View style={{flexDirection:'row',}}>
                <Text style={{fontSize:14,fontWeight:400,color:"black",alignItems:"center"}}>
                    {new Date().toDateString()}
                </Text>
                <Icon name='calendar' size={24} color={global.themecolor}/>
            </View>

            </View>
            <View style={{flexDirection:'row',marginVertical:verticalScale(24)}}>
                <StatusTck txt='Total Appointment' num={appointmentData.length}/>
                <StatusTck txt='Pending' num={appointmentData.length}/>
                <StatusTck txt='Completed' num={0}/>
            </View>
            <Text style={styles.apnheading}>
                Appointments
            </Text>

            <FlatList
          data={appointmentData}
          renderItem={renderAppointment}
          scrollEnabled={true}
          keyExtractor={(item, index) => index}
         // style={{height:"60%",borderWidth:1}}
        />


        </View>

        {/* <SelectModal visible={visible} 
              showModal={showModal} 
              hideModal={hideModal}/> */}

<View style={{position:'absolute',bottom:verticalScale(80),right:horizontalScale(24),flexDirection:'row'}}>
                
                <Animated.View style={[styles.fading,{transform:[{translateX:fadeAnim}]}]} >
                   
                   <View style={{flexDirection:'row'}}>
                   <TouchableOpacity style={{backgroundColor:"#4BA5FA",marginHorizontal:4,width:horizontalScale(68),height:horizontalScale(68),borderRadius:horizontalScale(34),justifyContent:'center',alignItems:'center'}}>
                   <Icon name='account' size={40} color="#ffffff"/>
                   
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>{navigation.navigate("BookApp")}} style={{backgroundColor:"#4BA5FA",marginHorizontal:4,width:horizontalScale(68),height:horizontalScale(68),borderRadius:horizontalScale(34),justifyContent:'center',alignItems:'center'}}>
                   <Icon name="account-clock" size={40} color="#ffffff"/>
   
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>{navigation.navigate("Prescription",{new:true})}} style={{backgroundColor:"#4BA5FA",marginHorizontal:4,width:horizontalScale(68),height:horizontalScale(68),borderRadius:horizontalScale(34),justifyContent:'center',alignItems:'center'}}>
                   <Icon name='prescription' size={40} color="#ffffff"/>
   
                   </TouchableOpacity>
                   <TouchableOpacity style={{backgroundColor:"#4BA5FA",marginHorizontal:4,width:horizontalScale(68),height:horizontalScale(68),borderRadius:horizontalScale(34),justifyContent:'center',alignItems:'center'}}>
                   <Icon name='prescription' size={40} color="#ffffff"/>
   
                   </TouchableOpacity>
                   <TouchableOpacity style={{backgroundColor:"#4BA5FA",marginHorizontal:4,width:horizontalScale(68),height:horizontalScale(68),borderRadius:horizontalScale(34),justifyContent:'center',alignItems:'center'}}>
                   <Icon name='prescription' size={40} color="#ffffff"/>
   
                   </TouchableOpacity>
                   </View>
   
           </Animated.View>
           <Pressable  onPress={handleAnim}style={{backgroundColor:"#4BA5FA",width:horizontalScale(68),height:horizontalScale(68),borderRadius:horizontalScale(34),justifyContent:'center',alignItems:'center'}}>
                <Icon name={open?'close':'menu'} size={40} color="#ffffff"/>

                </Pressable>
            </View>
    

        </View>
    )
}

const styles=StyleSheet.create({
    apnheading:{


fontFamily: 'PT Sans',
fontStyle: "normal",
fontWeight: "700",
fontSize: moderateScale(24),
lineHeight: moderateScale(31),
color: "#000000",
marginBottom:verticalScale(8)
    },

    fading:{
       position:'absolute',
       right:horizontalScale(-424),
        backgroundColor:'#ffecfa',
        flexDirection:'row'
    }

})

export default Dashboard;