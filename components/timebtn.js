import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import { horizontalScale, verticalScale } from '../screens/dim';
import moment from 'moment';
const TimeBtn=(props)=>{
    const [date, setDate] = useState(new Date());
    return(
        <DatePicker
              mode="time"
              minuteInterval={30}
              title={null}
              textColor={global.themecolor}
              modal
              androidVariant="nativeAndroid"
              open={props.open}
              date={date}
              is24hourSource="locale"
              onConfirm={date => {
                props.setOpen(false);
                setDate(date);
                props.sendTime(moment(date).format("HH:mm"),props.index,moment(date).format("hh:mm A"))
              }}
              onCancel={() => {
                props.setOpen(false);
              }}
            />

    )
}

const styles=StyleSheet.create({
    textinp:{
        justifyContent:'flex-start',
        textAlignVertical: 'top',
        width:horizontalScale(400),
        height:verticalScale(224)}})



export default TimeBtn;