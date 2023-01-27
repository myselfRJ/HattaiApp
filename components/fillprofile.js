import React,{useState,useCallback} from 'react';
import {View,Text,ScrollView,TouchableOpacity, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';

import { horizontalScale, verticalScale,moderateScale } from '../screens/dim';

import Btn from './btn';
import Inp from './inp';
import styles from './signupss';
import Datebtn from './datebtn';
import { Provider, RadioButton } from 'react-native-paper';
import SelectModal from './selectmodal';

const Fillprofile=(props)=>{
    const [name,setName]=useState();
    const [gender,setGender]=useState();
    const [dob,setDob]=useState();
    const [medicalno,setMedicalno]=useState();
    const [speciality,setSpeciality]=useState();
    const [experience,setExperience]=useState();
    const [value, setValue] = React.useState('first');
 

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );


    return (

        <View style={styles.editprofile}>
           
        <ScrollView>
        <Text style={{...styles.text,textAlign:'left',marginTop:verticalScale(40)}}>
            Fill Profile
        </Text>
        <Pressable  onPress={()=>console.log("i am pressed")}style={styles.img}>
          <Icon name='image-plus' size={40} color="#4BA5FA"/>    
        </Pressable >
        <View style={{justifyContent:'flex-start'}}>
           <View style={styles.child}>
             <Inp textAlign='left' placeholder='Name'/>
           </View>
           <View style={styles.child}>
         
            <Text style={{...styles.text,fontSize:moderateScale(24),fontWeight:'400',textAlign:'left'}}>
            Gender
          </Text>
      
           <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
              <View  style ={{flexDirection:'row',padding:4,width:240,justifyContent:'space-between'}}>
              <View>
                <Text>Male</Text>
                <RadioButton value="male" />
              </View>
              <View>
                <Text>Female</Text>
                <RadioButton value="female" />
              </View>
              <View>
                <Text>Other</Text>
                <RadioButton value="other" />
              </View>
              </View>
            </RadioButton.Group>
            
           </View>
           <View style={styles.child}>
            <Datebtn action={()=>setOpen(!open)} name='calender' text="DOB"/>
            <DatePicker 
            mode='date' 
            modal
           open={open}
           date={date}
           onConfirm={(date) => {
             setOpen(false)
             setDate(date)
           }}
           onCancel={() => {
             setOpen(false)
           }} />
      
           </View>
           
           <View style={{...styles.child}}>
            <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:'flex-end'}}>  
            <Inp textAlign='left' placeholder='Medical Number'/>
            <Btn label="Upload Doc"
          labelStyle={{ fontSize:moderateScale(12),
              lineHeight:moderateScale(24),
              fontWeight: 600,
              color: 'white',}}
             BtnBG={{ backgroundColor: '#4BA5FA',
                      borderRadius:2,
                      height:verticalScale(80),
                      width: horizontalScale(120)}}
        
        contentStyle={{  height:verticalScale(80),
          width: horizontalScale(120)}}/>
            </View>
            </View>

           <View style={styles.child}>
            <Datebtn  text='Speciality' action={()=>{props.showModal(!props.visible)}}/>
           
             {/* <Inp textAlign='left' placeholder='Speciality'/> */}
           </View>
           <View style={styles.child}>
             <Inp textAlign='left' placeholder='Experience in years'/>
           </View>
           <View style={{...styles.child,justifyContent:'center',alignItems:'center'}}>
                <Btn 
                label='Save'
                action={()=>{props.setComplete([true,false,false]);
                  props.setMark('110')
                }}
                />
           </View>
          
        </View>

        </ScrollView>
      
        </View>
        
    )
}

export default Fillprofile;