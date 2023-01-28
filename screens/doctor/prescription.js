import { useState } from 'react';
import { View,Image,Text,Pressable, StyleSheet} from 'react-native';
import {Chip, DataTable, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashHead from '../../components/dashhead';
import Inp from '../../components/inp';
import MuInp from '../../components/muinp';
import SelectModal from '../../components/selectmodal';
import { horizontalScale, verticalScale } from '../dim';
const Prescription=()=>{
    const [visible,setVisible]=useState(false);
    const [id,SetId]=useState(null);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const handleModal=(id)=>{
        console.log(id)
        SetId(id);
        showModal();


    }

    return(
        <View style={{flex:1}}>
            <DashHead />

   
        <View style={styles.main}>
           <View style={{flexDirection:'row',borderWidth:0.5,
           borderColor:'#4BA5FA',
           width:horizontalScale(692),
           marginBottom:verticalScale(16),
           paddingHorizontal:horizontalScale(8),
           paddingVertical:verticalScale(8)}}>
            <View >
                <Icon name='prescription' size={48} color="#4BA5FA"/>
            </View>
            <View>
                <Image source ={require('../../resources/images/profile.jpg')}
                 style={{height:horizontalScale(48),width:horizontalScale(48),borderRadius:horizontalScale(24)}}/>
            </View>
            <View style={{marginLeft:horizontalScale(8)}}>
                <Text>
                    Heeralal Chand
                </Text>
                <Text>
                    26 Years | Male
                </Text>
                <Text style={{flexWrap:'wrap'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et turpis metus. Quisque vestibulum molestie ipsum id sagittis.
                </Text>
            </View>
           </View>
           <Text>Diagnosis</Text>
           <View style={{flexDirection:'row'}}>

            
           <MuInp/>
           <View style={{flexDirection:'row',borderWidth:0.5,
           justifyContent:'center',alignItems:'center',
           paddingHorizontal:horizontalScale(16)}}>
            <View style={{marginRight:horizontalScale(16)}}>
            <Inp placeholder='O2' textAlign='left' 
            height={56} width={120}/>
            <Inp placeholder='O2' textAlign='left' height={56} width={120}/>
            <Inp placeholder='O2' textAlign='left' height={56} width={120}/>

            </View>
            <View>
            <Inp placeholder='O2' textAlign='left' height={56} width={120}/>
            <Inp placeholder='O2' textAlign='left' height={56} width={120}/>
            <Inp placeholder='O2' textAlign='left' height={56} width={120}/>

            </View>
            
            
           </View>

           </View>
           
           <Text>Medication</Text>
           <View>

           
           <View style={{flexDirection:'row',
           height:verticalScale(60),
           
           backgroundColor:'#4BA5FA',
           alignItems:'center',
           }}>
            <Text style={{textAlign:'center',marginRight:horizontalScale(12),width:horizontalScale(144)}}>
                Medicine
            </Text>
            <Text style={{textAlign:'center',marginRight:horizontalScale(12),width:horizontalScale(60)}}>
                Dose
            </Text>
            <Text style={{textAlign:'center',marginRight:horizontalScale(12),width:horizontalScale(60)}}>
                Time
            </Text>
            <Text style={{textAlign:'center',marginRight:horizontalScale(12),width:horizontalScale(80)}}>
                Frequency
            </Text>
            <Text style={{textAlign:'center',marginRight:horizontalScale(12),width:horizontalScale(120)}}>
                Duration
            </Text>
            <Text style={{textAlign:'center',marginRight:horizontalScale(12),width:horizontalScale(56)}}>
                Quantity
            </Text>
            <Text style={{textAlign:'center',marginRight:horizontalScale(12),width:horizontalScale(60)}}>
                Add/Remove
            </Text>
           </View>
           <View style={{flexDirection:'row',
           
           alignItems:'center',
           }}>
           <Pressable  onPress={()=>handleModal('drug')}style={{height:verticalScale(40),marginRight:horizontalScale(12),marginTop:verticalScale(8),borderRadius:4,borderWidth:1,justifyContent:'center',alignItems:'center',width:horizontalScale(144)}}><Text>Choose Med</Text></Pressable>
            <Pressable style={{height:verticalScale(40),marginRight:horizontalScale(12),marginTop:verticalScale(8),borderRadius:4,borderWidth:1,justifyContent:'center',alignItems:'center',width:horizontalScale(60)}}><Text>Dose</Text></Pressable>
            <Pressable style={{height:verticalScale(40),marginRight:horizontalScale(12),marginTop:verticalScale(8),borderRadius:4,borderWidth:1,justifyContent:'center',alignItems:'center',width:horizontalScale(60)}}><Text>Time</Text></Pressable>
            <Pressable style={{height:verticalScale(40),marginRight:horizontalScale(12),marginTop:verticalScale(8),borderRadius:4,borderWidth:1,justifyContent:'center',alignItems:'center',width:horizontalScale(80)}}><Text>Frequency</Text></Pressable>
            <View style={{flexDirection:'row',height:verticalScale(40),marginRight:horizontalScale(12),marginTop:verticalScale(8),borderRadius:4,borderWidth:1,justifyContent:'center',alignItems:'center',width:horizontalScale(120)}}>
                <RadioButton status='checked'/>
                <RadioButton status='checked'/>
                <RadioButton status='checked'/>
            </View>
            <Pressable style={{height:verticalScale(40),marginRight:horizontalScale(12),marginTop:verticalScale(8),borderRadius:4,borderWidth:1,justifyContent:'center',alignItems:'center',width:horizontalScale(56)}}><Text>Quantity</Text></Pressable>
            <Icon name='delete' size={16}/>
           
           </View>

           </View>
        </View>
        <SelectModal mode={id} visible={visible} showModal={showModal}
        hideModal={hideModal} />
        </View>
    )

}

const styles=StyleSheet.create({
    main:{
        paddingHorizontal:horizontalScale(80),
        paddingTop:verticalScale(24)

    }
})
export default Prescription;