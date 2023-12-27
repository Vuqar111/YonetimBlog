import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = "https://kabelmarket-backend.vercel.app/api";
interface CategoryState {
  data: any;
  loading: boolean;
  error: string | null;
  categoryDetails: any;
  categoryDetailsLoading: boolean;
  categoryDetailsError: string | null;
  categoryUpdate: any;
  categoryUpdateLoading: boolean;
  categoryUpdateError: string | null;
  categoryDelete: any;
  categoryDeleteLoading: boolean;
  categoryDeleteError: string | null;
}

const initialState: CategoryState = {
  data: null,
  loading: false,
  error: null,
  categoryDetails: null,
  categoryDetailsLoading: false,
  categoryDetailsError: null,
  categoryUpdate: null,
  categoryUpdateLoading: false,
  categoryUpdateError: null,
  categoryDelete: null,
  categoryDeleteLoading: false,
  categoryDeleteError: null,
};

export const categoryList = createAsyncThunk(
  'category/categoryList',
  async (_, { rejectWithValue, getState }) => {
    try {
      const access_token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/category/list`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(rejectWithValue(error.response.data));
    }
  },
);

export const categoryCreate = createAsyncThunk(
  'category/categoryCreate',
  async ({ category }: { category: any }, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/category/create`,
        category,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.log(rejectWithValue(error.response.data));
    }
  },
);

export const categoryDetails = createAsyncThunk(
  'category/categoryDetails',
  async ({ id }: { id: number }, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/category/details/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(rejectWithValue(error.response.data));
    }
  },
);

export const categoryUpdate = createAsyncThunk(
  'category/categoryUpdate',
  async (
    { id, updatedCategory }: { id: number; updatedCategory: any },
    { getState, rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${BASE_URL}/category/update/${id}`,
        updatedCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.log(rejectWithValue(error.response.data));
    }
  },
);

export const categoryDelete = createAsyncThunk(
  'categoryMember/categoryMemberDelete',
  async ({ id }: { id: number }, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/category/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(rejectWithValue(error.response.data));
    }
  },
);

// Create the auth slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(categoryList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categoryList.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(categoryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(categoryDetails.pending, (state) => {
        state.categoryDetailsLoading = true;
        state.categoryDetailsError = null;
      })
      .addCase(
        categoryDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.categoryDetailsLoading = false;
          state.categoryDetails = action.payload;
        },
      )
      .addCase(categoryDetails.rejected, (state, action) => {
        state.categoryDetailsLoading = false;
        state.categoryDetailsError = action.payload as string;
      })
      .addCase(categoryUpdate.pending, (state) => {
        state.categoryUpdateLoading = true;
        state.categoryUpdateError = null;
      })
      .addCase(
        categoryUpdate.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.categoryUpdateLoading = false;
          state.categoryUpdate = action.payload;
        },
      )
      .addCase(categoryUpdate.rejected, (state, action) => {
        state.categoryUpdateLoading = false;
        state.categoryUpdateError = action.payload as string;
      })
      .addCase(categoryDelete.pending, (state) => {
        state.categoryDeleteLoading = true;
        state.categoryDeleteError = null;
      })
      .addCase(
        categoryDelete.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.categoryDeleteLoading = false;
          state.categoryDelete = action.payload;
        },
      )
      .addCase(categoryDelete.rejected, (state, action) => {
        state.categoryDeleteLoading = false;
        state.categoryDeleteError = action.payload as string;
      });
  },
});

// Export actions and reducer
export const categoryctions = categorySlice.actions;
export default categorySlice.reducer;
