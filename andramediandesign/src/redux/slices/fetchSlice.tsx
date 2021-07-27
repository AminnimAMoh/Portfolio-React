import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../axiosInterceptor";

interface states {
  data: [];
  state: string;
  error: string;
}
interface fetchStat {
  referesh: boolean,
  annualrain: states;
  slums: states;
  population: states;
  months: states;
}

const initialState: fetchStat = {
  referesh: false,
  annualrain: {
    data: [],
    state: "empty",
    error: ''
  },
  slums: {
    data: [],
    state: "empty",
    error: ''
  },
  population: {
    data: [],
    state: "empty",
    error: ''
  },
  months: {
    data: [],
    state: "empty",
    error: ''
  },
};

export const fetchAnnualrainData = createAsyncThunk(
  "fetchData/AnnualRainData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptor().get("annualrain");
      return response.data.annualRain;
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
      return response.data.slums;
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
      return response.data.population;
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
      return response.data.monthlyTotal;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const FetchSlice = createSlice({
  name: "dataFetchSlice",
  initialState,
  reducers: {
    readDataAgain: (state)=>{
      state.referesh=true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnualrainData.pending, (state: RootState, action) => {
        return {
          ...state,
          referesh: false,
          annualrain: {
            ...state.annualrain,
            state: "pending",
          },
        };
      })
      .addCase(fetchAnnualrainData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          referesh: false,
          annualrain: {
            ...state.annualrain,
            data: action.payload,
            state: "fulfilled",
          },
        };
      })
      .addCase(fetchAnnualrainData.rejected, (state: RootState, action) => {
        return {
          ...state,
          referesh: false,
          annualrain: {
            ...state.annualrain,
            state: "rejected",
            error: action.payload
          },
        };
      })

      .addCase(fetchSlumsData.pending, (state: RootState, action) => {
        return {
          ...state,
          referesh: false,
          slums: {
            ...state.slums,
            state: "pending",
          },
        };
      })
      .addCase(fetchSlumsData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          referesh: false,
          slums: {
            ...state.slums,
            data: action.payload,
            state: "fulfilled",
          },
        };
      })
      .addCase(fetchSlumsData.rejected, (state: RootState, action) => {
        return {
          ...state,
          referesh: false,
          slums: {
            ...state.slums,
            state: "rejected",
            error: action.payload
          },
        };
      })

      .addCase(fetchPopulationData.pending, (state: RootState, action) => {
        return {
          ...state,
          referesh: false,
          population: {
            ...state.population,
            state: "pending",
            error: action.payload
          },
        };
      })
      .addCase(fetchPopulationData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          referesh: false,
          population: {
            ...state.population,
            data: action.payload,
            state: "fulfilled",
          },
        };
      })
      .addCase(fetchPopulationData.rejected, (state: RootState, action) => {
        return {
          ...state,
          referesh: false,
          population: {
            ...state.population,
            state: "rejected",
            error: action.payload
          },
        };
      })

      .addCase(fetchMonthData.pending, (state: RootState, action) => {
        return {
          ...state,
          referesh: false,
          months:{
            ...state.months,
            state: 'pending'
          }
        }
      })
      .addCase(fetchMonthData.fulfilled, (state: RootState, action) => {
        return{
          ...state,
          referesh: false,
          months:{
            ...state.months,
            data: action.payload,
            state: 'fulfilled'
          }
        }
      })     
      .addCase(fetchMonthData.rejected, (state: RootState, action) => {
        return {
          ...state,
          referesh: false,
          months:{
            ...state.months,
            state: 'rejected',
            error: action.payload
          }
        }
      });
  },
});

export const {readDataAgain}=FetchSlice.actions;

export default FetchSlice.reducer;
