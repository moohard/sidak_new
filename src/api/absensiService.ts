import axiosInstance from "../utils/axios";

// Absensi & Kehadiran
export const getAbsensiList = (params?: any) => axiosInstance.get("/kepegawaian/absensi", { params });
export const getAbsensiHarian = (params?: any) => axiosInstance.get("/kepegawaian/absensi/harian", { params });
export const getAbsensiKehadiranList = (params?: any) => axiosInstance.get("/kepegawaian/absensi/kehadiran", { params });
export const getAbsensiDetail = (id: string | number) => axiosInstance.get(`/kepegawaian/absensi/${id}`);
export const getAbsensiFile = (id: string | number, tipe: string) => axiosInstance.get(`/kepegawaian/absensi/${id}/${tipe}`);

// Pengajuan Absensi (Izin/Cuti)
export const getPengajuanAbsensiList = (params?: any) => axiosInstance.get("/kepegawaian/pengajuan_absensi", { params });
export const createPengajuanAbsensi = (data: any) => axiosInstance.post("/kepegawaian/pengajuan_absensi", data);
export const getPengajuanAbsensiDetail = (id: string | number) => axiosInstance.get(`/kepegawaian/pengajuan_absensi/${id}`);
export const deletePengajuanAbsensi = (id: string | number) => axiosInstance.delete(`/kepegawaian/pengajuan_absensi/${id}`);

// Uang Makan
export const getUangMakanList = (params?: any) => axiosInstance.get("/kepegawaian/uang_makan", { params });
export const getUangMakanDetail = (id: string | number) => axiosInstance.get(`/kepegawaian/uang_makan/${id}`);
