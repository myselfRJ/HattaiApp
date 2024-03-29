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
        onChangeText={props.onChangeText}
        />

    )
}

const styles=StyleSheet.create({
    textinp:{
        justifyContent:'flex-start',
        textAlignVertical: 'top',
        maxHeight:verticalScale(112)}})



export default MuInp;