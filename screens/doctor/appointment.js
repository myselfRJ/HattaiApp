import React,{useState} from 'react';
import { SafeAreaView,StyleSheet,Text,View,Pressable, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import Btn from '../../components/btn';
import DashHead from '../../components/dashhead';
import Datebtn from '../../components/datebtn';
import Inp from '../../components/inp';
import { horizontalScale, moderateScale, verticalScale } from '../dim';

const BookingApp=()=>{
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    

    return(
        <SafeAreaView>
            <DashHead/>
            <View style={{flexDirection:'row'}}>

           
            <View style={{paddingHorizontal:horizontalScale(80),paddingVertical:verticalScale(24)}}>
                <Text style={style.Bap}>
                    Booking Appointment
                </Text>
                <ScrollView>

                
                <View style={style.form}>
           
                <Datebtn name='medical-bag' text='healthcare Abandunce'/>

                <Inp placeholder='Name' textAlign='left'/>
                <Inp placeholder='Phone' textAlign='left'/>
                <Inp placeholder='Gender' textAlign='left'/>
                <View style={{marginTop:verticalScale(8)}}>
                <Datebtn text='DOB' name='calendar'/>

                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:verticalScale(8),width:horizontalScale(480),alignItems:'flex-end'}}>
                    <Datebtn name='timer' text='7:30am' width={horizontalScale(232)}/>
                    <Datebtn action={()=>setOpen(!open)}  name='calendar' text='7:30am'width={horizontalScale(232)} />
                </View>
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
      
                
         
                <Inp placeholder='Chief Complaints' textAlign='left'/>
                <Inp placeholder='Fee' textAlign='left'/>
                <View style={{marginTop:verticalScale(16),width:horizontalScale(480),alignItems:'flex-end'}}>
                <Btn label='Submit'/>
                </View>
                </View>
                </ScrollView>
                
            </View>
            <View style={{paddingTop:verticalScale(85)}}>
            <Pressable  onPress={()=>console.log("i am pressed")}style={style.img}>
          <Icon name='image-plus' size={40} color="#4BA5FA"/>    
        </Pressable >
            </View>
            </View>
            
        </SafeAreaView>
    )
}

const style=StyleSheet.create({
    Bap:{
        fontSize:moderateScale(32),
        fontWeight:'700',
        lineHeight:moderateScale(42),
        color:'#000000'
    },
    form:{
        marginTop:verticalScale(16)
    },
    img:{
        width:horizontalScale(100),
        height:horizontalScale(100),
        borderWidth:2,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#4BA5FA',
        // marginVertical:verticalScale(20),
        // marginHorizontal:horizontalScale(8),
        borderRadius:4
  
  
      },
})


export default BookingApp;