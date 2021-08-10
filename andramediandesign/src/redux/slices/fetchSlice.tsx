//All data fetching happens here.
//Stage 1 type introduction and initialState configuration.
//Stage 2 asyncThunk function to call the APIs through Axios Interceptor. No TOKEN CHECK 🤝
//Stage 3 Reducers.
//Stage 4 asyncThunk responses handling.

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../axiosInterceptor";

//Setting a type check for properties in initialState object.
//This helps to prevent mutation on properties from different components.
interface states {
  data: [];
  state: string;
  error: string;
}

//Setting the type specification on the initialState object.
//This helps to prevent mutation on properties from different components.
interface fetchStat {
  refresh: boolean;
  annualrain: states;
  slums: states;
  population: states;
  months: states;
  errorState: boolean;
}

//Configuring the main state for this slice.
const initialState: fetchStat = {
  refresh: false,
  errorState: false,
  annualrain: {
    data: [],
    state: "empty",
    error: "",
  },
  slums: {
    data: [],
    state: "empty",
    error: "",
  },
  population: {
    data: [],
    state: "empty",
    error: "",
  },
  months: {
    data: [],
    state: "empty",
    error: "",
  },
};

//AsyncThunk function to read 'annualrain' data from data store.
//Benefits of using asyncThunk in this case is easy API response handeling.
export const fetchAnnualrainData = createAsyncThunk(
  //Name of the action to be monitored in Redux console.
  "fetchData/AnnualRainData",
  //Dicunstructing 'thunkAPI' and grabing 'rejectWithValue' that we will need
  //for error handeling.
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInterceptor().get("annualrain");
      return response.data.annualRain;
    } catch (err) {
      //Rejecting the action so we can change the state on error for each asyncThunk action.
      return rejectWithValue(err);
    }
  }
);

//AsyncThunk function to read 'slums' data from data store.
//Benefits of using asyncThunk in this case is easy API response handeling.
export const fetchSlumsData = createAsyncThunk(
  //Name of the action to be monitored in Redux console.
  "fetchData/SlumsData",
  //Dicunstructing 'thunkAPI' and grabing 'rejectWithValue' that we will need
  //for error handeling.
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInterceptor().get("slums");
      return response.data.slums;
    } catch (err) {
      //Rejecting the action so we can change the state on error for each asyncThunk action.
      return rejectWithValue(err);
    }
  }
);

//AsyncThunk function to read 'population' data from data store.
//Benefits of using asyncThunk in this case is easy API response handeling.
export const fetchPopulationData = createAsyncThunk(
  //Name of the action to be monitored in Redux console.
  "fetchData/PopulationData",
  //Dicunstructing 'thunkAPI' and grabing 'rejectWithValue' that we will need
  //for error handeling.
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInterceptor().get("population");
      return response.data.population;
    } catch (err) {
      //Rejecting the action so we can change the state on error for each asyncThunk action.
      return rejectWithValue(err);
    }
  }
);

//AsyncThunk function to read 'months' data from data store.
//Benefits of using asyncThunk in this case is easy API response handeling.
export const fetchMonthData = createAsyncThunk(
  //Name of the action to be monitored in Redux console.
  "fetchData/MonthsData",
  //Dicunstructing 'thunkAPI' and grabing 'rejectWithValue' that we will need
  //for error handeling.
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInterceptor().get("months");
      return response.data.monthlyTotal;
    } catch (err) {
      //Rejecting the action so we can change the state on error for each asyncThunk action.
      return rejectWithValue(err);
    }
  }
);

const FetchSlice = createSlice({
  name: "dataFetchSlice",
  initialState,
  reducers: {
    readDataAgain: (state) => {
      state.refresh = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnualrainData.pending, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          annualrain: {
            ...state.annualrain,
            state: "pending",
          },
        };
      })
      .addCase(fetchAnnualrainData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
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
          refresh: false,
          annualrain: {
            ...state.annualrain,
            state: "rejected",
            error: action.payload,
          },
          errorState: true
        };
      })

      .addCase(fetchSlumsData.pending, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          slums: {
            ...state.slums,
            state: "pending",
          },
        };
      })
      .addCase(fetchSlumsData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
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
          refresh: false,
          slums: {
            ...state.slums,
            state: "rejected",
            error: action.payload,
          },
          errorState: true
        };
      })

      .addCase(fetchPopulationData.pending, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          population: {
            ...state.population,
            state: "pending",
            error: action.payload,
          },
        };
      })
      .addCase(fetchPopulationData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
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
          refresh: false,
          population: {
            ...state.population,
            state: "rejected",
            error: action.payload,
          },
          errorState: true
        };
      })

      .addCase(fetchMonthData.pending, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          months: {
            ...state.months,
            state: "pending",
          },
        };
      })
      .addCase(fetchMonthData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          months: {
            ...state.months,
            data: action.payload,
            state: "fulfilled",
          },
        };
      })
      .addCase(fetchMonthData.rejected, (state: RootState, action) => {
        return {
          ...state,
          refresh: false,
          months: {
            ...state.months,
            state: "rejected",
            error: action.payload,
          },
          errorState: true
        };
      });
  },
});

export const { readDataAgain } = FetchSlice.actions;

export default FetchSlice.reducer;
