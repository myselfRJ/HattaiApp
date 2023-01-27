import {Dimensions} from 'react-native';
const {width,height}=Dimensions.get('window');

const guidelineBaseWidth = 834;
const guidelineBaseHeight = 1194;

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };
