import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as rekapApi from "../../api/rekapService";

interface RekapState {
  dashboard: any;
  pangkat: any[];
  pendidikan: any[];
  jenisKelamin: any[];
  usia: any[];
  jabatan: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RekapState = {
  dashboard: null,
  pangkat: [],
  pendidikan: [],
  jenisKelamin: [],
  usia: [],
  jabatan: [],
  loading: false,
  error: null,
};

export const fetchRekapDashboard = createAsyncThunk(
  "rekap/fetchDashboard",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await rekapApi.getRekapDashboard(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch rekap dashboard");
    }
  }
);

export const fetchRekapGolongan = createAsyncThunk(
  "rekap/fetchGolongan",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await rekapApi.getRekapPangkat(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch rekap golongan");
    }
  }
);

export const fetchRekapPendidikan = createAsyncThunk(
  "rekap/fetchPendidikan",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await rekapApi.getRekapPendidikan(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch rekap pendidikan");
    }
  }
);

import * as monitoringApi from "../../api/monitoringService";

export const fetchMonitoringPensiun = createAsyncThunk(
  "rekap/fetchPensiun",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await monitoringApi.getMonitoringPensiun(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch pensiun monitoring");
    }
  }
);

interface RekapState {
  dashboard: any;
  pangkat: any[];
  pendidikan: any[];
  jenisKelamin: any[];
  usia: any[];
  jabatan: any[];
  pensiun: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RekapState = {
  dashboard: null,
  pangkat: [],
  pendidikan: [],
  jenisKelamin: [],
  usia: [],
  jabatan: [],
  pensiun: [],
  loading: false,
  error: null,
};

const rekapSlice = createSlice({
  name: "rekap",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRekapDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRekapDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchRekapGolongan.fulfilled, (state, action) => {
        state.pangkat = action.payload;
      })
      .addCase(fetchRekapPendidikan.fulfilled, (state, action) => {
        state.pendidikan = action.payload;
      })
      .addCase(fetchMonitoringPensiun.fulfilled, (state, action) => {
        state.pensiun = action.payload;
      })
      .addCase(fetchRekapDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default rekapSlice.reducer;
