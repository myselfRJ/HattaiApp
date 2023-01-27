import React from 'react';
import { Provider, Modal,Text,Button,Portal,List} from 'react-native-paper';
import { Pressable, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, verticalScale } from '../screens/dim';
const SelectModal=(props)=>{

    const containerStyle = {backgroundColor: 'white',
    position:'absolute',
    bottom:0,
    left:0,
    width:"100%",
    height:'40%',
    justifyContent:'flex-start',
    alignItems:'center',
    borderTopLeftRadius:8,
    borderTopRighttRadius:8,
padding:20};

  
    
    return (


          <Modal visible={props.visible} onDismiss={props.hideModal} 
          contentContainerStyle={containerStyle}>
            <Text>Select Speciality</Text>
            <View>
           <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:verticalScale(80),width:horizontalScale(240),padding:horizontalScale(20)}}>
            <Icon name='rocket' size={40} color='#456743'/>
            <Text>General Physician</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:verticalScale(80),width:horizontalScale(400),padding:horizontalScale(20)}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Icon name='rocket' size={40} color='#4BA5FA'/>
            <Text>General Physician</Text>

            </View>
            <Icon name='check' size={40} color='#158F22'/>
           </TouchableOpacity>

            </View>
          
          </Modal>

       

        
    );
    }
    
    
    export default SelectModal;