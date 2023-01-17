import React,{} from 'react';
import { View,Text } from 'react-native';
import Addclinic from '../../components/addclinic';
import Adduser from '../../components/adduser';
import Fillprofile from '../../components/fillprofile';
import Profileprg from '../../components/profileprg';


const Editprofile=()=>{
    return(
        <View>
            <View>
            <Text>hattai</Text>
           </View>
           <View>
            <Profileprg/>
           </View>
           <View>
            {/* <Fillprofile/> */}
            {/* <Addclinic/> */}
            <Adduser/>
           </View>
        </View>
    )
}
export default Editprofile;