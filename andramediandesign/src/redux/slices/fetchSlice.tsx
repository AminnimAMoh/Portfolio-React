import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// import axiosInterceptor from "../../axiosInterceptor";

export const fetchAnnualrainData=createAsyncThunk(
    'fetchData/AnnualRainData',
    async (_, thunkAPI) => {
        try{
            const response=axios.get('http://localhost:3000/annual_rain')
            return response
        }catch (err){
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const initialState={
    annualrain:{
        state: '',
        data: []
    }
}

const FetchSlice=createSlice({
    name: 'dataFetchSlice',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(fetchAnnualrainData.fulfilled, (state: RootState, action)=>{
            console.log(action.payload);
        })
    }
})

// export {}=FetchSlice.actions;

export default FetchSlice.reducer;