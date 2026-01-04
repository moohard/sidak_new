import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  username: string;
  group: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: Cookies.get('token') || null,
  isAuthenticated: !!Cookies.get('token'),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: any, { rejectWithValue }) => {
    try {
      // Adjust endpoint based on backend route analysis. Assuming /login based on legacy code.
      // If the backend uses a different path, this needs to be updated.
      // Legacy code was: $this->doService("POST", "login", $paramLogin);
      // Backend URL in .env.local is API_URL. So axiosInstance will prepend it.
      const response = await axiosInstance.post('/login', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      Cookies.remove('token');
    },
    setUser: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        // Adjust payload structure based on actual API response
        // Assuming response.data contains { token: '...', user: { ... } }
        const { token, user } = action.payload;
        state.token = token;
        state.user = user;
        Cookies.set('token', token, { expires: 1 }); // Expires in 1 day
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
