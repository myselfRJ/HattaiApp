import {useState} from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Chip, DataTable, Button, Dialog, RadioButton, Checkbox} from 'react-native-paper';
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
const Prescription = (props,{navigation}) => {
console.log(props.route.params.data["patient_data"]["photo"],"photo")
  const refers = [
    {type: 'Doctor', icon: 'medical-bag'},
    {type: 'Labs', icon: 'flask'},
    {type: 'Scan', icon: 'radiology-box'},
    {type: 'Hospital', icon: 'hospital-building'},
  ];
  const med = {
    medicine: 'Choose Med',
    dose: 'dose',
    time: 'time',
    frequency: 'frequency',
    duration: [false, false, false],
  };
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [opentm, setOpentm] = useState(false);
  const [time, setTime] = useState(new Date());
  const [grp, setGrp] = useState(null);
  const [ind, setInd] = useState(null);
  const [diagnosis, setDiagnosis] = useState();
  const [medication, setMedication] = useState([med]);
  const [visible, setVisible] = useState(false);
  const [visibledia, setDia] = useState(false);
  const [shareDialog,setShare]=useState(false);
  const [checked, setChecked] = useState([false,false]);

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
    data={
      name:props.route.params.data["patient_data"]["name"],
      patient_id:props.route.params.data["patient_id"],
      appointment_id:props.route.params.data["id"],
      fhir_appointment_id:props.route.params.data["fhir_appointment_id"],
      diagnosis:diagnosis,
      bp:bp,
      pr:pr,
      spo2:spo2,
      temp:temp,
      lmp:lmp,
      edd:edd,
      medication:medication,
    }
    PostApi('patient/prescription/save', data, true)
      .then(function (response) {
        console.log(response.data);
        if (response.status === 201) {
          console.log("inside success")
          props.navigation.navigate("Dashboard")      
        } else {
          console.warn(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <DashHead url={practitionerData?practitionerData["photo"][0]["url"]:"https://cdn-icons-png.flaticon.com/512/2785/2785482.png"} name={practitionerData?practitionerData["name"]:"Welcome"} />

      <View style={styles.main}>
        <View
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
              source={{uri:props.route.params.data["patient_data"]["photo"]["url"]?props.route.params.data["patient_data"]["photo"][0]["url"]:"https://cdn-icons-png.flaticon.com/512/4320/4320385.png"}}
              style={{
                height: horizontalScale(48),
                width: horizontalScale(48),
                borderRadius: horizontalScale(24),
              }}
            />
          </View>
          <View style={{marginLeft: horizontalScale(8)}}>
            <Text style={styles.name}>{props.route.params.data["patient_data"]["name"]}</Text>
            <Text style={styles.info}>{calculateAge(props.route.params.data["patient_data"]["birthDate"])} Years | {props.route.params.data["patient_data"]["gender"].toUpperCase()} </Text>
            <Text style={styles.diagnosis}>
              {props.route.params.data["serviceCategory"]}
            </Text>
          </View>
        </View>
        <Text style={styles.subhead}>Diagnosis / Consultation Notes</Text>
        <View style={{flexDirection: 'row'}}>
          <MuInp
            placeholder="Diagnosis / Consultation Notes"
            onChangeText={setDiagnosis}
          />
          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: horizontalScale(16),
            }}>
            <View style={{marginRight: horizontalScale(16)}}>
              <Inp placeholder="BP" value={bp} action={setbp} textAlign="left" height={56} width={120} />
              <Inp placeholder="SPO2" value={spo2} action={setspo2} textAlign="left" height={56} width={120} />
              <Inp placeholder="LMP" value={lmp} action={setlmp} textAlign="left" height={56} width={120} />
            </View>
            <View>
              
              <Inp
                placeholder="PR" value={pr} action={setpr}
                textAlign="left"
                height={56}
                width={120}
              />
              <Inp
                placeholder="TEMP" value={temp} action={settemp}
                textAlign="left"
                height={56}
                width={120}
              />
              <Inp placeholder="EDD" value={edd} action={setedd} textAlign="left" height={56} width={120} />
            </View>
          </View>
        </View>

        <Text
          style={{
            ...styles.subhead,
            marginTop: verticalScale(16),
            marginBottom: verticalScale(8),
          }}>
          Medication
        </Text>
        <View>
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
        </View>
        <View>
          <Text
            style={{
              ...styles.subhead,
              marginTop: verticalScale(16),
              marginBottom: verticalScale(8),
            }}>
            Referrals
          </Text>
          <View style={{flexDirection: 'row'}}>
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
          </View>
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
        
          
        </View>
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
            }}
        />
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
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(80),
    paddingTop: verticalScale(24),
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
});
export default Prescription;
