import axiosInstance from "../utils/axios";

export const getRekapDashboard = (params?: any) => axiosInstance.get("/kepegawaian/rekap/dashboard", { params });
export const getRekapPangkat = (params?: any) => axiosInstance.get("/kepegawaian/rekap/pangkat", { params });
export const getRekapPendidikan = (params?: any) => axiosInstance.get("/kepegawaian/rekap/pendidikan", { params });
export const getRekapJenisKelamin = (params?: any) => axiosInstance.get("/kepegawaian/rekap/jenis_kelamin", { params });
export const getRekapUsia = (params?: any) => axiosInstance.get("/kepegawaian/rekap/usia", { params });
export const getRekapJabatan = (params?: any) => axiosInstance.get("/kepegawaian/rekap/jabatan", { params });
export const getRekapUnitTree = (params?: any) => axiosInstance.get("/kepegawaian/rekap/unit_tree", { params });
