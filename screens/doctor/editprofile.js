import React,{useState} from 'react';
import { View,Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Addclinic from '../../components/addclinic';
import Adduser from '../../components/adduser';
import Fillprofile from '../../components/fillprofile';
import Profileprg from '../../components/profileprg';
import SelectModal from '../../components/selectmodal';
import Setup from '../../components/setup';
import { horizontalScale, moderateScale, verticalScale } from '../dim';


const Editprofile=()=>{
    const [mark,setMark]=useState("100");
    const [complete,setComplete]=useState([false,false,false])
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    return(
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
            setMark={setMark}
            visible={visible}
            showModal={showModal}
            setComplete={setComplete}/>:null}
             {mark==="1111"?<Setup
            setMark={setMark}
            setComplete={setComplete}/>:null}
           </View>
           <TouchableOpacity style={{position:'absolute',
           justifyContent:'center',
           alignItems:"center",
           padding:10,bottom:0,left:0,width:60,height:60,backgroundColor:'#7DBDFA',borderTopRightRadius:40}}>
                <Icon name='arrow-left' size={24} color='#fff'/>
           </TouchableOpacity>
           <SelectModal visible={visible} 
              showModal={showModal} 
              hideModal={hideModal}/>
     
        </View>
        
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