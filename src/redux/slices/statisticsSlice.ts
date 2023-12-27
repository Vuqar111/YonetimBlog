import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://kabelmarket-backend.vercel.app/api";

interface StatisitcsState {
  data: any; 
  loading: boolean;
  error: string | null;
}

const initialState: StatisitcsState = {
  data: null,
  loading: false,
  error: null,
};

export const adminStatistics = createAsyncThunk(
  "admin/statistics",
  async (_,{getState, rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/statistics/general`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(rejectWithValue(error.response.data));
    }
  }
);



// Create the auth slice
const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminStatistics.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(adminStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

// Export actions and reducer
export const userActions = statisticsSlice.actions;
export default statisticsSlice.reducer;
