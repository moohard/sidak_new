import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as absensiApi from "../../api/absensiService";

interface AbsensiState {
  harian: any[];
  pengajuan: any[];
  uangMakan: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AbsensiState = {
  harian: [],
  pengajuan: [],
  uangMakan: [],
  loading: false,
  error: null,
};

export const fetchAbsensiHarian = createAsyncThunk(
  "absensi/fetchHarian",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await absensiApi.getAbsensiHarian(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch harian attendance");
    }
  }
);

export const fetchPengajuanAbsensi = createAsyncThunk(
  "absensi/fetchPengajuan",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await absensiApi.getPengajuanAbsensiList(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch leave proposals");
    }
  }
);

const absensiSlice = createSlice({
  name: "absensi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbsensiHarian.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAbsensiHarian.fulfilled, (state, action) => {
        state.loading = false;
        state.harian = action.payload;
      })
      .addCase(fetchAbsensiHarian.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPengajuanAbsensi.fulfilled, (state, action) => {
        state.pengajuan = action.payload;
      });
  },
});

export default absensiSlice.reducer;
