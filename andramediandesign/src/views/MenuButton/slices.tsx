import { createSlice } from "@reduxjs/toolkit";

interface SliceState{
    entities: []
}

const initialState={
    entities: []
} as SliceState

const menuButtonSlice=createSlice({
    name: 'menuButtonState',
    initialState,
    reducers:{
        fetchMenuIcons: (state: SliceState, action: { payload: 'string'; type: string; })=>{
            console.log(state);
            
            return{
               ...state,
            }
        }
    }
})

export const { } = menuButtonSlice.actions

export default menuButtonSlice.reducer

