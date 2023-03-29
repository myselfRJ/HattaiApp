import { ScrollView, View,Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Searchbar, Title } from 'react-native-paper';
import { horizontalScale, moderateScale, verticalScale } from '../screens/dim';


const EmptyView=(props)=>{


    const search=()=>{
        
    }

    return(
        <View style={styles.main}>
            <Text style={styles.texthead}>
            No {props.mode} found.

            </Text>
            <View style={styles.searchbar}>
            <Searchbar  style={{backgroundColor:'#ffffff'}}/>

            </View>
            

        </View>
    )
}
const styles=StyleSheet.create({
    main:{
        width:horizontalScale(480)
    },
    texthead:{
        fontSize:moderateScale(24),
        fontWeight:'700',
        color:'#000000',
        paddingVertical:verticalScale(16)
    },
    drugs:{
        width:'100%',
        height:verticalScale(56),
        justifyContent:'center', paddingHorizontal:horizontalScale(16),
        paddingVertical:verticalScale(8),
        marginBottom:verticalScale(4),
        borderWidth:0.5,
        borderRadius:4,
        borderColor:'#4BA5FA'


    },
    drugstext:{
        fontSize:moderateScale(14),
        fontWeight:'500',
        color:'#000000'
    },
    searchbar:{
        paddingVertical:verticalScale(16)

    }
})
export default EmptyView;