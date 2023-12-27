// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice'; 
import userReducer from './slices/userSlice';
import statisticsReducer from './slices/statisticsSlice';
import orderReducer from './slices/orderSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    products: productReducer,
    users: userReducer,
    statistics: statisticsReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;