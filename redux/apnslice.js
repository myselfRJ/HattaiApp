import { createSlice } from "@reduxjs/toolkit";

const apnDataSlice=createSlice({
    name:'apnData',
    initialState:{
        data:[],
        currentapn:''},
    reducers:{
        apnData(state,action){
            state.data=action.payload

        },
        currentApn(state,action){
            state.currentapn=action.payload
        }
       


    }


})

export const { apnData,currentApn } = apnDataSlice.actions
export default apnDataSlice.reducer