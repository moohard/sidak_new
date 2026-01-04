import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as tteApi from "../../api/tteService";

interface TTEState {
  queue: any[];
  history: any[];
  hakAkses: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TTEState = {
  queue: [],
  history: [],
  hakAkses: [],
  loading: false,
  error: null,
};

export const fetchTTEQueue = createAsyncThunk(
  "tte/fetchQueue",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await tteApi.getRwPegawaiTTDList({ ...params, status: "Pending" });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch TTE queue");
    }
  }
);

export const fetchTTEHistory = createAsyncThunk(
  "tte/fetchHistory",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await tteApi.getRwPegawaiTTDList({ ...params, status: "Completed" });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch TTE history");
    }
  }
);

const tteSlice = createSlice({
  name: "tte",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTTEQueue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTTEQueue.fulfilled, (state, action) => {
        state.loading = false;
        state.queue = action.payload;
      })
      .addCase(fetchTTEQueue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTTEHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      });
  },
});

export default tteSlice.reducer;
