import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../axiosInterceptor";

interface states {
  data: [];
  state: string;
}
interface fetchStat {
  annualrain: states;
  slums: states;
  population: states;
  months: states;
}

const initialState: fetchStat = {
  annualrain: {
    data: [],
    state: "empty"
  },
  slums: {
    data: [],
    state: "empty",
  },
  population: {
    data: [],
    state: "empty",
  },
  months: {
    data: [],
    state: "empty",
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnualrainData.pending, (state: RootState, action) => {
        return {
          ...state,
          annualrain: {
            state: "pending",
            data: []
          },
        };
      })
      .addCase(fetchAnnualrainData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          annualrain: {
            data: action.payload,
            state: "fulfilled",
          },
        };
      })

      .addCase(fetchSlumsData.pending, (state: RootState, action) => {
        return {
          ...state,
          slums: {
            state: "pending",
            data: []
          },
        };
      })
      .addCase(fetchSlumsData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          slums: {
            data: action.payload,
            state: "fulfilled",
          },
        };
      })

      .addCase(fetchPopulationData.pending, (state: RootState, action) => {
        return {
          ...state,
          population: {
            state: "pending",
            data: []
          },
        };
      })
      .addCase(fetchPopulationData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          population: {
            data: action.payload,
            state: "fulfilled",
          },
        };
      })

      .addCase(fetchMonthData.pending, (state: RootState, action) => {
        return {
          ...state,
          months: {
            state: "pending",
            data: []
          },
        };
      })
      .addCase(fetchMonthData.fulfilled, (state: RootState, action) => {
        return {
          ...state,
          months: {
            data: action.payload,
            state: "fulfilled",
          },
        };
      });
  },
});

// export {}=FetchSlice.actions;

export default FetchSlice.reducer;
