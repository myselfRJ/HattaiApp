import {useState} from 'react';
import {View, Image, Text, Pressable, StyleSheet, TextInput} from 'react-native';
import {Chip, DataTable, Button, Dialog, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
const Prescription = () => {
  const refers=[{type:'Doctor',icon:'medical-bag'},{type:'Labs',icon:'flask'},{type:'Scan',icon:'radiology-box'},{type:'Hospital',icon:'hospital-building'}]
  const med={medicine:'Choose Med',dose:'dose',time:'time',frequency:'frequency',duration:[false,false,false]};
  const [grp, setGrp] = useState(null);
  const [ind,setInd]=useState(null)
  const [diagnosis,setDiagnosis]=useState()
  const [medication,setMedication] =useState([med])
  const [visible, setVisible] = useState(false);
  const [visibledia, setDia] = useState(false);
  const [id, SetId] = useState(null);
  const showModal = () => setVisible(true);
  const hideModal = () => {setInd(null);setVisible(false);}
  const handleModal = (id,ind)=> {
    console.log(id,ind);
    setInd(ind);
    SetId(id);
    showModal();
  };



  const handleDialog =(id,ind) => {
    setGrp(id);
    setInd(ind);
    showDialog();
  };

  const showDialog = () => setDia(true);

  const hideDialog = () => setDia(false);

  const Addmed=()=>{

    setMedication([...medication,med]);
    
  }
  const Removemed=(id)=>{
    var med=[...medication]
    med.splice(id,1)
    console.log(med)
    setMedication([...med])
  }
  const selectDur=(index,idx,value)=>{
    var medi=[...medication];
    medi[index].duration[idx]=value;
    console.log(medi);
    setMedication(medi);
   
}
const setQuant=(text,ind)=>{
    console.log(text,ind)
    var medi=[...medication];
    medi[ind].quantity=text;
    console.log(medi);
    setMedication(medi);

}

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <DashHead />

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
              source={require('../../resources/images/profile.jpg')}
              style={{
                height: horizontalScale(48),
                width: horizontalScale(48),
                borderRadius: horizontalScale(24),
              }}
            />
          </View>
          <View style={{marginLeft: horizontalScale(8)}}>
            <Text style={styles.name}>Heeralal Chand</Text>
            <Text style={styles.info}>26 Years | Male</Text>
            <Text style={styles.diagnosis}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et
              turpis metus. Quisque vestibulum molestie ipsum id sagittis.
            </Text>
          </View>
        </View>
        <Text style={styles.subhead}>Diagnosis / Consultation Notes</Text>
        <View style={{flexDirection: 'row'}}>
          <MuInp placeholder='Diagnosis / Consultation Notes' onChangeText={setDiagnosis} />
          <View
            style={{
              flexDirection: 'row',
             
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: horizontalScale(16),
            }}>
            <View style={{marginRight: horizontalScale(16)}}>
              <Inp 
                placeholder="BP" 
                textAlign="left" 
                height={56} 
                width={120} />
              <Inp 
                placeholder="SPO2" 
                textAlign="left" 
                height={56} 
                width={120} />
              <Inp 
                placeholder="LMP" 
                textAlign="left" 
                height={56} 
                width={120} />
            </View>
            <View>
              <Inp 
                placeholder="PR" 
                textAlign="left" 
                height={56} 
                width={120} />
              <Inp 
                placeholder="TEMP" 
                textAlign="left" 
                height={56} 
                width={120} />
              <Inp 
                placeholder="EDD" 
                textAlign="left" 
                height={56} 
                width={120} />
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
          {
            medication.map((value,index)=>{
                return(
                    <View key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical:verticalScale(8)
                    }}>
                    <Pressable
                      onPress={() => handleModal('drug',index)}
                      style={{...styles.press, width: horizontalScale(144)}}>
                      <Text>{value.medicine}</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleDialog('dose',index)}
                      style={{...styles.press, width: horizontalScale(60)}}>
                      <Text>{value.dose}</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleDialog('time',index)}
                      style={{...styles.press, width: horizontalScale(60)}}>
                      <Text>{value.time}</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleDialog('freq',index)}
                      style={{...styles.press, width: horizontalScale(80)}}>
                      <Text>{value.frequency}</Text>
                    </Pressable>
                    <View
                      style={{
                        ...styles.press,
                        flexDirection: 'row',
                        width: horizontalScale(120),
                      }}>
                        {value.duration.map((val,idx)=>{
                            return(
                                <RadioButton 
                                key={idx} 
                                idx={idx}
                                onPress={()=>selectDur(index,idx,!val)} 
                                status={val?"checked":'unchecked'} />

                            )
                        })}
                      
                
                    </View>
                    <TextInput
                    //   onPress={() => handleDialog('quant',index)}
                    keyboardType='numeric'
                    onChange={({nativeEvent: {eventCount, target, text}}) =>setQuant(text,index)}
                    // onFocus={()=>setInd(index)}
                      style={{...styles.press, width: horizontalScale(56)}}
                    //   onChangeText={}
                    value={value.quantity}
                      >
                    
                    </TextInput>
                    <View style={{padding:8}}>
                    <Icon onPress={()=>Removemed(index)} name="delete" size={24} color='#FF0505'/>
                    </View>
                    
                  </View>
        

                )
            })
          }

          <View
            style={{
              position: 'absolute',
              bottom: verticalScale(4),
              backgroundColor:'#4BA5FA',
              borderRadius:horizontalScale(48),
              right: 0,
            }}>
            <Icon  name="plus" size={40} color="#ffffff"onPress={Addmed} />
          </View>
         
        </View>
        <View >
      <Text
          style={{
            ...styles.subhead,
            marginTop: verticalScale(16),
            marginBottom: verticalScale(8),
          }}>
          Referrals
        </Text>
        <View style={{flexDirection:'row'}}>
         {refers.map((value,index)=>{
          return(
            <Pressable onPress={()=>handleModal(value.type,index)} key={index} 
            style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginRight:horizontalScale(16),paddingHorizontal:horizontalScale(8),paddingVertical:verticalScale(8),borderRadius:4,borderColor:'#4BA5FA',borderWidth:0.5}}
            >
               <Icon name={value.icon} size={16} color="#4BA5FA"/>
              <Text>
            {value.type}</Text>
            </Pressable>

          )
         }) }

       
         
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
        <Datebtn name='calendar' text={new Date().toLocaleDateString()}/>
          
        </View>

            <Inp placeholder='Fees' textAlign='left'/>

          <Btn label='Share' />
       
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
