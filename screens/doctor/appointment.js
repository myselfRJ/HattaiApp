import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,TouchableOpacity,Image, BackHandler,Alert
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import Btn from '../../components/btn';
import DashHead from '../../components/dashhead';
import Datebtn from '../../components/datebtn';
import Inp from '../../components/inp';
import {horizontalScale, moderateScale, verticalScale} from '../dim';
import SelectModal from '../../components/selectmodal';
import { PostApi,GetApi,PostForm } from '../../api/postapi';
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
const BookingApp = ({navigation}) => {

    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState('male');
    const [complaint, setComplaint] = useState();
    const [clinicname, setClinic] = useState(global.CLINICNAME);
    const [fee, setFee] = useState();
    const [value, setValue] = React.useState('male');
    const [dob, setDob] = useState(new Date());
    const [opendob, setOpendob] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [opentm, setOpentm] = useState(false);
    const [time, setTime] = useState('Time');
    const [bookedtime, setBookedTime] = useState([]);//list of already booked slot from server
    const [visible, setVisible] = useState(false);
    const [loading, setloading] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const showModalSlot = () => setOpentm(true);
    const hideModalSlot = () => setOpentm(false);
    const [daySelect, setdaySelect] = useState();
    const [timeSlot, settimeSlot] = useState([]);
    const [photo, setPhoto] = React.useState(null);
    const handleChoosePhoto = () => {
      console.log("camera opened")
      launchCamera({noData: true}, response => {
        console.log(response);
        if (response.assets) {
          setPhoto(response);
        }
      });
    };
    useEffect(() => {
      console.log(navigation.isFocused(),"id focus")
      
    
  const onBackPress = () => {
      if (!navigation.isFocused()) {
      return false;
    }
                      console.log('.......stop going to dashboard page');
                      if (navigation.canGoBack() ) {
                          Alert.alert('H-Attai', 'Do you want to discard Appointment?', [
                              {text: 'Dashboard', onPress: () => navigation.navigate("Dashboard")},
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
    useEffect(() => {
GetApi('clinic/slot/'+global.CLINICID,true)//+global.CLINICID,true)
.then(function(response){
console.log(response.data,"slot data")
setdaySelect(response.data["daySelect"])
const weekday = response.data["weekday"]
const weekend = response.data["weekend"]
settimeSlot(weekday)
}).catch(function (error) {
  console.log(error);
});
    }, []);
    const emptyAppointment=()=>{
      setName()
      setPhone()
      setGender('male')
      setDob(new Date())
      setDate(new Date())
      setTime("Time")
      setPhoto(null)
      setComplaint()
    }
    const showToast = (title,message,okaction) => {
      Alert.alert(title, message, [
        {text: 'OK', onPress: () => okaction},
      ])
    };
    const saveAppointmrnt = () => {
      const patientdata = {
        gender: gender,
        birthDate: dob.toISOString().split('T')[0],
        phone_number: phone,
        name: name,
      };
      const localdata = {
        start:date.toISOString().split('T')[0]+'T'+time+":00Z",
        minutesduration:"30",
        serviceCategory:complaint,
        is_paid:fee?true:false,
        clinic:global.CLINICID,
      };
      // const enddate=date
      // enddate.setMinutes(enddate.getMinutes() + 30)
      // console.log(date,enddate,"date")
      const fhir = {
        //edit qualification code and display
        "meta" : {
          "profile" : [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Appointment"
          ]
        },
        "serviceCategory" : [
          {
            "coding" : [
              {
                "system" : "http://snomed.info/sct",
                "code" : "408443003",
                "display" : "General medical practice"
              }
            ]
          }
        ],
        "serviceType" : [
          {
            "coding" : [
              {
                "system" : "http://snomed.info/sct",
                "code" : "11429006",
                "display" : "Consultation"
              }
            ]
          }
        ],
        "appointmentType" : {
          "coding" : [
            {
              "system" : "http://terminology.hl7.org/CodeSystem/v2-0276",
              "code" : "ROUTINE",//FOLLOWUP,WALKIN,EMERGENCY
              "display" : "Routine appointment"
            }
          ]
        },
        "specialty": [
          {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "394814009",//394585009//394586005//394802001//408443003
                "display": "General practice"//Obstetrics and gynecology//Gynaecology//General medicine//General medical practice
              }
            ]
          }
        ],
        "participant" : [
          {
            "actor" : {
              "reference" : "Patient/101"//edit fhir id or abha
            },
            "status" : "accepted"
          },
          {
            "actor" : {
              "reference" : "Practitioner/"+global.fhir_practitioner_id//edit fhir id or abha
            },
            "status" : "accepted"
          }
        ],//edit here
        resourceType: 'Appointment',
        start:date.toISOString().split('T')[0]+'T'+time+":00Z",//datetime here
        end:date.toISOString().split('T')[0]+'T'+time+":59Z",//datetime here
        status:"booked",//cancelled or booked
        description:complaint//chief complaint and reason for booking
      };
      const fhir_patient ={
        "resourceType" : "Patient",
        "meta" : {
          "profile" : [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Patient"
          ]
        },
        "name" : [
          {
            "text" : name
          }
        ],
        "telecom" : [
          {
            "system" : "phone",
            "value" : phone,
            "use" : "home"
          }
        ],
        "gender" : gender,
        "birthDate" : dob.toISOString().split('T')[0]
      }
      const data = {
        fhir: fhir,
        local: localdata,
        patient: patientdata,
        fhir_patient:fhir_patient,
      };
     const checkData =()=>{
      console.log("checking")
      if (name&&phone&&dob&&gender&&complaint&&time!=="Time"&&date){
        return true
      }
      showToast("Warning","Fill all Details.",console.log("empty field"))
      return false
     }
      {checkData()&&PostApi('appointment/save', data, true)
        .then(function (response) {
          console.log(response.data);
          if (response.data['status'] === 'success') {
            if (photo) {
              console.log(photo.assets[0])
              var FormData = require('form-data');
              var data = new FormData();
              data.append('contentType', "image/jpeg");
              data.append('language', 'en-US');
              data.append('url', photo.assets[0].uri); 
              data.append('title', name + "'s picture");
              console.log(data["url"],"uimage data send")
              PostForm('patient/media/' + response.data['patientId'], data)
                .then(function (response) {
                  console.log('image saved');
                  console.log(response.data)
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
            showToast("Success","Appointment booked Successfully.",emptyAppointment)
            // navigation.navigate("Dashboard",{"data":"data"})
          } else {
            showToast("Warning",response.data.message,console.log("warning"))
            console.warn(response.data.message);
          }
        })
        .catch(function (error) {
          showToast("Error","Appointment booking failed",console.log("error occured"))
          console.log(error);
        });}
    };
const fetchBookedSlot=(dateString)=>{
  GetApi(`appointment/get/slot/${CLINICID}/${dateString}`, true)
        .then(function (response) {
          console.log(response.data);
          if (response.data['status'] === 'success') {
setBookedTime(response.data["data"]["timeslot"])
          } else {
            console.warn(response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
}
    return (
        <SafeAreaView style={{flex: 1}}>
            <DashHead url={practitionerData?practitionerData["photo"][0]["url"]:"https://cdn-icons-png.flaticon.com/512/2785/2785482.png"} name={practitionerData?practitionerData["name"]:"Welcome"}/>
            <ScrollView>
            <View style={{flexDirection: 'row'}}>
            <View
                style={{
                paddingHorizontal: horizontalScale(80),
                paddingTop: verticalScale(80),
                }}>                 
                <Text style={style.Bap}>Book Appointment</Text>
                <ScrollView>
                <View style={style.form}>
                    <Datebtn
                    name="medical-bag"
                    text={clinicname}
                    action={() => setVisible(false)//(!visible)
                    }
                    />

                    <Inp onChangeText={setName} placeholder="Name" textAlign="left" />
                    <Inp onChangeText={setPhone} placeholder="Phone" textAlign="left" />
                    <Text
              style={{
                ...style.text,
                fontSize: moderateScale(24),
                fontWeight: '500',
                textAlign: 'left',
              }}>
              Gender
            </Text>
                    <RadioButton.Group
              onValueChange={newValue => {
                setValue(newValue);
                setGender(newValue);
              }}
              value={value}
              color="red">
              <View
                style={{
                  flexDirection: 'row',
                  padding: 4,
                  width: 240,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text>Male</Text>
                  <RadioButton value="male" color="#4BA5FA" />
                </View>
                <View>
                  <Text>Female</Text>
                  <RadioButton value="female" color="#4BA5FA" />
                </View>
                <View>
                  <Text>Other</Text>
                  <RadioButton value="other" color="#4BA5FA" />
                </View>
              </View>
            </RadioButton.Group>
                    <View style={{marginTop: verticalScale(8)}}>
                    <Datebtn
                        action={() => setOpendob(!opendob)}
                        text={dob.toString()===new Date().toString()?"DOB":"DOB : "+dob.toDateString()}
                        name="calendar"
                    />
                    </View>
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
                        text={time}
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
                    minimumDate={new Date()}
                    open={open}
                    date={date}
                    onConfirm={date2 => {
                      fetchBookedSlot(date2.toISOString().split('T')[0])
                        
                        setDate(date2);
                        setOpen(false);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                    />
                    <DatePicker
                    mode="date"
                    modal
                    maximumDate={new Date()}
                    open={opendob}
                    date={dob}
                    onConfirm={date => {
                        setOpendob(false);
                        setDob(date);
                    }}
                    onCancel={() => {
                        setOpendob(false);
                    }}
                    />

                    {/* <DatePicker
                    mode="time"
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
                    /> */}

                    <Inp onChangeText={setComplaint} placeholder="Chief Complaints" textAlign="left" />
                    <Inp onChangeText={setFee} placeholder="Fee" textAlign="left" />
                    <View
                    style={{
                        marginTop: verticalScale(16),
                        width: horizontalScale(480),
                        alignItems: 'flex-end',
                    }}>
                    <Btn label="Submit" action={saveAppointmrnt} />
                    </View>
                </View>
                </ScrollView>
            </View>
            <View style={{paddingTop: verticalScale(85)}}>
            {photo!==null && photo!==undefined ? (
            <TouchableOpacity
              onPress={() => {
                console.log('i am pressed');
                handleChoosePhoto();
              }}>
              <Image source={{uri: photo.assets[0].uri}} style={style.img} />
            </TouchableOpacity>
          ) : (
            <Pressable
              onPress={() => {
                console.log('i am pressed');
                handleChoosePhoto();
              }}
              style={style.img}>
              <Icon name="image-plus" size={40} color="#4BA5FA" />
            </Pressable>
          )}
            </View>
            </View></ScrollView>
            <SelectModal
            visible={visible}
            mode="cliniclist"
            // phone={phone}
            // signupserver={signupserver}
            loading={loading}
            setloading={setloading}
            showModal={showModal}
            hideModal={hideModal}
            setClinic={setClinic}
            clinicname={clinicname}
            />
            <SelectModal
            visible={opentm}
            mode="timeslotlist"
            // phone={phone}
            // signupserver={signupserver}
            // loading={loading}
            // setloading={setloading}
            showModal={showModalSlot}
            hideModal={hideModalSlot}
            timeslot={time}
            timeslotList={timeSlot}
            bookedslotList={bookedtime}
            settimeSlot={setTime}
            />
        </SafeAreaView>
        );
};

const style = StyleSheet.create({
  Bap: {
    fontSize: moderateScale(32),
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
});

export default BookingApp;
