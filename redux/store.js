import { configureStore } from '@reduxjs/toolkit';
import prReducer from'./prslice';
import apnReducer from './apnslice';
import patientReducer from './patientslice';


export default configureStore({
  reducer: {
    practionerData:prReducer,
    apnData:apnReducer,
    patientData:patientReducer
  },
})