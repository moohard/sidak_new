import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as referensiApi from "../../api/referensiService";

interface ReferensiState {
  agama: any[];
  unit: any[];
  bank: any[];
  eselon: any[];
  diklat: any[];
  golongan: any[];
  kawin: any[];
  pendidikan: any[];
  statusKeluarga: any[];
  pegawaiJenis: any[];
  pekerjaan: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ReferensiState = {
  agama: [],
  unit: [],
  bank: [],
  eselon: [],
  diklat: [],
  golongan: [],
  kawin: [],
  pendidikan: [],
  statusKeluarga: [],
  pegawaiJenis: [],
  pekerjaan: [],
  loading: false,
  error: null,
};

export const fetchAllReferensi = createAsyncThunk(
  "referensi/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const [
        agama, unit, bank, eselon, diklat, golongan, kawin, pendidikan, statusKeluarga, pegawaiJenis, pekerjaan
      ] = await Promise.all([
        referensiApi.getReferensiAgama(),
        referensiApi.getReferensiUnit(),
        referensiApi.getReferensiBank(),
        referensiApi.getReferensiEselon(),
        referensiApi.getReferensiDiklat(),
        referensiApi.getReferensiGolongan(),
        referensiApi.getReferensiKawin(),
        referensiApi.getReferensiPendidikan(),
        referensiApi.getReferensiStatusKeluarga(),
        referensiApi.getReferensiPegawaiJenis(),
        referensiApi.getReferensiPekerjaan(),
      ]);

      return {
        agama: agama.data.data,
        unit: unit.data.data,
        bank: bank.data.data,
        eselon: eselon.data.data,
        diklat: diklat.data.data,
        golongan: golongan.data.data,
        kawin: kawin.data.data,
        pendidikan: pendidikan.data.data,
        statusKeluarga: statusKeluarga.data.data,
        pegawaiJenis: pegawaiJenis.data.data,
        pekerjaan: pekerjaan.data.data,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch referensi");
    }
  }
);

const referensiSlice = createSlice({
  name: "referensi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllReferensi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReferensi.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchAllReferensi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default referensiSlice.reducer;
