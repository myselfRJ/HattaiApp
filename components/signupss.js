import { StyleSheet } from "react-native";
import { moderateScale ,verticalScale,horizontalScale} from "../screens/dim";
export default StyleSheet.create({
    main:{
     
      justifyContent:'center',
      alignItems:'center',
      paddingVertical:verticalScale(16)
      
    },
    child:{
      margin:verticalScale(8),
    },
    text: {
      color: 'black',
      fontSize: moderateScale(32),
      lineHeight: 38,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text2: {
      color: 'black',
      fontSize: moderateScale(18),
      lineHeight: 24,
      color: '#4BA5FA',
      fontWeight: '400',
      textAlign: 'center',
    },
    img:{
      width:horizontalScale(100),
      height:horizontalScale(100),
      borderWidth:2,
      justifyContent:'center',
      alignItems:'center',
      borderColor:'#4BA5FA',
      marginVertical:verticalScale(20),
      marginHorizontal:horizontalScale(8),
      borderRadius:4


    },
    editprofile:{
      marginHorizontal:horizontalScale(98)
    }
})

