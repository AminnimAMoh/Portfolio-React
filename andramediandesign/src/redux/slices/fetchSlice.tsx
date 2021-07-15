import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../axiosInterceptor";

interface states {
  data: [];
  state: boolean;
}
interface fetchStat {
  annualrain: states;
  slums: states;
  population: states;
  months: states;
}

const initialState: fetchStat = {
  annualrain: {
    state: false,
    data: [],
  },
  slums: {
    data: [],
    state: false,
  },
  population: {
    data: [],
    state: false,
  },
  months: {
    data: [],
    state: false,
  },
};

export const fetchAnnualrainData = createAsyncThunk(
  "fetchData/AnnualRainData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptor().get("annualrain");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchSlumsData = createAsyncThunk(
  "fetchData/SlumsData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptor().get("slums");
      console.log(response);
      
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchPopulationData = createAsyncThunk(
  "fetchData/PopulationData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptor().get("population");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchMonthData = createAsyncThunk(
  "fetchData/MonthsData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptor().get("months");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const FetchSlice = createSlice({
  name: "dataFetchSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnualrainData.fulfilled, (state: RootState, action) => {
        console.log(action.payload);
        
        return {
          ...state,
          annualrain: {
            data: action.payload,
            state: true,
          }
        };
      })
      .addCase(fetchSlumsData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          slums: {
            data: action.payload,
            state: true,
          }
        };
      })
      .addCase(fetchPopulationData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          population: {
            data: action.payload,
            state: true,
          }
        };
      })
      .addCase(fetchMonthData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          months: {
            data: action.payload,
            state: true,
          }
        };
      });
  },
});

// export {}=FetchSlice.actions;

export default FetchSlice.reducer;
