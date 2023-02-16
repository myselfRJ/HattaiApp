import React from 'react';
import { TouchableWithoutFeedback,View,Text,FlatList,Keyboard, ScrollView } from 'react-native';
import {  Searchbar } from 'react-native-paper';
import { GetApi } from '../../api/postapi';
import SearchPatientComponent from '../../components/searchPatientComponent';
import { horizontalScale, moderateScale, verticalScale } from '../dim';
import { currentpatient } from '../../redux/patientslice';
import { useDispatch,useSelector } from 'react-redux';
import DashHead from '../../components/dashhead';

const SearchPatient=({navigation})=>{
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchLoading, setSearchLoading] = React.useState(false);
    const [searchData, setSearchData] = React.useState();
    const prData=useSelector(state=>state.practionerData.data)
    const onChangeSearch = query => {setSearchQuery(query);
        console.log(query)
    // fetchSearchdata()
    };
    const fetchSearchData=()=>{
       
        GetApi('patient/name/'+searchQuery,true).then(
            function(response){
console.log(response.status)
setSearchData(response.data)
            }).catch(function(error){
                console.log(error,"patient search error")
            })
    }
    /////////////for patient page
    const [searchselectData, setSearchselectData] = React.useState();
    const dispatch=useDispatch()

    const renderSearchpatient=(item)=>{
        return <SearchPatientComponent index={item.index+1} item={item} 
        action={(data)=>{console.log("pa",data);
        dispatch(currentpatient(data));
        setSearchselectData(data);
    navigation.navigate('PatientHistory')}} />
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
            <View>
            <DashHead 
            url={prData?prData["photo"][0]["url"]:"https://cdn-icons-png.flaticon.com/512/2785/2785482.png"} 
            name={prData?prData["name"]:"Welcome"} />
            </View>
            
            
          
            <View style={{flex:1,paddingHorizontal:horizontalScale(72),width:'100%',height:"80%",marginTop:verticalScale(96),zIndex:2}}>
           
            <View style={{flexDirection:'row',alignItems:'center',width:'98%',justifyContent:'space-between'}}>
            <Searchbar
            loading={searchLoading}
            onIconPress={fetchSearchData}
            style={{borderRadius:20}}
      placeholder="Search Patient by name or phone"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
            </View>

            <View style={{flexDirection:"row",alignItems:"center"}}>
            
                {searchData&&<Text style={{marginRight:10,marginTop:25,fontSize:moderateScale(24),fontWeight:'700',color:'#000000'}}>
                Search Results
            </Text>}
          </View>
          
            <FlatList
          data={searchData}
          renderItem={renderSearchpatient}
          scrollEnabled={true}
          keyExtractor={(item, index) => index}
         style={{marginTop:8}}
        //  contentContainerStyle={}
         numColumns={3}
        />


        </View>
        
        </>
        </TouchableWithoutFeedback>
    )
}

export default SearchPatient;