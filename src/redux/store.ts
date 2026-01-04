import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import referensiReducer from './slices/referensiSlice';
import riwayatReducer from './slices/riwayatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    referensi: referensiReducer,
    riwayat: riwayatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
