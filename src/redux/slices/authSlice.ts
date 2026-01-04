import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';
import Cookies from 'js-cookie';
import { isMockApi, mockUser } from '../../utils/mockApi';

interface User {
  id: string;
  name: string;
  username: string;
  group: string;
  nip?: string;
  permissions: string[]; // List of module identifiers or specific permission strings
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: isMockApi
    ? mockUser
    : typeof window !== 'undefined' && localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null,
  token: isMockApi ? 'mock-token' : Cookies.get('token') || null,
  isAuthenticated: isMockApi ? true : !!Cookies.get('token'),
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
      if (isMockApi) {
        state.user = mockUser;
        state.token = 'mock-token';
        state.isAuthenticated = true;
        state.error = null;
        return;
      }
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      Cookies.remove('token');
      localStorage.removeItem('user');
    },
    setUser: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
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
        const { token, user } = action.payload;
        state.token = token;
        state.user = user;
        Cookies.set('token', token, { expires: 1 });
        localStorage.setItem('user', JSON.stringify(user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
