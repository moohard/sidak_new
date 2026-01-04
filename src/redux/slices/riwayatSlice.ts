import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as riwayatApi from "../../api/riwayatService";

interface RiwayatState {
  jabatan: any[];
  pangkat: any[];
  pendidikan: any[];
  diklat: any[];
  tandaJasa: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RiwayatState = {
  jabatan: [],
  pangkat: [],
  pendidikan: [],
  diklat: [],
  tandaJasa: [],
  loading: false,
  error: null,
};

export const fetchAllRiwayat = createAsyncThunk(
  "riwayat/fetchAll",
  async (nip: string, { rejectWithValue }) => {
    try {
      const params = { nip };
      const [jabatan, pangkat, pendidikan, diklat, tandaJasa] = await Promise.all([
        riwayatApi.getRwJabatanList(params),
        riwayatApi.getRwPangkatList(params),
        riwayatApi.getRwPendidikanList(params),
        riwayatApi.getRwDiklatList(params),
        riwayatApi.getRwTandaJasaList(params),
      ]);

      return {
        jabatan: jabatan.data.data || [],
        pangkat: pangkat.data.data || [],
        pendidikan: pendidikan.data.data || [],
        diklat: diklat.data.data || [],
        tandaJasa: tandaJasa.data.data || [],
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch riwayat data");
    }
  }
);

const riwayatSlice = createSlice({
  name: "riwayat",
  initialState,
  reducers: {
    clearRiwayat: (state) => {
      state.jabatan = [];
      state.pangkat = [];
      state.pendidikan = [];
      state.diklat = [];
      state.tandaJasa = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRiwayat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRiwayat.fulfilled, (state, action) => {
        state.loading = false;
        state.jabatan = action.payload.jabatan;
        state.pangkat = action.payload.pangkat;
        state.pendidikan = action.payload.pendidikan;
        state.diklat = action.payload.diklat;
        state.tandaJasa = action.payload.tandaJasa;
      })
      .addCase(fetchAllRiwayat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRiwayat } = riwayatSlice.actions;
export default riwayatSlice.reducer;
