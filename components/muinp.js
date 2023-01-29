import { StyleSheet } from 'react-native';
import { TextInput} from 'react-native-paper';
import { horizontalScale, verticalScale } from '../screens/dim';

const MuInp=(props)=>{

    return(
        <TextInput
        mode='outlined'
        style={styles.textinp}
        multiline={true}
        placeholder={props.placeholder}
        outlineColor='#4BA5FA'
            activeOutlineColor='#4BA5FA'
        />

    )
}

const styles=StyleSheet.create({
    textinp:{
        justifyContent:'flex-start',
        textAlignVertical: 'top',
        width:horizontalScale(400),
        height:verticalScale(224)}})



export default MuInp;