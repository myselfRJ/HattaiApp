import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import {launchImageLibrary} from 'react-native-image-picker';

import {horizontalScale, verticalScale, moderateScale} from '../screens/dim';

import Btn from './btn';
import Inp from './inp';
import styles from './signupss';
import Datebtn from './datebtn';
import {IconButton, Provider, RadioButton} from 'react-native-paper';
import SelectModal from './selectmodal';
import {PostApi, PostForm} from '../api/postapi';

const Fillprofile = props => {
  //fill profile
  //const [profilePhoto,setprofilePhoto] = useState()
  const [profileDocument, setprofileDocument] = useState();
  const [profileName, setprofileName] = useState();
  const [profileGender, setprofileGender] = useState();
  const [profileDOB, setprofileDOB] = useState('DOB');
  const [profileMedNo, setprofileMedNo] = useState();
  const [profileSpeciality, setprofileSpeciality] = useState('Pulmnologist');
  const [profileExp, setprofileExp] = useState();
  const [photo, setPhoto] = React.useState(null);
  const [value, setValue] = React.useState('first');

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    params => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  );
 

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };
  const saveProfile = () => {
    const surName = profileName.split(' ').pop();
    const firstName = profileName.substring(0, profileName.lastIndexOf(' '));
    const localdata = {
      active: true,
      gender: profileGender,
      birthDate: profileDOB,
      phone_number: "9999999999",
      name: profileName,
      specialization: profileSpeciality,
      experience: profileExp,
    };
    const fhir = {
      //edit qualification code and display
      qualification: [
        {
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '416555',
                display: 'Pulmnologist',
                userSelected: true,
              },
            ],
          },
        },
      ],
      telecom: [
        {
          system: 'phone',
          use: 'work',
          value: "9999999999",
          rank: 1,
        },
      ],
      name: [
        {
          family: surName,
          given: [firstName],
        },
      ],
      identifier: [
        {
          use: 'official',
          system: 'https://doctor.ndhm.gov.in',
          value: profileMedNo,
          type: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
                code: 'MD',
                display: 'Medical License number',
              },
            ],
            text: 'Medical License Number',
          },
        },
      ],
      active: true,
      gender: profileGender,
      resourceType: 'Practitioner',
      birthDate: profileDOB,
    };
    const data = {
      fhir: fhir,
      local: localdata,
    };
    console.log(data);
    PostApi('data/names/save', data, true)
      .then(function (response) {
        console.log(response.data);
        if (response.data['status'] === 'success') {
          if (photo) {
            var FormData = require('form-data');
            var data = new FormData();
            data.append('contentType', `image/${photo.assets[0].uri
              .split('/')
              .pop()
              .split('.')
              .pop()}`);
            data.append('language', 'en-US');
            data.append('url', {
              uri: photo.assets[0].uri, //Your Image File Path
              type: `image/+${photo.assets[0].uri
                .split('/')
                .pop()
                .split('.')
                .pop()}`,
              name: photo.assets[0].uri.split('/').pop(),
            });
            data.append('title', profileName + "'s picture");
            PostForm('data/names/media/' + response.data['data']['id'], data)
              .then(function (response) {
                console.log('image saved');
              })
              .catch(function (error) {
                console.log(error);
              });
          }
          props.setComplete([true, false, false]);
          props.setMark('110');
        } else {
          console.warn(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.editprofile}>
      <ScrollView>
        <Text
          style={{
            ...styles.text,
            textAlign: 'left',
            marginTop: verticalScale(40),
          }}>
          Fill Profile
        </Text>
        <View>
          {photo ? (
            <TouchableOpacity
              onPress={() => {
                console.log('i am pressed');
                handleChoosePhoto();
              }}>
              <Image source={{uri: photo.assets[0].uri}} style={styles.img} />
            </TouchableOpacity>
          ) : (
            <Pressable
              onPress={() => {
                console.log('i am pressed');
                handleChoosePhoto();
              }}
              style={styles.img}>
              <Icon name="image-plus" size={40} color="#4BA5FA" />
            </Pressable>
          )}
        </View>

        <View style={{justifyContent: 'flex-start'}}>
          <View style={styles.child}>
            <Inp
              textAlign="left"
              placeholder="Name"
              value={profileName}
              onChangeText={setprofileName}
            />
          </View>
          <View style={styles.child}>
            <Text
              style={{
                ...styles.text,
                fontSize: moderateScale(24),
                fontWeight: '400',
                textAlign: 'left',
              }}>
              Gender
            </Text>

            <RadioButton.Group
              onValueChange={newValue => {
                setValue(newValue);
                setprofileGender(newValue);
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
          </View>
          <View style={styles.child}>
            <Datebtn
              action={() => setOpen(!open)}
              name="calendar"
              text={profileDOB}
            />
            <DatePicker
              mode="date"
              modal
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                setprofileDOB(date.toISOString().split('T')[0]);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>

          <View style={{...styles.child}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <Inp
                textAlign="left"
                placeholder="Medical Number"
                value={profileMedNo}
                onChangeText={setprofileMedNo}
              />
              <Btn
                label="Upload Doc"
                labelStyle={{
                  fontSize: moderateScale(12),
                  lineHeight: moderateScale(24),
                  fontWeight: 600,
                  color: 'white',
                }}
                BtnBG={{
                  backgroundColor: '#4BA5FA',
                  borderRadius: 2,
                  height: verticalScale(80),
                  width: horizontalScale(120),
                }}
                contentStyle={{
                  height: verticalScale(80),
                  width: horizontalScale(120),
                }}
              />
            </View>
          </View>

          <View style={styles.child}>
            <Datebtn
              text="Speciality"
              action={() => {
                props.showModal(!props.visible);
              }}
            />

            {/* <Inp textAlign='left' placeholder='Speciality'/> */}
          </View>
          <View style={styles.child}>
            <Inp
              textAlign="left"
              placeholder="Experience in years"
              value={profileExp}
              onChangeText={setprofileExp}
            />
          </View>
          <View
            style={{
              ...styles.child,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Btn
              label="Save"
              action={() => {
                props.setComplete([true, false, false]);
          props.setMark('110');
                //saveProfile();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Fillprofile;
