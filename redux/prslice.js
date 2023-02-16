import { createSlice } from "@reduxjs/toolkit";

const practionerDataSlice=createSlice({
    name:'practionerData',
    initialState:{
        data:[]
    },
    reducers:{
        prData(state,action){
            state.data=action.payload
            

            

        }


    }


})

export const { prData } = practionerDataSlice.actions
export default practionerDataSlice.reducer