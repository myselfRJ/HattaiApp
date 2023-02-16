import { createSlice } from "@reduxjs/toolkit";

const patientDataSlice=createSlice({
    name:'patientData',
    initialState:{
        data:[],
        currentpatient:''},
    reducers:{
        patientData(state,action){
            state.data=action.payload

        },
        currentpatient(state,action){
            state.currentpatient=action.payload
        }
       


    }


})

export const { patientData,currentpatient } = patientDataSlice.actions
export default patientDataSlice.reducer