import SignatureScreen from "react-native-signature-canvas";
import { useRef,useState } from "react";
import { View } from "react-native";
import {Button} from 'react-native-paper';
import { horizontalScale,verticalScale } from "../screens/dim";
import { PostApi,PostForm } from "../api/postapi";
const WritingPad = ({ text, onOK }) => {
  const [medImage,setMedImage] = useState(null)
  const ref = useRef();

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    console.log("signature");
    setMedImage(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = (data) => {
    console.log("data");
  };
const postImage=()=>{
    medImage.replace("data:image/png;base64,", "")
    data={
        image:medImage
    }
    // ***** below code is for base64 byte image
    {medImage!==null&&PostApi('patient/image/text2', data, false)
    .then(function (response) { console.log(response.data),"converted text"})
    .catch(function(error){console.log(error,"image convert error")})}
    // *****use below code for multipart data *****
    // {medImage!==null&&PostForm('patient/image/text', data, false) 
    // .then(function (response) { console.log(response.data),"converted text"})
    // .catch(function(error){console.log(error,"image convert error")})}
}
  return (
<View style={{height:verticalScale(218),width:horizontalScale(686)}}>
    <SignatureScreen
    style={{width:600}}
      ref={ref}
      onEnd={handleEnd}
      onOK={handleOK}
      onEmpty={handleEmpty}
      onClear={handleClear}
      onGetData={handleData}
      autoClear={true}
      descriptionText={text}
    />
    <Button mode="text" onPress={postImage} > Convert </Button>

</View>
  );
};

export default WritingPad;