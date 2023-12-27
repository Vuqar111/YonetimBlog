import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store'; // Update the import based on your store location

const BASE_URL = 'http://localhost:5000/api';

const TOKEN_KEY = 'token';

export interface User {
  name: string;
  surname: string;
  email: string;
  status: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  access_token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SigninResponse {
  user: User;
  token: string;
}

export const loginUser = async (userData: any): Promise<SigninResponse> => {
  try {
    const response = await axios.post<SigninResponse>(
      `${BASE_URL}/users/login`,
      userData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    access_token: localStorage.getItem(TOKEN_KEY) || null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.access_token = null;
      state.isLoggedIn = false;
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/auth/signin';
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    signinRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signinSuccess: (state, action: PayloadAction<SigninResponse>) => {
      state.user = action.payload.user;
      state.access_token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      localStorage.setItem(TOKEN_KEY, action.payload.token);
    },
    signinFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setUser,
  logout,
  setLoading,
  setError,
  clearError,
  signinRequest,
  signinSuccess,
  signinFail,
} = authSlice.actions;

export const signin =
  (
    email: string,
    password: string
  ): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    dispatch(signinRequest());
    try {
      const response = await loginUser({ email, password });
      dispatch(signinSuccess(response));
    } catch (error: any) {
      let message = '';
      if (error.response && error.response.status === 401) {
        message = 'Invalid username or password';
      } else {
        message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      }
      dispatch(signinFail(message));
    }
  };

export const authActions = authSlice.actions;
export default authSlice.reducer;
