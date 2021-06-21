import { createSlice } from "@reduxjs/toolkit";

const initialState={
    containerState: false
}

const buttonActionSlice=createSlice({
    name: 'buttonAction',
    initialState,
    reducers:{
        containerStateToggle(state, action){

        }
    }
})

export const {containerStateToggle}= buttonActionSlice.actions

export default buttonActionSlice.reducer


