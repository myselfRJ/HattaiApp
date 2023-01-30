import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
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

const BookingApp = () => {

    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState();
    const [complaint, setComplaint] = useState();
    const [clinicname, setClinic] = useState('Choose Clinic');
    const [fee, setFee] = useState();
    const [value, setValue] = React.useState('male');
    const [dob, setDob] = useState(new Date());
    const [opendob, setOpendob] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [opentm, setOpentm] = useState(false);
    const [time, setTime] = useState(new Date());
    const [visible, setVisible] = useState(false);
    const [loading, setloading] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    return (
        <SafeAreaView style={{flex: 1}}>
            <DashHead />
            <View style={{flexDirection: 'row'}}>
            <View
                style={{
                paddingHorizontal: horizontalScale(80),
                paddingVertical: verticalScale(24),
                }}>
                <Text style={style.Bap}>Booking Appointment</Text>
                <ScrollView>
                <View style={style.form}>
                    <Datebtn
                    name="medical-bag"
                    text={clinicname}
                    action={() => setVisible(!visible)}
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
                        action={() => setOpen(!opendob)}
                        text={dob.toDateString()}
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
                    mode="date"
                    modal
                    open={opendob}
                    date={dob}
                    onConfirm={date => {
                        setOpendob(false);
                        setDob(date);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                    />

                    <DatePicker
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
                    />

                    <Inp onChangeText={setComplaint} placeholder="Chief Complaints" textAlign="left" />
                    <Inp onChangeText={setFee} placeholder="Fee" textAlign="left" />
                    <View
                    style={{
                        marginTop: verticalScale(16),
                        width: horizontalScale(480),
                        alignItems: 'flex-end',
                    }}>
                    <Btn label="Submit" />
                    </View>
                </View>
                </ScrollView>
            </View>
            <View style={{paddingTop: verticalScale(85)}}>
                <Pressable
                onPress={() => console.log('i am pressed')}
                style={style.img}>
                <Icon name="image-plus" size={40} color="#4BA5FA" />
                </Pressable>
            </View>
            </View>
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
