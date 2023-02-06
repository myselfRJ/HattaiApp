import React from 'react';
import { Provider, Modal,Text,Button,Portal,List} from 'react-native-paper';
import { Pressable, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, verticalScale } from '../screens/dim';
import OtpComponent from './otpcomponent';
import DrugsName from './drugselection';
import Refers from './refers';
import ClinicTiming from './clinictimeselection';
import ClinicList from './cliniclist';
import TimeSlotList from './timeSlotlist';
import SpecialityName from './specialityselection';
const SelectModal=(props)=>{

    const containerStyle = {backgroundColor: 'white',
    position:'absolute',
    bottom:0,
    left:0,
    width:"100%",
    height:verticalScale(660),
    justifyContent:'flex-start',
    alignItems:'center',
    borderTopLeftRadius:8,
    borderTopRighttRadius:8,
padding:20};

  
    
    return (


          <Modal dismissable={true} visible={props.visible} onDismiss={props.hideModal} 
          contentContainerStyle={containerStyle}>
           {
            props.mode=='otp'&& <OtpComponent phone={props.phone} 
            signupserver={props.signupserver}
            loading={props.loading}
            setloading={props.setloading}
            
            
            />
          
           }
           {
            props.mode=='drug'&&
            <DrugsName index={props.index}
                hideModal={props.hideModal}
                medication={props.medication}
                setMedication={props.setMedication}
            />
           }
            { props.mode=='timing'&&<ClinicTiming onTimeSelect={props.onTimeSelect} 
                          parentclincTiming={props.parentclincTiming}
                          setparentclinicTiming={props.setparentclinicTiming}
            hideModal={props.hideModal}/>}
           
           {props.mode=='Doctor'||props.mode=='Labs'||props.mode=='Scan'||props.mode=='Hospital'?
           <Refers
           index={props.index}
        hideModal={props.hideModal}/>:null
           
           }
            
            
            {props.mode=='cliniclist'&&<ClinicList clinicname={props.clinicname}
                                                    setClinic={props.setClinic}
                                                    hideModal={props.hideModal}
            />}
            {props.mode=='timeslotlist'&&<TimeSlotList timeslot={props.timeslot} timeslotList={props.timeslotList}
                                                    settimeSlot={props.settimeSlot}
                                                    hideModal={props.hideModal}
                                                    bookedslotList={props.bookedslotList}
            />}
{
            props.mode=='speciality'&&
            <SpecialityName index={props.index}
                hideModal={props.hideModal}
                medication={props.medication}
                setMedication={props.setMedication}
            />
           }
         
          
          </Modal>

       

        
    );
    }
    
    
    export default SelectModal;