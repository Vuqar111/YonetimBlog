import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';

interface AuthState {
  data: any;
  loading: boolean;
  error: string | null;
  userUpdate: any;
  userUpdateLoading: boolean;
  userUpdateError: string | null;
  listUsersData: any;
  listUsersLoading: boolean;
  listUsersError: string | null;
}

const initialState: AuthState = {
  data: null,
  loading: false,
  error: null,
  userUpdate: null,
  userUpdateLoading: false,
  userUpdateError: null,
  listUsersData: null,
  listUsersLoading: false,
  listUsersError: null,
};

export const listUsers = createAsyncThunk(
  `/user/listUser`,
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/users`, {
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


export const detailsUser = createAsyncThunk(
  `/user/details`,
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/users/me`, {
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

export const updateUser = createAsyncThunk(
  `/user/update`,
  async (
    { updatedUser }: { updatedUser: any },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_URL}/users/update`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem('token', response.data.access_token);
      return response.data;
    } catch (error: any) {
      console.log(rejectWithValue(error.response.data));
    }
  }
);

// Create the auth slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(detailsUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(detailsUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(detailsUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(listUsers.pending, (state) => {
        state.listUsersLoading = true;
        state.listUsersError = null;
      })
      .addCase(listUsers.fulfilled, (state, action: PayloadAction<any>) => {
        state.listUsersLoading = false;
        state.listUsersData = action.payload;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.listUsersLoading = false;
        state.listUsersError = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.userUpdateLoading = true;
        state.userUpdateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.userUpdateLoading = false;
        state.userUpdate = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userUpdateLoading = false;
        state.userUpdateError = action.payload as string;
      });
  },
});

// Export actions and reducer
export const userActions = userSlice.actions;
export default userSlice.reducer;
