import {useState,useEffect} from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  TextInput,ScrollView,Keyboard,Alert,BackHandler,ActivityIndicator
} from 'react-native';
import {Chip, DataTable,Divider, Button, Dialog, RadioButton, Checkbox, Searchbar} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import '../globlevariable';
import Btn from '../../components/btn';
import DashHead from '../../components/dashhead';
import Datebtn from '../../components/datebtn';
import DoseGroup from '../../components/dosegp';
import FreqGroup from '../../components/freqgp';
import Inp from '../../components/inp';
import MuInp from '../../components/muinp';
import SelectModal from '../../components/selectmodal';
import TimeGroup from '../../components/timegp';
import {horizontalScale, moderateScale, verticalScale} from '../dim';
import { PostApi } from '../../api/postapi';
import CheckBoxLabel from '../../components/checkboxlable';
import MedList from '../../components/medlist';
import { useSelector } from 'react-redux';
const Prescription = (props,{navigation}) => {
// console.log(apnData["patient_data"]["photo"],"photo")

  const apnData=useSelector(state=>state.apnData.currentapn)
  console.log("appointment data",apnData)
  const refers = [
    {type: 'Doctor', icon: 'medical-bag'},
    {type: 'Labs', icon: 'flask'},
    {type: 'Scan', icon: 'radiology-box'},
    {type: 'Hospital', icon: 'hospital-building'},
  ];
  const medilist=['Paracetamol','Avil','Amoxicillin',"Aggrenox",
  "Akineton",
  "Alamast",
  "Albenza",
  "Aldactazide",
  "Aldactone",
  "Aldoril",
  "Aldurazyme",]
  const doselist=['500mg','600mg','700mg','800mg'];
  const foodtimelist=['After food','Before food','With food'];
  const durlist=['Morning','Afternoon','Evening'];
  const freqlist=['Daily','Alternatly','Weekly'];

 
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [opentm, setOpentm] = useState(false);
  const [time, setTime] = useState(new Date());
  const [grp, setGrp] = useState(null);
  const [dose,setDose] =useState('500mg');
  const [foodtime,setFoodtime] =useState('After food');
  const [fre,setFreq] =useState('Daily');
  const [dur,setDur] =useState([false,false,false]);
  const [quantity,setQuantity]=useState();
  const [medicine,setMedicine] =useState();
  const [ind, setInd] = useState(null);
  const [diagnosis, setDiagnosis] = useState();
  const med = {
    medicine: medicine,
    dose: dose,
    time: foodtime,
    frequency: fre,
    duration: dur,
    quantity:quantity
    
  };
  const [medication, setMedication] = useState([med]);
  const [visible, setVisible] = useState(false);
  const [visibledia, setDia] = useState(false);
  const [shareDialog,setShare]=useState(false);
  const [checked, setChecked] = useState([false,false]);

  const [refcheck,setRefcheck] =useState(false);
  const [vitalcheck,setVitalcheck] =useState(false);
  const [vistcheck,setVisitcheck] =useState(false);

  const [bp, setbp] = useState();
  const [pr, setpr] = useState();
  const [spo2, setspo2] = useState();
  const [temp, settemp] = useState();
  const [lmp, setlmp] = useState();
  const [edd, setedd] = useState();
  const [fees, setfees] = useState();
  const [feeshow, setfeeshow] = useState(true);
 // {!props.route.params.new?props.route.params.data["is_paid"]?setfeeshow(false):null:null}
  const [id, SetId] = useState(null);
  const [medbtn,setMedbtn]=useState('med'); //med,dos,tim,fre,dur,qua 
  const [inputmode,setInputmode]=useState('tap');
  const [savingPrescription, setSavingPrescription] = useState(false);
  useEffect(() => {
    console.log(props.navigation.isFocused(),"id focus")
    
  
const onBackPress = () => {
    if (!props.navigation.isFocused()) {
    return false;
  }
                    console.log('.......stop going to dashboard page');
                    if (props.navigation.canGoBack() ) {
                        Alert.alert('H-Attai', 'Do you want to discard Prescription?', [
                            {text: 'Dashboard', onPress: () => props.navigation.navigate("Dashboard")},
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                           
                            
                          ],{backgroundColor:"red"})
                          return true;
                    } else BackHandler.exitApp();
                    return true;
                  };
const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
return () => backHandler.remove();
}, [navigation]);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setInd(null);
    setVisible(false);
  };
  const handleModal = (id, ind) => {
    console.log(id, ind);
    setInd(ind);
    SetId(id);
    showModal();
  };
  const handleDur=(index)=>{
    var duration=[...dur]
    duration[index]?duration[index]=false:duration[index]=true;
    setDur(duration)
  }
  const handleDialog = (id, ind) => {
    setGrp(id);
    setInd(ind);
    showDialog();
  };

  const showDialog = () => setDia(true);

  const hideDialog = () => setDia(false);
  const showShare = () => setShare(true);

  const hideShare = () => setShare(false);


  const Addmed = () => {
    setMedication([...medication, med]);
  };
  const Removemed = id => {
    var med = [...medication];
    med.splice(id, 1);
    console.log(med);
    setMedication([...med]);
  };
  const selectDur = (index, idx, value) => {
    var medi = [...medication];
    medi[index].duration[idx] = value;
    console.log(medi);
    setMedication(medi);
  };
  const setQuant = (text, ind) => {
    console.log(text, ind);
    var medi = [...medication];
    medi[ind].quantity = text;
    console.log(medi);
    setMedication(medi);
  };

  const Sharehandle=(value)=>{
    SetId(value);
    showDialog();
  }
  const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  const shareBtnFinal=()=>{
    //setShare(!shareDialog);
    console.log(diagnosis,"diagnosis")
    console.log(medication,"medication")
    console.log(time,"time")
    console.log(date,"date")
    const data={
      name:apnData["patient_data"]["name"],
      patient_id:apnData["patient_id"],
      appointment_id:apnData["id"],
      fhir_appointment_id:apnData["fhir_appointment_id"],
      diagnosis:diagnosis,
      bp:bp,
      pr:pr,
      spo2:spo2,
      temp:temp,
      lmp:lmp,
      edd:edd,
      medication:medication,
    }
    setSavingPrescription(true)
    PostApi('patient/prescription/save', data, true)
      .then(function (response) {
        console.log(response.data);
        if (response.status === 201) {
          console.log("inside success")
          props.navigation.navigate("Dashboard",{"data":"data"})      
        } else {
          console.warn(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      }).finally(function(){
        setSavingPrescription(false)
      });
  }
  const alertOk=()=>{
    return Alert.alert('H-Attai', 'Do you want to save Prescription?', [
      {text: 'Save', onPress: () => {shareBtnFinal()}},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
     
      
    ],{backgroundColor:"red"})
  }
  return (
    <ScrollView onPress={Keyboard.dismiss}>
    <View style={{flex: 1, alignItems: 'center'}}>
      <DashHead url={practitionerData?practitionerData["photo"][0]["url"]:"https://cdn-icons-png.flaticon.com/512/2785/2785482.png"} name={practitionerData?practitionerData["name"]:"Welcome"} />
     
      <View style={styles.main}>
      <View style={styles.headSec}>
                <Icon name='prescription' size={horizontalScale(48)} color="#32BF40"/>
                <Text style={styles.heading}>Prescription</Text>
            </View>
      <View style={styles.psection}>
                <View style={styles.perdetails}>
                    <Image style={styles.psecimg} source={{uri:apnData["patient_data"]["photo"]["url"]?apnData["patient_data"]["photo"][0]["url"]:"https://cdn-icons-png.flaticon.com/512/4320/4320385.png"}}/>
                   
                   <View style={styles.nsec}> 
                    <View>
                        <Text style={styles.name}>{apnData["patient_data"]["name"]}</Text>
                        <Text style={styles.id}>{calculateAge(apnData["patient_data"]["birthDate"])} Years | {apnData["patient_data"]["gender"].toUpperCase()} </Text>
                    </View>
                    </View>
                </View>
                <Divider style={styles.divider}/>
                <View style={styles.perdetailsec}>

                    <View>
                    <Text style={styles.pertext}>{apnData.serviceCategory}</Text>
                    

                    </View>
                

                </View>
                
            </View>
        {/* <View
          style={{
            flexDirection: 'row',
            borderWidth: 0.5,
            borderColor: '#4BA5FA',
            width: horizontalScale(692),
            marginBottom: verticalScale(16),
            paddingHorizontal: horizontalScale(8),
            paddingVertical: verticalScale(8),
          }}>
          <View>
            <Icon name="prescription" size={48} color="#4BA5FA" />
          </View>
          <View>
            <Image
              source={{uri:apnData["patient_data"]["photo"]["url"]?apnData["patient_data"]["photo"][0]["url"]:"https://cdn-icons-png.flaticon.com/512/4320/4320385.png"}}
              style={{
                height: horizontalScale(48),
                width: horizontalScale(48),
                borderRadius: horizontalScale(24),
              }}
            />
          </View>
          <View style={{marginLeft: horizontalScale(8)}}>
            <Text style={styles.name}>{apnData["patient_data"]["name"]}</Text>
            <Text style={styles.info}>{calculateAge(apnData["patient_data"]["birthDate"])} Years | {apnData["patient_data"]["gender"].toUpperCase()} </Text>
            <Text style={styles.diagnosis}>
              {apnData["serviceCategory"]}
            </Text>
          </View>
        </View> */}
        <View style={{...styles.headSec,marginTop:verticalScale(30)}}>
                <Icon name='note-multiple-outline' size={horizontalScale(24)} color="#FF6161"/>
                <Text style={styles.subheading}>Diagnosis/Consultation note</Text>
          </View>
        <View style={styles.note}>
      
          <TextInput
          multiline 
          style={{width:"100%",height:'100%',textAlignVertical:'top'}} placeholder='Diagnosis/Consultaion Notes'
          onChangeText={setDiagnosis}/>
        </View>
        <View style={{...styles.headSec,marginTop:verticalScale(30)}}>
                <Icon name='heart-pulse' size={horizontalScale(24)} color="#FF6161"/>
                <Text style={styles.subheading}>Vitals</Text>
                <Checkbox color={global.themecolor}onPress={()=>setVitalcheck(!vitalcheck)}status={vitalcheck?'checked':'unchecked'}size={horizontalScale(24)}/>
          </View>
          {vitalcheck &&<View
            style={{
              flexDirection: 'row',

              justifyContent: 'space-between',
              alignItems: 'center',
             
            }}>
            
              <Inp fontSize={moderateScale(12)} placeholder="BP" value={bp} onChangeText={setbp} textAlign="left" height={32} width={100} />
              <Inp fontSize={moderateScale(12)} placeholder="SPO2" value={spo2} onChangeText={setspo2} textAlign="left" height={32} width={100} />
              <Inp fontSize={moderateScale(12)} placeholder="LMP" value={lmp} onChangeText={setlmp} textAlign="left" height={32} width={100} />
            
              
              <Inp fontSize={moderateScale(12)}
                placeholder="PR" value={pr} onChangeText={setpr}
                textAlign="left"
                height={32}
                width={100}
              />
              <Inp fontSize={moderateScale(12)}
                placeholder="TEMP" value={temp} onChangeText={settemp}
                textAlign="left"
                height={32}
                width={100}
              />
              <Inp fontSize={moderateScale(12)} placeholder="EDD" value={edd} onChangeText={setedd} textAlign="left" height={32} width={100} />
            
          </View>}

        <View style={{...styles.headSec,marginTop:verticalScale(30),width:horizontalScale(686),justifyContent:'space-between'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>

                <Icon name='medical-bag' size={horizontalScale(24)} color="#1FCC30"/>
                <Text style={styles.subheading}>Medication</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:"center"}}>
                  <Icon onPress={()=>setInputmode('tap')} style={{marginRight:verticalScale(8)}} name='gesture-double-tap' size={horizontalScale(24)} color={inputmode==='tap'?global.themecolor:'#C5E0FA'}/>
                  <Icon onPress={()=>setInputmode('pen')} style={{marginRight:verticalScale(8)}} name='draw-pen' size={horizontalScale(24)} color={inputmode==='pen'?global.themecolor:'#C5E0FA'}/>
                </View>

               
          </View>
          <View style={{paddingHorizontal:horizontalScale(8),
            paddingVertical:verticalScale(8),width:horizontalScale(686),minHeight:verticalScale(308),borderRadius:8,backgroundColor:'#ffffff',marginTop:verticalScale(8)}}>

            {inputmode==='tap'&& <><View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
              <Pressable onPress={()=>setMedbtn('med')} style={medbtn=='med'?styles.selected:styles.unselected}>
                <Text>
                  Medicine
                </Text>
              </Pressable>
              <Pressable onPress={()=>setMedbtn('dos')} style={medbtn=='dos'?styles.selected:styles.unselected}>
                <Text>
                  Dose
                </Text>
              </Pressable>
              <Pressable onPress={()=>setMedbtn('tim')} style={medbtn=='tim'?styles.selected:styles.unselected}>
                <Text>
                  Time
                </Text>
              </Pressable>
              <Pressable onPress={()=>setMedbtn('fre')} style={medbtn=='fre'?styles.selected:styles.unselected}>
                <Text>
                  Frequency
                </Text>
              </Pressable>
              <Pressable onPress={()=>setMedbtn('dur')} style={medbtn=='dur'?styles.selected:styles.unselected}>
                <Text>
                  Duration
                </Text>
              </Pressable>
              <Pressable onPress={()=>setMedbtn('qua')} style={medbtn=='qua'?styles.selected:styles.unselected}>
                <Text>
                  Quantity
                </Text>
              </Pressable>
              
            </View>
           <View style={{minHeight:verticalScale(218)}}>
              {medbtn==='med'&&
              <View style={{flexDirection:'row',marginTop:verticalScale(16),paddingHorizontal:horizontalScale(16)}}>
                <View style={{flex:1,borderRightWidth:0.5,borderColor:'#B4DAFF',paddingHorizontal:horizontalScale(8),height:verticalScale(188)}}>
                <Searchbar 
                style={{fontSize:moderateScale(12),width:horizontalScale(220),backgroundColor:'#F8F8F8',borderRadius:40,elevation:0,shadowColor:'#ffffff'}}/>
                <View>
                  
                  <Text style={styles.medicbblockhead}>
                    Recommendation
                  </Text>

                  {
                    medilist.map((value,index)=>{
                      if(index<6){
                        return(
                          <Pressable key={index} onPress={()=>setMedicine(value)}>
                            <Text style={{color:medicine==value ? global.themecolor:'#000000'}}>
                              {value}
                            </Text>
                          </Pressable>
                          
                        )
                      }
                    })
                  }
                </View>
                  </View>
                  
                  <View style={{flex:1,paddingHorizontal:horizontalScale(8)}}>
                    <Text style={styles.medicbblockhead}>
                      Search Results
                    </Text>

                  </View>
                
                </View>}
              {medbtn==='dos'&&
                <RadioButton.Group onValueChange={newValue => setDose(newValue)} value={dose}>
                  <View style={styles.medsection}>

                 

                
              {doselist.map((value,index)=>{return(
                <View  key={index}style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginHorizontal:horizontalScale(8)}}>

                
                <RadioButton  color={global.themecolor}value={value} />
                <Text>{value}</Text>
               
                </View>
              // <CheckBoxLabel key={index}  id={index}data={med}label={value}/>
              )})}
               </View>
              </RadioButton.Group>
               }
                
              {medbtn==='tim'&&<RadioButton.Group onValueChange={newValue => setFoodtime(newValue)} value={foodtime}>
                  <View style={styles.medsection}>

                 

                
              {foodtimelist.map((value,index)=>{return(
                <View  key={index}style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginHorizontal:horizontalScale(8)}}>

                
                <RadioButton  color={global.themecolor}value={value} />
                <Text>{value}</Text>
               
                </View>
              // <CheckBoxLabel key={index}  id={index}data={med}label={value}/>
              )})}
               </View>
              </RadioButton.Group>}
              {medbtn==='fre'&&<RadioButton.Group onValueChange={newValue => setFreq(newValue)} value={fre}>
                  <View style={styles.medsection}>

                 

                
              {freqlist.map((value,index)=>{return(
                <View  key={index}style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginHorizontal:horizontalScale(8)}}>

                
                <RadioButton  color={global.themecolor}value={value} />
                <Text>{value}</Text>
               
                </View>
              // <CheckBoxLabel key={index}  id={index}data={med}label={value}/>
              )})}
               </View>
              </RadioButton.Group>}
              {medbtn==='dur'&&
                  <View style={styles.medsection}>

                 

                
              {durlist.map((value,index)=>{return(
                <View  key={index}style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginHorizontal:horizontalScale(8)}}>
                <RadioButton  color={global.themecolor}value={dur[index]}
                status={dur[index]?'checked':'unchecked'}
                onPress={()=>handleDur(index)} />
                <Text>{value}</Text>
                </View>
              // <CheckBoxLabel key={index}  id={index}data={med}label={value}/>
              )})}
               </View>
              }
              {medbtn==='qua'&&<View  style={styles.medsection}>
                <TextInput placeholder='quantity' onChangeText={setQuantity}/>
                </View>}

            </View></>}
            {inputmode==='pen'&&<View style={{height:verticalScale(218)}}>
              
              </View>}
            <View  style={{paddingRight:horizontalScale(16),alignItems:'flex-end',width:horizontalScale(686)}}>
            <Icon onPress={Addmed}name='plus' size={moderateScale(32)} color={global.themecolor}/>

            </View>
            
            <Divider />
            <View>
              
             {medication.map((value,index)=>{return(
             <MedList key={index} medicine={value.medicine}
                      dose={value.dose}
                      foodtime={value.time}
                      dur={value.duration}
                      fre={value.frequency}
                      quantity={value.quantity}
                      remove={()=>Removemed(index)}
             />
             )})}
            </View>

          </View>

          <View style={{...styles.headSec,marginTop:verticalScale(30)}}>
              
                <Icon name='share' size={horizontalScale(24)} color={global.themecolor}/>
                <Text style={styles.subheading}>Referrals</Text>
                <Checkbox color={global.themecolor}onPress={()=>setRefcheck(!refcheck)}status={refcheck?'checked':'unchecked'}size={horizontalScale(24)}/>
          </View>

          {refcheck &&<View style={{flexDirection: 'row',paddingHorizontal:horizontalScale(8)}}>
            {refers.map((value, index) => {
              return (
                <Pressable
                  onPress={() => handleModal(value.type, index)}
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: horizontalScale(16),
                    paddingHorizontal: horizontalScale(8),
                    paddingVertical: verticalScale(8),
                    borderRadius: 4,
                    borderColor: '#4BA5FA',
                    borderWidth: 0.5,
                  }}>
                  <Icon name={value.icon} size={16} color="#4BA5FA" />
                  <Text>{value.type}</Text>
                </Pressable>
              );
            })}
          </View>}

          <View style={{...styles.headSec,marginTop:verticalScale(30)}}>
          
                <Icon name='walk' size={horizontalScale(24)} color={global.themecolor}/>
                <Text style={styles.subheading}>Next Visit</Text>
                <Checkbox color={global.themecolor}onPress={()=>setVisitcheck(!vistcheck)}status={vistcheck?'checked':'unchecked'}size={horizontalScale(24)}/>
          </View>
          {vistcheck &&     <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: verticalScale(8),
                width: horizontalScale(480),
                alignItems: 'flex-end',
              }}>
              <Datebtn
              height={verticalScale(32)}
              iconsize={verticalScale(24)}
              fontSize={moderateScale(12)}
                action={() => setOpentm(!opentm)}
                name="timer"
                text={time.toLocaleTimeString()}
                width={horizontalScale(232)}
              />
              <Datebtn
              height={verticalScale(32)}
              iconsize={verticalScale(24)}
              fontSize={moderateScale(12)}
                action={() => setOpen(!open)}
                name="calendar"
                text={date.toLocaleDateString()}
                width={horizontalScale(232)}
              />
               <DatePicker
              mode="date"
              modal
              minDate={new Date()}
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <DatePicker
              mode="time"
              minuteInterval={30}
              modal
              open={opentm}
              date={time}
              onConfirm={date => {
                setOpentm(false);
                setTime(date);
              }}
              onCancel={() => {
                setOpentm(false);
              }}
            />
            </View>}

            <View style={{...styles.headSec,marginTop:verticalScale(30)}}>
          
          {/* <Icon name='star' size={horizontalScale(24)} color={global.themecolor}/> */}
          <Text style={styles.subheading}>Fees</Text>
          {/* <Checkbox color={global.themecolor}onPress={()=>setVisitcheck(!vistcheck)}status={vistcheck?'checked':'unchecked'}size={horizontalScale(24)}/> */}
    </View>
    <View style={{marginBottom:verticalScale(8)}}>
             {feeshow&& <Inp fontSize={moderateScale(12)} width={240} height ={40}value={fees} action={setfees} placeholder="Fees" textAlign="left" />}


              </View>
              <View style={{alignItems:'flex-end',marginTop:verticalScale(8),marginBottom:verticalScale(8)}}>
              {savingPrescription?<ActivityIndicator size="large" color={global.themecolor}/>: <Btn label="Submit"  action={()=>{alertOk()}}/>}

              </View>



        {/* <Text
          style={{
            ...styles.subhead,
            marginTop: verticalScale(16),
            marginBottom: verticalScale(8),
          }}>
          Medication
        </Text> */}
        {/* <View>
          <View
            style={{
              flexDirection: 'row',
              height: verticalScale(48),

              backgroundColor: '#4BA5FA',
              alignItems: 'center',
            }}>
            <Text style={{...styles.head, width: horizontalScale(144)}}>
              Medicine
            </Text>
            <Text style={{...styles.head, width: horizontalScale(60)}}>
              Dose
            </Text>
            <Text style={{...styles.head, width: horizontalScale(60)}}>
              Time
            </Text>
            <Text style={{...styles.head, width: horizontalScale(80)}}>
              Frequency
            </Text>
            <Text style={{...styles.head, width: horizontalScale(120)}}>
              Duration
            </Text>
            <Text style={{...styles.head, width: horizontalScale(56)}}>
              Quantity
            </Text>
            <Text style={{...styles.head, width: horizontalScale(60)}}>
              Add/Remove
            </Text>
          </View>
          {medication.map((value, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: verticalScale(8),
                }}>
                <Pressable 
                  onPress={() => handleModal('drug', index)}
                  style={{...styles.press, width: horizontalScale(144)}}>
                  <Text>{value.medicine}</Text>
                </Pressable>
                <Pressable
                  onPress={() => handleDialog('dose', index)}
                  style={{...styles.press, width: horizontalScale(60)}}>
                  <Text>{value.dose}</Text>
                </Pressable>
                <Pressable
                  onPress={() => handleDialog('time', index)}
                  style={{...styles.press, width: horizontalScale(60)}}>
                  <Text>{value.time}</Text>
                </Pressable>
                <Pressable
                  onPress={() => handleDialog('freq', index)}
                  style={{...styles.press, width: horizontalScale(80)}}>
                  <Text>{value.frequency}</Text>
                </Pressable>
                <View
                  style={{
                    ...styles.press,
                    flexDirection: 'row',
                    width: horizontalScale(120),
                  }}>
                  {value.duration.map((val, idx) => {
                    return (
                      <RadioButton
                        key={idx}
                        idx={idx}
                        onPress={() => selectDur(index, idx, !val)}
                        status={val ? 'checked' : 'unchecked'}
                      />
                    );
                  })}
                </View>
                <TextInput
                  //   onPress={() => handleDialog('quant',index)}
                  keyboardType="numeric"
                  onChange={({nativeEvent: {eventCount, target, text}}) =>
                    setQuant(text, index)
                  }
                  // onFocus={()=>setInd(index)}
                  style={{...styles.press, width: horizontalScale(56)}}
                  //   onChangeText={}
                  value={value.quantity}></TextInput>
                <View style={{padding: 8}}>
                  <Icon
                    onPress={() => Removemed(index)}
                    name="delete"
                    size={24}
                    color="#FF0505"
                  />
                </View>
              </View>
            );
          })}

          <View
            style={{
              position: 'absolute',
              bottom: verticalScale(4),
              backgroundColor: '#4BA5FA',
              borderRadius: horizontalScale(48),
              right: 0,
            }}>
            <Icon name="plus" size={40} color="#ffffff" onPress={Addmed} />
          </View>
        </View> */}
        {/* <View>
          <Text
            style={{
              ...styles.subhead,
              marginTop: verticalScale(16),
              marginBottom: verticalScale(8),
            }}>
            Referrals
          </Text>
         
          <View>
            <Text
              style={{
                ...styles.subhead,
                marginTop: verticalScale(16),
                marginBottom: verticalScale(8),
              }}>
              Next Visit
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: verticalScale(8),
                width: horizontalScale(480),
                alignItems: 'flex-end',
              }}>
              <Datebtn
                action={() => setOpentm(!opentm)}
                name="timer"
                text={time.toLocaleTimeString()}
                width={horizontalScale(232)}
              />
              <Datebtn
                action={() => setOpen(!open)}
                name="calendar"
                text={date.toLocaleDateString()}
                width={horizontalScale(232)}
              />
            </View>
            <DatePicker
              mode="date"
              modal
              minDate={new Date()}
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <DatePicker
              mode="time"
              minuteInterval={30}
              modal
              open={opentm}
              date={time}
              onConfirm={date => {
                setOpentm(false);
                setTime(date);
              }}
              onCancel={() => {
                setOpentm(false);
              }}
            />
          </View>
              <View style={{marginTop:verticalScale(8),marginBottom:verticalScale(8)}}>
             {feeshow&& <Inp value={fees} action={setfees} placeholder="Fees" textAlign="left" />}


              </View>
              <View style={{alignItems:'flex-end',marginTop:verticalScale(8),marginBottom:verticalScale(8)}}>
              <Btn label="Submit"  action={()=>{shareBtnFinal()}}/>

              </View>
        
          
        </View> */}
      </View>

      <Dialog
        style={{width: horizontalScale(240), height: verticalScale(320)}}
        visible={visibledia}
        onDismiss={hideDialog}>
        {grp === 'dose' ? (
          <>
            <Dialog.Title>Dose</Dialog.Title>
            <Dialog.Content>
              <DoseGroup
                index={ind}
                medication={medication}
                setMedication={setMedication}
              />
            </Dialog.Content>
          </>
        ) : null}
        {grp === 'time' ? (
          <>
            <Dialog.Title>Time</Dialog.Title>
            <Dialog.Content>
              <TimeGroup
                index={ind}
                medication={medication}
                setMedication={setMedication}
              />
            </Dialog.Content>
          </>
        ) : null}
        {grp === 'freq' ? (
          <>
            <Dialog.Title>Frequency</Dialog.Title>
            <Dialog.Content>
              <FreqGroup
                index={ind}
                medication={medication}
                setMedication={setMedication}
              />
            </Dialog.Content>
          </>
        ) : null}

        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog
      visible={shareDialog}
      onDismiss={hideShare}
      >
        <Dialog.Title>
          Share With
        </Dialog.Title>
        <Dialog.Content>
          <View style={{flexDirection:'row',alignItems:'center'}}>
        
          
          <Checkbox
            color={global.themecolor}
            status={checked[0] ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked([true,false]);
              }}
          />
            <Text>
            Share world
          </Text>

          </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
        
          
        <Checkbox
          color={global.themecolor}
          status={checked[1] ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked([true,false]);
            }}/>
          <Text>
          Share world
        </Text>

        </View>
        
        </Dialog.Content>
        <Dialog.Actions>
          <Button color={global.themecolor} icon='whatsapp' onPress={hideShare}>
            Share
          </Button>
        </Dialog.Actions>


      </Dialog>
      <SelectModal
        index={ind}
        mode={id}
        visible={visible}
        showModal={showModal}
        hideModal={hideModal}
        medication={medication}
        setMedication={setMedication}
      />
    </View>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(80),
    paddingTop: verticalScale(80),
  },
  head: {
    textAlign: 'center',
    marginRight: horizontalScale(12),
  },
  press: {
    height: verticalScale(40),
    marginRight: horizontalScale(12),

    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#4BA5FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subhead: {
    fontSize: moderateScale(24),
    color: '#000000',
    fontWeight: '700',
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#000000',
  },
  info: {fontSize: moderateScale(10), fontWeight: '500'},
  diagnosis: {
    width: horizontalScale(560),
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    color: '#000000',
  },

  psection:{
    marginTop:verticalScale(24),
    height:verticalScale(214),
    width:horizontalScale(494),
    borderRadius:8,
    paddingHorizontal:horizontalScale(24),
    paddingVertical:verticalScale(24),
    backgroundColor:'#ffffff'
    

},
psecimg:{
    height:horizontalScale(80),
    width:horizontalScale(80),
    borderRadius:verticalScale(80),

},
perdetails:{
  flexDirection:'row',
  alignItems:'center'
},
name:{
  fontSize:moderateScale(16),
  lineHeight:moderateScale(22),
  color:'#000000',
  fontWeight:'700'
},
id:{
  fontSize:moderateScale(10),
  lineHeight:moderateScale(16),
  color:'#0000ff',

},
contact:{
  fontSize:moderateScale(12),
  lineHeight:moderateScale(16),
  color:'#000000',
  // fontWeight:'700'
},
number:{
  fontSize:moderateScale(14),
  lineHeight:moderateScale(20),
  color:'#000000',
  fontWeight:'600'
},
nsec:{
  flexDirection:'row',
  flex:1,
  marginLeft:horizontalScale(8),

  justifyContent:'space-between',
  alignItems:'center',
  
},
divider:{
  marginVertical:verticalScale(8),
  backgroundColor:'#D3EAFF'
},
perdetailsec:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center'
},
pertext:{
  fontSize:moderateScale(12),
  lineHeight:moderateScale(18),
  color:'#000000',
  fontWeight:'400'
},
perdetailtext:{
  fontSize:moderateScale(14),
  lineHeight:moderateScale(17),
  color:'#000000',
  fontWeight:'600'
},
headSec:{
  flexDirection:'row',
  alignItems:'center',
  // marginTop:verticalScale(30)
},
heading:{
  fontSize:moderateScale(32),
  color:'#000000',
  fontWeight:'700',

},
subheading:{
  fontSize:moderateScale(16),
  color:'#000000',
  fontWeight:'700',
  marginLeft:horizontalScale(4)

},
note:{
  justifyContent:'flex-start',
  // alignItems:'flex-start',
  width:horizontalScale(686),
  height:verticalScale(112),
  backgroundColor:'#ffffff',
  borderRadius:8,
  paddingVertical:verticalScale(4),
  paddingHorizontal:horizontalScale(8),
  marginTop:verticalScale(8)
},
selected:{
  backgroundColor:'#B5DBFF',
  paddingHorizontal:horizontalScale(4),
  color:'#000000',
  height:verticalScale(24),
  borderRadius:4,
  // paddingVertical:verticalScale(4),
  justifyContent:'center',
  
},
unselected:{
  // paddingVertical:verticalScale(4),
  justifyContent:'center',
  height:verticalScale(24),
  paddingHorizontal:horizontalScale(4),
  color:'#8F8E8E'
},
medsection:{
  flexDirection:'row',
  marginTop:verticalScale(16),
  paddingHorizontal:horizontalScale(16)

},
medicbblockhead:{
  fontSize:moderateScale(14),
  color:'#000000',
fontWeight:'600'}

});
export default Prescription;
