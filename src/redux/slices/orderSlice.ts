import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = "https://kabelmarket-backend.vercel.app/api";

interface OrderState {
  data: any;
  loading: boolean;
  error: string | null;
  orderDetails: any;
  orderDetailsLoading: boolean;
  orderDetailsError: string | null;
  orderUpdate: any;
  orderUpdateLoading: boolean;
  orderUpdateError: string | null;
  orderDelete: any;
  orderDeleteLoading: boolean;
  orderDeleteError: string | null;
}

const initialState: OrderState = {
  data: null,
  loading: false,
  error: null,
  orderDetails: null,
  orderDetailsLoading: false,
  orderDetailsError: null,
  orderUpdate: null,
  orderUpdateLoading: false,
  orderUpdateError: null,
  orderDelete: null,
  orderDeleteLoading: false,
  orderDeleteError: null,
};

export const orderList = createAsyncThunk(
  'order/orderList',
  async (_, { rejectWithValue, getState }) => {
    try {
      const access_token = localStorage.getItem('token');
      const response = await axios.get(`https://kabelmarket-backend.vercel.app/api/order/list`, {
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

export const adminOrderCreate = createAsyncThunk(
  'order/orderCreate',
  async (order: { order: any}, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `https://kabelmarket-backend.vercel.app/api/order/admin/create`,
        order,
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

export const orderDetails = createAsyncThunk(
  'order/orderDetails',
  async ({ id }: { id: string }, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/order/details/${id}`, {
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

export const orderUpdate = createAsyncThunk(
  'order/orderUpdate',
  async (
    { id, updatedOrder }: { id: string; updatedOrder: any },
    { getState, rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${BASE_URL}/order/update/${id}`,
        updatedOrder,
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

export const orderDelete = createAsyncThunk(
  'orderMember/orderMemberDelete',
  async ({ id }: { id: number }, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/order/delete/${id}`, {
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
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderList.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(orderList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(orderDetails.pending, (state) => {
        state.orderDetailsLoading = true;
        state.orderDetailsError = null;
      })
      .addCase(
        orderDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.orderDetailsLoading = false;
          state.orderDetails = action.payload;
        },
      )
      .addCase(orderDetails.rejected, (state, action) => {
        state.orderDetailsLoading = false;
        state.orderDetailsError = action.payload as string;
      })
      .addCase(orderUpdate.pending, (state) => {
        state.orderUpdateLoading = true;
        state.orderUpdateError = null;
      })
      .addCase(
        orderUpdate.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.orderUpdateLoading = false;
          state.orderUpdate = action.payload;
        },
      )
      .addCase(orderUpdate.rejected, (state, action) => {
        state.orderUpdateLoading = false;
        state.orderUpdateError = action.payload as string;
      })
      .addCase(orderDelete.pending, (state) => {
        state.orderDeleteLoading = true;
        state.orderDeleteError = null;
      })
      .addCase(
        orderDelete.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.orderDeleteLoading = false;
          state.orderDelete = action.payload;
        },
      )
      .addCase(orderDelete.rejected, (state, action) => {
        state.orderDeleteLoading = false;
        state.orderDeleteError = action.payload as string;
      });
  },
});

// Export actions and reducer
export const orderactions = orderSlice.actions;
export default orderSlice.reducer;
