import React,{useRef,useState,useEffect}from 'react';
import {Alert,Image,View,Text, StyleSheet,  TouchableOpacity, Animated, Pressable, FlatList,TouchableWithoutFeedback,Keyboard,BackHandler} from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppointTck from '../../components/apntck';
import DashHead from '../../components/dashhead';
import Datebtn from '../../components/datebtn';
import SelectModal from '../../components/selectmodal';
import StatusTck from '../../components/statustck';
import { horizontalScale, moderateScale, verticalScale } from '../dim';
import { GetApi } from '../../api/postapi';
import {Searchbar } from 'react-native-paper';
import SearchPatientComponent from '../../components/searchPatientComponent';
import { Chip } from 'react-native-paper';
import PatienthistoryComponent from '../../components/patientHistory';
import {prData} from '../../redux/prslice';
import {apnData} from '../../redux/apnslice';
import PatientRecord from '../../components/patientrecord';
import { useDispatch, useSelector } from 'react-redux';
const Dashboard=({navigation,route})=>{
    const [appointmentData,setAppointmentData]=useState([]);
    const [appointmentDataDone,setAppointmentDataDone]=useState([]);
    const [practitionerData,setPractitionerData]=useState();
    const [clinicData,setClinicData]=useState([]);
    const [visible, setVisible] = useState(false);
    const [open,setOpen]=useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [clinicSelectid,setclinicselectid]=useState();
    const [page,setPage]=useState("dash")//dash,search,patient
    const fadeAnim = useRef(new Animated.Value(horizontalScale(-424))).current;
    const prdata=useSelector(state=>state.practionerData.data);
    const [segmentValue, setSegmentValue] = React.useState('pending');

    console.log('reducer state',prdata)
    const dispatch=useDispatch()
    useEffect(() => {
        GetApi('data/init',true)//+global.CLINICID,true)
        .then(function(response){
            console.log(response.data,"pract")
           setPractitionerData(response.data)
           dispatch(prData(response.data))
           setclinicselectid(response.data["clinic"][0]["id"])
           global.CLINICID=response.data["clinic"][0]["id"]
           global.CLINICNAME=response.data["clinic"][0]["clinic_name"]
           global.practitionerData=response.data
        global.fhir_practitioner_id=response.data["fhir_practitioner_id"]})
            }, []);
    useEffect(() => {
        console.log("@@@@@@@##########",clinicSelectid)
        {clinicSelectid&&GetApi(`appointment/get/${clinicSelectid}/${new Date().toISOString().split('T')[0]}`,true)//+global.CLINICID,true)
        .then(function(response){
            setAppointmentData(response.data["data"])
            setAppointmentDataDone(response.data["data_done"])
            dispatch(apnData(response.data.data))
        console.log(response.data,"appointment data")
        }).catch(function (error) {
            console.log(error);
        });}
            }, [clinicSelectid,route.params,navigation]);
    useEffect(() => {
                console.log(page,"page changed to")
                    }, [page]);
    useEffect(() => {
        console.log(navigation.isFocused(),"id focus")
        
      
    const onBackPress = () => {
        if (!navigation.isFocused()) {
        return false;
      }
                        console.log('.......stop going to profile page',route);
                        if (navigation.canGoBack() ) {
                            Alert.alert('H-Attai', 'Do you want to exit App?', [
                                {text: 'Dashboard', onPress: () => setPage("dash")},
                                {
                                  text: 'Cancel',
                                  onPress: () => console.log('Cancel Pressed'),
                                  style: 'cancel',
                                },
                                {text: 'Exit', onPress: () => BackHandler.exitApp()},
                                
                              ],{backgroundColor:"red"})
                              return true;
                        } else BackHandler.exitApp();
                        return true;
                      };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
}, [navigation]);
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
    //////////for search page
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchLoading, setSearchLoading] = React.useState(false);
    const [searchData, setSearchData] = React.useState();
    const onChangeSearch = query => {setSearchQuery(query);
        console.log(query)
    // fetchSearchdata()
    };
    const fetchSearchData=()=>{
        GetApi('patient/name/'+searchQuery,true).then(
            function(response){
console.log(response.status)
setSearchData(response.data)
            }).catch(function(error){
                console.log(error,"patient search error")
            })
    }
    /////////////for patient page
    const [searchselectData, setSearchselectData] = React.useState();

    /////////
