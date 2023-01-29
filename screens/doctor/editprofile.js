import React,{useState} from 'react';
import { View,Text, StyleSheet, Image,TouchableOpacity,TouchableWithoutFeedback,Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Addclinic from '../../components/addclinic';
import Adduser from '../../components/adduser';
import Fillprofile from '../../components/fillprofile';
import Profileprg from '../../components/profileprg';
import SelectModal from '../../components/selectmodal';
import Setup from '../../components/setup';
import { horizontalScale, moderateScale, verticalScale } from '../dim';

const Editprofile=({navigation})=>{
    const [mark,setMark]=useState("100");
    const current = ["100","110","111","1111"]
    const [complete,setComplete]=useState([false,false,false])
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    //fill profile
    const [profilePhoto,setprofilePhoto] = useState()
    const [profileDocument,setprofileDocument] = useState()
    const [profileName,setprofileName] = useState()
    const [profileGender,setprofileGender] = useState()
    const [profileDOB,setprofileDOB] = useState()
    const [profileMedNo,setprofileMedNo] = useState()
    const [profileSpeciality,setprofileSpeciality] = useState()
    const [profileExp,setprofileExp] = useState()
    //add clinic
    const [clinicMulti,setclinicMulti] = useState([])
    const [clinicName,setclinicName] = useState()
    const [clinicAddress,setclinicAddress] = useState()
    const [clinicTiming,setclinicTiming] = useState()
    const [clinicFees,setclinicFees] = useState()
    const [clinicPhoto,setclinicPhoto] = useState([])
    //add user
    const [userMulti,setuserMulti] = useState([])
    const [userName,setuserName] = useState()
    const [userNum,setuserNum] = useState()
    const [userEmail,setuserEmail] = useState()
    const [userRole,setuserRole] = useState()
    const [userClinic,setuserClinic] = useState()


const prevComponent=(val)=>{
    const indexofVal = current.indexOf(val);
    setMark(current[indexofVal-1])
    console.log(mark,indexofVal,"val")
}
const [parentclincTiming,setparentclinicTiming]=useState([])
const onTimeSelect=(data)=>{
console.log(data.toTimeString());
setparentclinicTiming(data);
}
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1}}>
            
            <View style={styles.logo}>
            <Image style={{width:horizontalScale(156),height:verticalScale(87)}}source={require('../../resources/images/hattai.png')}/>
           </View>
           <View>
            <Profileprg style={styles.progresstext}
            mark={mark}
            complete={complete}/>
           </View>
           <View>
            {mark==="100"?(<Fillprofile
            setMark={setMark}
            visible={visible}
            showModal={showModal}
            setComplete={setComplete}
            
            />):null}
            {mark==="110"?<Addclinic
            setMark={setMark}
            visible={visible}
            showModal={showModal}
            setComplete={setComplete}/>:null}
            {mark==="111"?<Adduser
            clinicTiming
            setMark={setMark}
            visible={visible}
            showModal={showModal}
            setComplete={setComplete}/>:null}
             {mark==="1111"?<Setup
            setMark={setMark}
            setComplete={setComplete}/>:null}
           </View>
           {mark!=="100"?<TouchableOpacity style={{position:'absolute',
           justifyContent:'center',
           alignItems:"center",
           padding:10,bottom:0,left:0,width:60,height:60,backgroundColor:'#7DBDFA',borderTopRightRadius:40}}>
                <Icon name='arrow-left' size={24} color='#fff' onPress={()=>{prevComponent(mark)}}/>
           </TouchableOpacity>:<></>}
           {mark==="100"&&<SelectModal visible={visible} 
              showModal={showModal} 
              hideModal={hideModal}
              mode="drug"/>}
              {mark==="110"&&<SelectModal visible={visible} 
              showModal={showModal} 
              hideModal={hideModal}
              mode="timing" onTimeSelect={onTimeSelect}/>}
              {mark==="111"&&<SelectModal visible={visible} 
              showModal={showModal} 
              hideModal={hideModal}
              mode="drug"/>}
     
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles=StyleSheet.create({
    logo:{
        marginHorizontal:horizontalScale(20),
        marginVertical:verticalScale(20),

    },
    progresstext:{
        fontSize:moderateScale(14),
        fontWeight:'700',
        color:'#000'
    }
})
export default Editprofile;