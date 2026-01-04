import axiosInstance from "../utils/axios";

export const getLaporanSDM = (params?: any) => axiosInstance.get("/kepegawaian/laporan/sdm", { params });
export const getLaporanKehadiran = (params?: any) => axiosInstance.get("/kepegawaian/laporan/kehadiran", { params });
export const getLaporanRekapKehadiran = (params?: any) => axiosInstance.get("/kepegawaian/laporan/rekap_kehadiran", { params });
