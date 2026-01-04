import axiosInstance from "../utils/axios";

export const getReferensiAgama = () => axiosInstance.get("/kepegawaian/referensi/agama");
export const getReferensiUnit = () => axiosInstance.get("/kepegawaian/referensi/unit");
export const getReferensiBank = () => axiosInstance.get("/kepegawaian/referensi/ref_bank");
export const getReferensiEselon = () => axiosInstance.get("/kepegawaian/referensi/ref_eselon");
export const getReferensiDiklat = () => axiosInstance.get("/kepegawaian/referensi/ref_diklat");
export const getReferensiGolongan = () => axiosInstance.get("/kepegawaian/referensi/ref_golongan");
export const getReferensiKawin = () => axiosInstance.get("/kepegawaian/referensi/ref_kawin");
export const getReferensiPendidikan = () => axiosInstance.get("/kepegawaian/referensi/ref_pendidikan");
export const getReferensiStatusKeluarga = () => axiosInstance.get("/kepegawaian/referensi/ref_status_keluarga");
export const getReferensiPegawaiJenis = () => axiosInstance.get("/kepegawaian/referensi/ref_pegawai_jenis");
export const getReferensiPekerjaan = () => axiosInstance.get("/kepegawaian/referensi/ref_pekerjaan");

// Add more as needed based on Golang routes.go
