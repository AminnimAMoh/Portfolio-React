import { createSlice } from "@reduxjs/toolkit";

const initialState={
    gridRowToReverce: false
}

const windowSettingsSlice=createSlice({
    name: 'ScreenSettings',
    initialState,
    reducers:{
        rowGridToggleToReverce(state: any){
            state.gridRowToReverce=true;
        }
    }
})

export const {rowGridToggleToReverce}=windowSettingsSlice.actions;

export default windowSettingsSlice.reducer