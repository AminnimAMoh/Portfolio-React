import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../axiosInterceptor";

export const fetchAnnualrainData = createAsyncThunk(
  "fetchData/AnnualRainData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptor().get("annual_rain");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  annualrain: {
    state: false,
    data: [],
  },
};

const FetchSlice = createSlice({
  name: "dataFetchSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAnnualrainData.fulfilled,
      (state: RootState, action) => {
        return {
          ...state,
          annualrain: {
            data: action.payload,
            state: true,
          },
        };
      }
    );
  },
});

// export {}=FetchSlice.actions;

export default FetchSlice.reducer;
