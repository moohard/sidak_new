import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as laporanApi from "../../api/laporanService";
import * as monitoringApi from "../../api/monitoringService";
import * as bkdSisterApi from "../../api/lapBkdSisterService";

interface ReportingState {
  sdmLaporan: any[];
  attendanceLaporan: any[];
  rekapKehadiran: any[];
  pensiunMonitoring: any[];
  berkalaMonitoring: any[];
  bkdSisterList: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportingState = {
  sdmLaporan: [],
  attendanceLaporan: [],
  rekapKehadiran: [],
  pensiunMonitoring: [],
  berkalaMonitoring: [],
  bkdSisterList: [],
  loading: false,
  error: null,
};

export const fetchLaporanSDM = createAsyncThunk(
  "reporting/fetchLaporanSDM",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await laporanApi.getLaporanSDM(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch SDM report");
    }
  }
);

export const fetchLaporanKehadiran = createAsyncThunk(
  "reporting/fetchLaporanKehadiran",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await laporanApi.getLaporanKehadiran(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch attendance report");
    }
  }
);

export const fetchMonitoringPensiun = createAsyncThunk(
  "reporting/fetchMonitoringPensiun",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await monitoringApi.getMonitoringPensiun(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch pension monitoring");
    }
  }
);

export const fetchMonitoringBerkala = createAsyncThunk(
  "reporting/fetchMonitoringBerkala",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await monitoringApi.getMonitoringBerkala(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch periodic monitoring");
    }
  }
);

export const fetchBkdSisterList = createAsyncThunk(
  "reporting/fetchBkdSisterList",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await bkdSisterApi.getLapBkdSisterList(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch BKD Sister list");
    }
  }
);

const reportingSlice = createSlice({
  name: "reporting",
  initialState,
  reducers: {
    clearReportingError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )
      .addCase(fetchLaporanSDM.fulfilled, (state, action) => {
        state.loading = false;
        state.sdmLaporan = action.payload;
      })
      .addCase(fetchLaporanKehadiran.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceLaporan = action.payload;
      })
      .addCase(fetchMonitoringPensiun.fulfilled, (state, action) => {
        state.loading = false;
        state.pensiunMonitoring = action.payload;
      })
      .addCase(fetchMonitoringBerkala.fulfilled, (state, action) => {
        state.loading = false;
        state.berkalaMonitoring = action.payload;
      })
      .addCase(fetchBkdSisterList.fulfilled, (state, action) => {
        state.loading = false;
        state.bkdSisterList = action.payload;
      });
  },
});

export const { clearReportingError } = reportingSlice.actions;
export default reportingSlice.reducer;
