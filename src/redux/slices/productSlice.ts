import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = "http://localhost:5000/api";

interface ProductState {
  data: any;
  loading: boolean;
  error: string | null;
  productDetails: any;
  productDetailsLoading: boolean;
  productDetailsError: string | null;
  productUpdateSuccess: any;
  productUpdateLoading: boolean;
  productUpdateError: string | null;
  productDeleteSuccess: boolean;
  productDeleteLoading: boolean;
  productDeleteError: boolean;
  productCreateSuccess: boolean;
  productCreateLoading: boolean;
  productCreateError: boolean;
}

const initialState: ProductState = {
  data: null,
  loading: false,
  error: null,
  productDetails: null,
  productDetailsLoading: false,
  productDetailsError: null,
  productUpdateSuccess: null,
  productUpdateLoading: false,
  productUpdateError: null,
  productDeleteSuccess: false,
  productDeleteLoading: false,
  productDeleteError:false,
  productCreateSuccess: false,
  productCreateLoading: false,
  productCreateError: false,
};

export const productList = createAsyncThunk(
  'product/productList',
  async ({searchQuery }: {searchQuery: any }, { rejectWithValue, getState }) => {
    try {
      const access_token = 'token';
      const response = await axios.get(`${BASE_URL}/blogs/list?name=${searchQuery}`, {
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

export const productCreate = createAsyncThunk(
  'product/productCreate',
  async ({ product }: { product: any }, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/blogs/create`,
        product,
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

export const productDetails = createAsyncThunk(
  'product/productDetails',
  async ({ id }: { id: string }, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/blogs/details/${id}`, {
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

export const productUpdate = createAsyncThunk(
  'product/productUpdate',
  async (
    { id, updatedProduct }: { id: string; updatedProduct: any },
    { getState, rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${BASE_URL}/blogs/update/${id}`,
        updatedProduct,
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

export const productDelete = createAsyncThunk(
  'productMember/productMemberDelete',
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/blogs/${id}`, {
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
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productList.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(productList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(productDetails.pending, (state) => {
        state.productDetailsLoading = true;
        state.productDetailsError = null;
      })
      .addCase(
        productDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.productDetailsLoading = false;
          state.productDetails = action.payload;
        },
      )
      .addCase(productDetails.rejected, (state, action) => {
        state.productDetailsLoading = false;
        state.productDetailsError = action.payload as string;
      })
      .addCase(productUpdate.pending, (state) => {
        state.productUpdateLoading = true;
        state.productUpdateError = null;
      })
      .addCase(
        productUpdate.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.productUpdateLoading = false;
          state.productUpdateSuccess = action.payload;
        },
      )
      .addCase(productUpdate.rejected, (state, action) => {
        state.productUpdateLoading = false;
        state.productUpdateError = action.payload as string;
      })
      .addCase(productDelete.pending, (state) => {
        state.productDeleteLoading = true;
        state.productDeleteError = false;
      })
      .addCase(
        productDelete.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.productDeleteLoading = false;
          state.productDeleteSuccess = true;
        },
      )
      .addCase(productDelete.rejected, (state, action) => {
        state.productDeleteLoading = false;
        state.productDeleteError = true;
      })
      .addCase(productCreate.pending, (state) => {
        state.productCreateLoading = true;
        state.productCreateError = false;
      })
      .addCase(productCreate.fulfilled, (state, action: PayloadAction<any>) => {
        state.productCreateLoading = false;
        state.productCreateSuccess = true;
      })
      .addCase(productCreate.rejected, (state, action) => {
        state.productCreateLoading = false;
        state.productCreateError = true;
      });

  },
});

// Export actions and reducer
export const productactions = productSlice.actions;
export default productSlice.reducer;
