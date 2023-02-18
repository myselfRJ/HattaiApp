import React,{useState} from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Divider,Modal,TextInput ,List,Button} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import '../screens/globlevariable';
import { horizontalScale, moderateScale, verticalScale } from '../screens/dim';
import { GetApi,PostApi } from '../api/postapi';


const PatientRecord=(props)=>{
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [medlist, setMedlist] = useState([]);
    const [state,setState]=useState('pres') //pres,blood,scan
    const [visible, setVisible] = React.useState(false);
    const [spouse_name, setSpouseName] = React.useState(props.patientdata.spouse_name);
    const [bloodgroup, setBloodGroup] = React.useState(props.patientdata.bloodgroup);
    const [expanded, setExpanded] = React.useState(false);

    const handlePress = () => setExpanded(!expanded);
  const showModal = () => setVisible(true);
  const hideModal = () => {setBloodGroup(props.patientdata.bloodgroup);setSpouseName(props.patientdata.spouse_name);setVisible(false)};
  const containerStyle = {backgroundColor: 'white', padding: 20,elevation:20};
    console.log(props,"props in med hist")
React.useEffect(()=>{
    fetchMedData(new Date())
},[])

    const fetchMedData=(date2)=>{
        GetApi('patient/prescription/get/'+props.patientdata.id+'/'+date2.toISOString().split('T')[0],true).then(
            function(response){
console.log(response.status,response.data[0])
setMedlist(response.data)
            }).catch(function(error){
                console.log(error,"patient search error")
            })
    }

    const updatePatientProfile=()=>{
        const data={
            "bloodgroup":bloodgroup,
            "name":spouse_name
        }
        {bloodgroup!=="NA"&&PostApi('patient/update/'+props.patientdata.id,data,true).then(
            function(response){
console.log(response.status,response.data)
            }).catch(function(error){
                console.log(error,"patient update error")
            })}
            {bloodgroup==="NA"&&setSpouseName(props.patientdata.spouse_name)}
            setVisible(false)
    }
    return(
        <View style={styles.main}>
            <View style={styles.headSec}>
                <Icon name='file-document' size={horizontalScale(48)} color={global.themecolor}/>
                <Text style={styles.heading}>Patient Records</Text>
            </View>
            <View style={styles.psection}>
                <View style={styles.perdetails}>
                    <Image style={styles.psecimg} source={require('../resources/images/profile.jpg')}/>
                   
                   <View style={styles.nsec}> 
                    <View>
                        <Text style={styles.name}>{props.patientdata.name}</Text>
                        <Text style={styles.id}>PatientID:{props.patientdata.id}</Text>
                    </View>
                    <View>
                        <Text style={styles.contact}>Contact</Text>
                        <Text style={styles.name}>{props.patientdata.phone_number}</Text>
                    </View>
                    </View>
                </View>
                <Divider style={styles.divider}/>
                <View style={styles.perdetailsec}>
                    <View>
                    <Text style={styles.pertext}>Spouse/Father</Text>
                    <Text style={styles.perdetailtext}>{spouse_name}</Text>
                                           
                    </View>
                    <View>
                    <Text style={styles.pertext}>DOB</Text>
                    <Text style={styles.perdetailtext}>{props.patientdata.birthDate}</Text>

                    </View>
                    <View>
                    <Text style={styles.pertext}>Blood Group</Text>
                    {<View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}><Text style={styles.perdetailtext}>{bloodgroup}</Text>
                    <Icon name='account-edit' size={moderateScale(17)} color={themecolor}
                    onPress={showModal}
                    /></View>}

                    </View>
                

                </View>
                
            </View>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <TextInput
      label="Spouse/Father's Name"
      value={spouse_name}
      onChangeText={text => setSpouseName(text)}
    />
    <List.Accordion
        title="Select Blood Group"
        left={props => <List.Icon {...props} icon="blood-bag" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="A+" style={{borderRadius:5,backgroundColor:bloodgroup=="A+"?"lightblue":"white"}} onPress={()=>setBloodGroup("A+")} />
        <List.Item title="B+" style={{borderRadius:5,backgroundColor:bloodgroup=="B+"?"lightblue":"white"}} onPress={()=>setBloodGroup("B+")} />
        <List.Item title="AB+" style={{borderRadius:5,backgroundColor:bloodgroup=="AB+"?"lightblue":"white"}} onPress={()=>setBloodGroup("AB+")} />
        <List.Item title="O+" style={{borderRadius:5,backgroundColor:bloodgroup=="O+"?"lightblue":"white"}} onPress={()=>setBloodGroup("O+")} />
        <List.Item title="A-" style={{borderRadius:5,backgroundColor:bloodgroup=="A-"?"lightblue":"white"}} onPress={()=>setBloodGroup("A-")} />
        <List.Item title="B-" style={{borderRadius:5,backgroundColor:bloodgroup=="B-"?"lightblue":"white"}} onPress={()=>setBloodGroup("B-")} />
        <List.Item title="AB-" style={{borderRadius:5,backgroundColor:bloodgroup=="AB-"?"lightblue":"white"}} onPress={()=>setBloodGroup("AB-")} />
        <List.Item title="O-" style={{borderRadius:5,backgroundColor:bloodgroup=="O-"?"lightblue":"white"}} onPress={()=>setBloodGroup("O-")} />
      </List.Accordion>
      <Button mode="contained-tonal" compact={true} onPress={updatePatientProfile} >Update</Button>
        </Modal>
            <View style={styles.rsection}>
                <View style={styles.datesec}>
                    <Text style={styles.date}>{date.toLocaleDateString()} </Text>
                    <Icon onPress={()=>setOpen(!open)}name='calendar' size={horizontalScale(48)} color={global.themecolor} />
                </View>

                <View style={styles.pressec}>
                    <Pressable onPress={()=>setState('pres')}>
                        <Text style={{...styles.rsechead,borderBottomWidth:state=='pres'?4:0,color:state==='pres'?'#000000':'#bbbbbb'}}>Prescription</Text>
                    </Pressable>
                    <Pressable onPress={()=>setState('blood')}>
                        <Text style={{...styles.rsechead,borderBottomWidth:state=='blood'?4:0,color:state==='blood'?'#000000':'#bbbbbb',}}>Blood Report</Text>
                    </Pressable>
                    <Pressable onPress={()=>setState('scan')}>
                        <Text style={{...styles.rsechead,borderBottomWidth:state=='scan'?4:0,color:state==='scan'?'#000000':'#bbbbbb'}}>Scan</Text>
                    </Pressable>
                </View>
                {state=='pres'?medlist.length===0?
                <View style={{justifyContent:'center',alignItems:'center',marginTop:verticalScale(96)}}>
                    <Icon name='file-document-outline' size={horizontalScale(48)} color="#e0f0ff"/>
                    <Text style={styles.norectext}>No Record for this date</Text>
                </View>:
                <>
                <View>
                    <Text style={styles.presubhead}>
                        Chief complaint
                    </Text>
                    <Text style={styles.bodytext}>
                   {medlist[0].diagnosis}
                    </Text>
                </View>
                <View>
                    
                    <Text style={styles.presubhead}>
                        Diagnosis
                    </Text>
                    <Text style={styles.bodytext}>
                    {medlist[0].diagnosis}
                    </Text>
                </View>
                <View>
                    
                    <Text style={styles.presubhead}>
                        Medication
                    </Text>
                    {medlist[0].medication.map((value,index)=>{
                        return (
                            <Text key={index}style={styles.bodytext}>
                            {value.medicine} {value.dose} {value.time} {value.frequency} {value.duration[0]?1:0}-{value.duration[1]?1:0}-{value.duration[2]?1:0} {value.quantity}

                            </Text>
                        )
                    })}
                   
                </View>
                <View>
                    
                    <Text style={styles.presubhead}>
                        Vitals
                    </Text>
                    <View style={styles.vitals}>
                        <Text>
                            BP
                        </Text>
                        <Text>
                            PR
                        </Text>
                        <Text>
                            SPO2
                        </Text>
                        <Text>
                            TEMP
                        </Text>
                        <Text>
                            LMP
                        </Text>
                        <Text>
                            EDD
                        </Text>
                    </View>

                    <View style={{...styles.vitals,marginTop:0}}>
                        <Text>
                            {medlist[0].bp}
                        </Text>
                        <Text>
                            {medlist[0].pr}
                        </Text>
                        <Text>
                            {medlist[0].spo2}
                        </Text>
                        <Text>
                            {medlist[0].temp}
                        </Text>
                        <Text>
                            {medlist[0].lmp}
                        </Text>
                        <Text>
                            {medlist[0].edd}
                        </Text>
                    </View>
                   
                </View>
                </>:null}
                {state=='blood'?medlist.length===0?
                <View style={{justifyContent:'center',alignItems:'center',marginTop:verticalScale(96)}}>
                    <Icon name='file-document-outline' size={horizontalScale(48)} color="#e0f0ff"/>
                    <Text style={styles.norectext}>No Record for this date</Text>
                </View>:
                <>
                <View>
                    <Text style={styles.presubhead}>
                        Chief complaint
                    </Text>
                    <Text style={styles.bodytext}>
                   {medlist[0].diagnosis}
                    </Text>
                </View>
                <View>
                    
                    <Text style={styles.presubhead}>
                        Diagnosis
                    </Text>
                    <Text style={styles.bodytext}>
                    {medlist[0].diagnosis}
                    </Text>
                </View>
                <View>
                    
                    <Text style={styles.presubhead}>
                        Medication
                    </Text>
                    {medlist[0].medication.map((value,index)=>{
                        return (
                            <Text key={index}style={styles.bodytext}>
                            {value.medicine} {value.dose} {value.time} {value.frequency} {value.duration[0]?1:0}-{value.duration[1]?1:0}-{value.duration[2]?1:0} {value.quantity}

                            </Text>
                        )
                    })}
                   
                </View>
                <View>
                    
                    <Text style={styles.presubhead}>
                        Vitals
                    </Text>
                    <View style={styles.vitals}>
                        <Text>
                            BP
                        </Text>
                        <Text>
                            PR
                        </Text>
                        <Text>
                            SPO2
                        </Text>
                        <Text>
                            TEMP
                        </Text>
                        <Text>
                            LMP
                        </Text>
                        <Text>
                            EDD
                        </Text>
                    </View>

                    <View style={{...styles.vitals,marginTop:0}}>
                        <Text>
                            {medlist[0].bp}
                        </Text>
                        <Text>
                            {medlist[0].pr}
                        </Text>
                        <Text>
                            {medlist[0].spo2}
                        </Text>
                        <Text>
                            {medlist[0].temp}
                        </Text>
                        <Text>
                            {medlist[0].lmp}
                        </Text>
                        <Text>
                            {medlist[0].edd}
                        </Text>
                    </View>
                   
                </View>
                </>:null}

                {state=='scan'?medlist.length===0?
                <View style={{justifyContent:'center',alignItems:'center',marginTop:verticalScale(96)}}>
                    <Icon name='file-document-outline' size={horizontalScale(48)} color="#e0f0ff"/>
                    <Text style={styles.norectext}>No Record for this date</Text>
                </View>:
                <>
                <View>
                    <Text style={styles.presubhead}>
                        Chief complaint
                    </Text>
                    <Text style={styles.bodytext}>
                   {medlist[0].diagnosis}
                    </Text>
                </View>
                <View>
                    
                    <Text style={styles.presubhead}>
                        Diagnosis
                    </Text>
                    <Text style={styles.bodytext}>
                    {medlist[0].diagnosis}
                    </Text>
                </View>
                <View>
                    
                    <Text style={styles.presubhead}>
                        Medication
                    </Text>
                    {medlist[0].medication.map((value,index)=>{
                        return (
                            <Text key={index}style={styles.bodytext}>
                            {value.medicine} {value.dose} {value.time} {value.frequency} {value.duration[0]?1:0}-{value.duration[1]?1:0}-{value.duration[2]?1:0} {value.quantity}

                            </Text>
                        )
                    })}
                   
                </View>
                <View>
                    
                    <Text style={styles.presubhead}>
                        Vitals
                    </Text>
                    <View style={styles.vitals}>
                        <Text>
                            BP
                        </Text>
                        <Text>
                            PR
                        </Text>
                        <Text>
                            SPO2
                        </Text>
                        <Text>
                            TEMP
                        </Text>
                        <Text>
                            LMP
                        </Text>
                        <Text>
                            EDD
                        </Text>
                    </View>

                    <View style={{...styles.vitals,marginTop:0}}>
                        <Text>
                            {medlist[0].bp}
                        </Text>
                        <Text>
                            {medlist[0].pr}
                        </Text>
                        <Text>
                            {medlist[0].spo2}
                        </Text>
                        <Text>
                            {medlist[0].temp}
                        </Text>
                        <Text>
                            {medlist[0].lmp}
                        </Text>
                        <Text>
                            {medlist[0].edd}
                        </Text>
                    </View>
                   
                </View>
                </>:null}

               
            </View>
            
            
               
            
            <DatePicker
                    mode="date"
                    modal
                    textColor={global.themecolor}
                    maximumDate={new Date()}
                    open={open}
                    date={date}
                    onConfirm={date1 => {
                        setOpen(false);
                        setDate(date1);
                        fetchMedData(date1)
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                    />
        </View>
    )
}

const styles=StyleSheet.create({
    main:{
        paddingLeft:horizontalScale(88),
        paddingRight:horizontalScale(56),
        marginTop:verticalScale(72)


    },
    psection:{
        marginTop:verticalScale(24),
        height:verticalScale(214),
        width:horizontalScale(494),
        borderRadius:8,
        paddingHorizontal:horizontalScale(24),
        paddingVertical:verticalScale(24),
        backgroundColor:'#ffffff'
        

    },
    psecimg:{
        height:horizontalScale(80),
        width:horizontalScale(80),
        borderRadius:verticalScale(80),

    },
    headSec:{
        flexDirection:'row',
        alignItems:'center'


    },
    heading:{
        fontSize:moderateScale(32),
        color:'#000000',
        fontWeight:'700',

    },
    rsection:{
        marginTop:verticalScale(12),
        height:verticalScale(588),
        width:horizontalScale(692),
        borderRadius:8,
        paddingHorizontal:horizontalScale(24),
        paddingVertical:verticalScale(24),
        backgroundColor:'#ffffff',
        zIndex:-1

    },
    perdetails:{
        flexDirection:'row',
        alignItems:'center'
    },
    name:{
        fontSize:moderateScale(16),
        lineHeight:moderateScale(22),
        color:'#000000',
        fontWeight:'700'
    },
    id:{
        fontSize:moderateScale(10),
        lineHeight:moderateScale(16),
        color:'#0000ff',
      
    },
    contact:{
        fontSize:moderateScale(12),
        lineHeight:moderateScale(16),
        color:'#000000',
        // fontWeight:'700'
    },
    number:{
        fontSize:moderateScale(14),
        lineHeight:moderateScale(20),
        color:'#000000',
        fontWeight:'600'
    },
    nsec:{
        flexDirection:'row',
        flex:1,
        marginLeft:horizontalScale(8),

        justifyContent:'space-between',
        alignItems:'center',
        
    },
    divider:{
        marginVertical:verticalScale(8),
        backgroundColor:'#D3EAFF'
    },
    perdetailsec:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    pertext:{
        fontSize:moderateScale(12),
        lineHeight:moderateScale(15),
        color:'#000000',
        fontWeight:'400'
    },
    perdetailtext:{
        fontSize:moderateScale(14),
        lineHeight:moderateScale(17),
        color:'#000000',
        fontWeight:'600'
    },
    datesec:{
        flexDirection:'row',
        paddingHorizontal:horizontalScale(12),
        // paddingVertical:verticalScale(12),
        borderRadius:8,
        backgroundColor:'#E0F0FF',
        width:horizontalScale(240),
        height:verticalScale(60),
        justifyContent:'space-between',
        alignItems:'center'
    },
    date:{
        fontSize:moderateScale(16),
        lineHeight:moderateScale(22),
        color:'#000000',
        fontWeight:'600'
    },
    rsechead:{
        fontSize:moderateScale(16),
        lineHeight:moderateScale(22),
        color:'#000000',
        fontWeight:'700',
    
       borderColor:global.themecolor

    },
    pressec:{
        marginTop:verticalScale(20),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'

    },
    presubhead:{
        marginTop:verticalScale(20),
        fontSize:moderateScale(14),
        lineHeight:moderateScale(17),
        color:'#000000',
        fontWeight:'600'


    },
    bodytext:{
        fontSize:moderateScale(12),
        lineHeight:moderateScale(18),
        color:'#000000',
        fontWeight:'400'

    },
    vitals:{
        marginTop:verticalScale(8),
        flexDirection:'row',
        minWidth:horizontalScale(360),
        justifyContent:'space-between',
        fontSize:moderateScale(12)
        
    },
    norectext:{
        fontSize:moderateScale(12),
        lineHeight:moderateScale(18),
        color:'#000000',
        fontWeight:'500'

    }

})

export default PatientRecord;