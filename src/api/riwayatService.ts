import axiosInstance from "../utils/axios";

// Riwayat Jabatan
export const getRwJabatanList = (params?: any) => axiosInstance.get("/kepegawaian/rwjabatan", { params });
export const getRwJabatanDetail = (id: string | number) => axiosInstance.get(`/kepegawaian/rwjabatan/${id}`);
export const createRwJabatan = (data: any) => axiosInstance.post("/kepegawaian/rwjabatan", data);
export const updateRwJabatan = (id: string | number, data: any) => axiosInstance.patch(`/kepegawaian/rwjabatan/${id}`, data);
export const deleteRwJabatan = (id: string | number) => axiosInstance.delete(`/kepegawaian/rwjabatan/${id}`);

// Riwayat Pangkat
export const getRwPangkatList = (params?: any) => axiosInstance.get("/kepegawaian/rwpangkat", { params });
export const getRwPangkatDetail = (id: string | number) => axiosInstance.get(`/kepegawaian/rwpangkat/${id}`);
export const createRwPangkat = (data: any) => axiosInstance.post("/kepegawaian/rwpangkat", data);
export const updateRwPangkat = (id: string | number, data: any) => axiosInstance.patch(`/kepegawaian/rwpangkat/${id}`, data);
export const deleteRwPangkat = (id: string | number) => axiosInstance.delete(`/kepegawaian/rwpangkat/${id}`);

// Riwayat Pendidikan
export const getRwPendidikanList = (params?: any) => axiosInstance.get("/kepegawaian/rwpendidikan", { params });
export const getRwPendidikanDetail = (id: string | number) => axiosInstance.get(`/kepegawaian/rwpendidikan/${id}`);
export const createRwPendidikan = (data: any) => axiosInstance.post("/kepegawaian/rwpendidikan", data);
export const updateRwPendidikan = (id: string | number, data: any) => axiosInstance.patch(`/kepegawaian/rwpendidikan/${id}`, data);
export const deleteRwPendidikan = (id: string | number) => axiosInstance.delete(`/kepegawaian/rwpendidikan/${id}`);

// Riwayat Diklat
export const getRwDiklatList = (params?: any) => axiosInstance.get("/kepegawaian/rwdiklat", { params });
export const getRwDiklatDetail = (id: string | number) => axiosInstance.get(`/kepegawaian/rwdiklat/${id}`);
export const createRwDiklat = (data: any) => axiosInstance.post("/kepegawaian/rwdiklat", data);
export const updateRwDiklat = (id: string | number, data: any) => axiosInstance.patch(`/kepegawaian/rwdiklat/${id}`, data);
export const deleteRwDiklat = (id: string | number) => axiosInstance.delete(`/kepegawaian/rwdiklat/${id}`);

// Riwayat Tanda Jasa
export const getRwTandaJasaList = (params?: any) => axiosInstance.get("/kepegawaian/rwtandajasa", { params });
export const getRwTandaJasaDetail = (id: string | number) => axiosInstance.get(`/kepegawaian/rwtandajasa/${id}`);
export const createRwTandaJasa = (data: any) => axiosInstance.post("/kepegawaian/rwtandajasa", data);
export const updateRwTandaJasa = (id: string | number, data: any) => axiosInstance.patch(`/kepegawaian/rwtandajasa/${id}`, data);
export const deleteRwTandaJasa = (id: string | number) => axiosInstance.delete(`/kepegawaian/rwtandajasa/${id}`);
