import { useLinkProps } from '@react-navigation/native';
import React,{useEffect, useState} from 'react';
import {View,Text,ScrollView, TouchableOpacity,Image,Pressable,FlatList} from 'react-native';
import { launchImageLibrary} from 'react-native-image-picker';
import { verticalScale ,horizontalScale,moderateScale} from '../screens/dim';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfilePage from '../screens/profile';
import Addbtn from './addbtn';
import Btn from './btn';
import Datebtn from './datebtn';
import DaySym from './daysym';
import Inp from './inp';
import styles from './signupss';
import { IconButton } from 'react-native-paper';
import { PostApi ,PostForm} from '../api/postapi';

const Addclinic=(props)=>{
    const [clinicMulti,setclinicMulti] = useState([])
    const [clinicName,setclinicName] = useState()
    const [clinicAddress,setclinicAddress] = useState()
    const [clinicTiming,setclinicTiming] = useState(props.parentclinicTiming["weekday"])
    const [clinicWeekEndTiming,setclinicWeekEndTiming] = useState(props.parentclinicTiming["weekend"])
    const [clinicFees,setclinicFees] = useState()
    const [photo, setPhoto] = React.useState([]);
    const [photocount, setPhotocount] = React.useState(0);
    
  const [daySelect,setDay]=useState([{day:'M',select:false},
                                      {day:'T',select:false},
                                      {day:'W',select:false},
                                      {day:'TH',select:false},
                                      {day:'F',select:false},
                                      {day:'S',select:false},
                                      {day:'Su',select:false},
                                    ])

  useEffect(()=>{
    console.log('Hello world useeffect on add clinic')

  },[daySelect,photocount,props])
  const saveClinic = () => {

    const clinic = {
      clinic_name: clinicName,
      clinic_address: clinicAddress,
      fees:clinicFees
    };
    const slot={
      "weekday_list":props.parentclinicTiming["weekday"],
      "weekend_list":props.parentclinicTiming["weekend"],
      "daySelect":daySelect
    }
    const data={
      clinic:clinic,
      slot:slot
    }
    console.log(data);
    PostApi('clinic/save', data, true)
      .then(function (response) {
        console.log(response.data);
        if (response.data['status'] === 'success') {
          console.log("inside success",photo)
          global.CLINICID=response.data['data']['id']
          global.CLINICNAME = clinicName
          props.setclinicId({id:response.data['data']['id'],name:clinicName})
          if (photo){
            console.log("inside phor=to")
            for (let i = 0; i < photo.length; i++) {
              console.log(photo[i]["uri"],"url  bb")
            var FormData = require('form-data');
            var data = new FormData();
            data.append('contentType', photo[i]["type"]);
            data.append('language', 'en-US');
            data.append('url', photo[i]);
            console.log(data)
            PostForm('clinic/images/' + response.data['data']['id'], data)
              .then(function (response) {
                console.log('image saved');
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
          props.setclinicId({id:response.data['data']['id'],name:response.data['data']['clinic_name']});
          props.setComplete([true, true, false]);
          props.setMark('111');
        } else {
          console.warn(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      console.log(response,"response");
      if (response) {
        console.log(photo,"photo1",response.assets[0].uri)
        data =photo
        data.push(response.assets[0])
        console.log(data)
        setPhoto(data);
        setPhotocount(photocount+1)
      }
      console.log(photo.length,"photo")
    });
  };
  const renderMultipleImages=(item)=>{
    console.log(item.item,"item")
    return(<>
    <Image
      source={{ uri: item.item.uri}}
      style={styles.img}
    />
    <IconButton
    style={{position:"absolute",top:0,right:-15}}
    icon="delete"
    iconColor="red"
    size={20}
    onPress={() => {var index = photo.indexOf(item.item);
      const data = photo;
      if (index !== -1) {
        data.splice(index, 1);
        setPhoto(data)
      }}}
  />
    </>)
  }
    return (
        <View style={styles.editprofile}>
        <ScrollView>
        <Text style={{...styles.text,textAlign:'left',marginTop:verticalScale(40)}}>
            Add Clinic
        </Text>
        
        <View style={{justifyContent:'flex-start'}}>
           <View style={styles.child}>
             <Inp textAlign='left' placeholder='Clinic Name' value={clinicName}
              onChangeText={setclinicName} />
           </View>
           <View style={styles.child}>
             <Inp textAlign='left' placeholder='Address' value={clinicAddress}
              onChangeText={setclinicAddress} />
           </View>
           <View style={styles.child}>
           <Text style={{...styles.text,fontSize:moderateScale(24),textAlign:'left'}}>
            Choose day
        </Text>
            <View style={{flexDirection:'row'}}>
              {daySelect.map((value,index)=>{
                return(
                  <DaySym  
                     
                      key={index}
                      id={index} 
                      day={value.day} 
                      select={value.select}
                      daySelect={daySelect} 
                      setDay={setDay}/>
                )
              })}

            </View>
           </View>
           
           <View style={styles.child}>
           <Datebtn name='clock' text='Clinic Timings' mode={"add clinic page"} timelist={props.parentclinicTiming["weekday"]}
           action={props.showModal}/>
           </View>
           
           <View style={{...styles.child}}>
            
            
            <Inp textAlign='left' placeholder='Clinic Fees' value={clinicFees}
              onChangeText={setclinicFees} />
         
            </View>
            <View style={{...styles.child}}>
            <Text style={{...styles.text,fontSize:moderateScale(24),textAlign:'left'}}>
            Add Photo
        </Text>
        </View>
        <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start"}} >
          {photo.length>0 ? (
          <>
          <Pressable  onPress={()=>{console.log("i am pressed"); handleChoosePhoto()}}style={styles.img}>
      <Icon name='image-plus' size={40} color="#4BA5FA"/>
    </Pressable >
          <FlatList
          data={photo}
          renderItem={renderMultipleImages}
          horizontal={true}
          keyExtractor={(item, index) => index}
        />
      </>):<><Pressable  onPress={()=>{console.log("i am pressed"); handleChoosePhoto()}}style={styles.img}>
      <Icon name='image-plus' size={40} color="#4BA5FA"/>
    </Pressable ></>}
    </View>

           
           <View style={{...styles.child,justifyContent:'center',alignItems:'center'}}>
                <Btn 
                label='Save'
                action={()=>{
                  console.log("triggered")
                  saveClinic();
                  
                }}/>
           </View>
           
          
        </View>
       {props.parentclinicTiming["weekday"]&&clinicAddress&&clinicFees&&clinicName?
       <Addbtn text='Add Clinic' onPress={()=>{saveClinic()
        }} />:<></>} 
       

        </ScrollView>
        
        </View>
    )
}

export default Addclinic;