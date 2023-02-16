import { TouchableWithoutFeedback ,Keyboard} from 'react-native';
import { useSelector } from 'react-redux';
import PatientRecord from '../../components/patientrecord';

const PatientHistory=()=>{
    const patientdata=useSelector(state=>state.patientData.currentpatient)
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           
        <PatientRecord patientdata={patientdata}/>
        </TouchableWithoutFeedback>
    )
}

export default PatientHistory;