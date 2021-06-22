import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState={
      containerState: false,
      buttonTrigered: '',
      renderPage: ''
}

const buttonActionSlice=createSlice({
    name: 'buttonAction',
    initialState,
    reducers:{
        containerStateToggle(state: any, action: PayloadAction<string>){
            return{
                ...state,
                containerState: !state.containerState,
                buttonTrigered: action.payload,
                renderPage: action.payload
            }
        }
    }
})

export const {containerStateToggle}= buttonActionSlice.actions

export default buttonActionSlice.reducer