const renderAppointment=(item)=>{
    return <AppointTck index={item.index+1} item={item} action={navigation} />
}
const renderSearchpatient=(item)=>{
    return <SearchPatientComponent index={item.index+1} item={item} action={(data)=>{console.log("pa",data);setSearchselectData(data);setPage("patient");}} />
}
// console.log(searchselectData,"@@@")
    return (
        <View style={{flex:1,backgroundColor:'#F8F8F8'
        }}>
            <DashHead url={"https://cdn-icons-png.flaticon.com/512/2785/2785482.png"} name={practitionerData?practitionerData["name"]:"Welcome"} />
            <View style={{paddingHorizontal:horizontalScale(72),width:'100%',marginTop:verticalScale(80),backgroundColor:'#F8F8F8'}}>
            <View style={{flexDirection:'row',alignItems:'center',width:'98%',justifyContent:'space-between'}}>
            <Datebtn name='medical-bag' text={practitionerData?practitionerData["clinic"][0]["clinic_name"]:"Clinic"} 
                action={showModal}/>
         

            </View>
            
            <View style={{flexDirection:'row',marginVertical:verticalScale(24)}}>
                <StatusTck txt='Total Appointment' num={appointmentData.length+appointmentDataDone.length}/>
                <StatusTck txt='Pending' num={appointmentData.length}/>
                <StatusTck txt='Completed' num={appointmentDataDone.length}/>
            </View>
            <View style={{flexDirection:"row",alignItems:"center"}}><Text style={{...styles.apnheading,marginRight:10}}>
                Appointments   
            </Text>
            
            <Icon name="reload" size={18} /></View>
            <View style={{flexDirection:'row',
            width:horizontalScale(240),
            justifyContent:'space-between',
            alignItems:'center',paddingHorizontal:horizontalScale(24),
            paddingVertical:verticalScale(8),
            backgroundColor:'#E0F0FF',borderRadius:4,marginBottom:verticalScale(16)}}>
                <Text style={{fontSize:moderateScale(16),fontWeight:"500",color:"black",textAlign:"left"}}>
                    {new Date().toDateString()}
                </Text>
                <Icon name='calendar' size={48} color={global.themecolor}/>
            </View>
            <SegmentedButtons
        value={segmentValue}
        onValueChange={setSegmentValue}
        style={{marginBottom:10}}
        // density="high"
        buttons={[
          {
            value: 'pending',
            label: 'Pending',
            icon:   'calendar-clock',
            showSelectedCheck: true,
            style:{backgroundColor:segmentValue==="pending"?global.themecolor:"white"}
          },
          {
            value: 'completed',
            label: 'Completed',
            icon:   'calendar-check',
            showSelectedCheck: true,
            style:{backgroundColor:segmentValue==="completed"?global.themecolor:"white"}
          },
        ]}
      />
{segmentValue==="pending"&&<FlatList
          data={appointmentData}
          renderItem={renderAppointment}
          scrollEnabled={true}
          keyExtractor={(item, index) => index}
         style={{height:"50%"}}
        />}
{segmentValue==="completed"&&<FlatList
          data={appointmentDataDone}
          renderItem={renderAppointment}
          scrollEnabled={true}
          keyExtractor={(item, index) => index}
         style={{height:"50%"}}
        />}

        </View>
        {/* {page==="search"&&<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{paddingHorizontal:horizontalScale(72),width:'100%',paddingVertical:verticalScale(24),height:"80%"}}>
            <View style={{flexDirection:'row',alignItems:'center',width:'98%',justifyContent:'space-between'}}>
            <Searchbar
            loading={searchLoading}
            onIconPress={fetchSearchData}
            style={{borderRadius:20}}
      placeholder="Search Patient by name or phone"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
            </View>

            <View style={{flexDirection:"row",alignItems:"center"}}>
            
                {searchData&&<Text style={{...styles.apnheading,marginRight:10,marginTop:25}}>
                Patient's Result
            </Text>}
          </View>

            <FlatList
          data={searchData}
          renderItem={renderSearchpatient}
          scrollEnabled={true}
          keyExtractor={(item, index) => index}
         style={{marginTop:10}}
         contentContainerStyle={{justifyContent:"space-around"}}
         numColumns={2}
        />


        </View></TouchableWithoutFeedback>} */}
      
        {/* <SelectModal visible={visible} 
              showModal={showModal} 
              hideModal={hideModal}/> */}

{/* <View style={{position:'absolute',bottom:verticalScale(80),right:horizontalScale(24),flexDirection:'row'}}>
                
                <Animated.View style={[styles.fading,{transform:[{translateX:fadeAnim}]}]} >
                   
                   <View style={{flexDirection:'row'}}>
                   {page!=="search"&&<TouchableOpacity onPress={()=>{setPage("search")}}  style={{backgroundColor:"#4BA5FA",marginHorizontal:4,width:horizontalScale(68),height:horizontalScale(68),borderRadius:horizontalScale(34),justifyContent:'center',alignItems:'center'}}>
                   <Icon name='account-search' size={40} color="#ffffff"/>
                   
                   </TouchableOpacity>}
                   {page!=="dash"&&<TouchableOpacity onPress={()=>{setPage("dash")}}  style={{backgroundColor:"#4BA5FA",marginHorizontal:4,width:horizontalScale(68),height:horizontalScale(68),borderRadius:horizontalScale(34),justifyContent:'center',alignItems:'center'}}>
                   <Icon name='desktop-mac-dashboard' size={40} color="#ffffff"/>
                   
                   </TouchableOpacity>}
                   
                   <TouchableOpacity onPress={()=>{navigation.navigate("BookApp")}} style={{backgroundColor:"#4BA5FA",marginHorizontal:4,width:horizontalScale(68),height:horizontalScale(68),borderRadius:horizontalScale(34),justifyContent:'center',alignItems:'center'}}>
                   <Icon name="account-clock" size={40} color="#ffffff"/>
   
                   </TouchableOpacity>
                   {/* <TouchableOpacity onPress={()=>{navigation.navigate("Prescription",{new:true})}} style={{backgroundColor:"#4BA5FA",marginHorizontal:4,width:horizontalScale(68),height:horizontalScale(68),borderRadius:horizontalScale(34),justifyContent:'center',alignItems:'center'}}>
                   <Icon name='prescription' size={40} color="#ffffff"/>
   
                   </TouchableOpacity> */}
                   {/* <TouchableOpacity style={{backgroundColor:"#4BA5FA",marginHorizontal:4,width:horizontalScale(68),height:horizontalScale(68),borderRadius:horizontalScale(34),justifyContent:'center',alignItems:'center'}}>
                   <Icon name='prescription' size={40} color="#ffffff"/>
   
                   </TouchableOpacity>
                  
                   </View>
   
           </Animated.View> */}
           {/* <Pressable  onPress={handleAnim}style={{backgroundColor:"#4BA5FA",width:horizontalScale(68),height:horizontalScale(68),borderRadius:horizontalScale(34),justifyContent:'center',alignItems:'center'}}>
                <Icon name={open?'close':'menu'} size={40} color="#ffffff"/>

                </Pressable> */}
       
    

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