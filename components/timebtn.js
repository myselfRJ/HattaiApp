import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import { horizontalScale, verticalScale } from '../screens/dim';

const TimeBtn=(props)=>{
    const [date, setDate] = useState(new Date());
    return(
        <DatePicker
              mode="time"
              minuteInterval={15}
              textColor={global.themecolor}
              modal
              open={props.open}
              date={date}
              onConfirm={date => {
                props.setOpen(false);
                setDate(date);
                props.sendTime(date,props.index)
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