import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import referensiReducer from './slices/referensiSlice';
import riwayatReducer from './slices/riwayatSlice';
import rekapReducer from './slices/rekapSlice';
import absensiReducer from './slices/absensiSlice';
import tteReducer from './slices/tteSlice';
import cmsReducer from './slices/cmsSlice';
import reportingReducer from './slices/reportingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    referensi: referensiReducer,
    riwayat: riwayatReducer,
    rekap: rekapReducer,
    absensi: absensiReducer,
    tte: tteReducer,
    cms: cmsReducer,
    reporting: reportingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
