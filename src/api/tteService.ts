import axiosInstance from "../utils/axios";

// Riwayat Pegawai TTD (Main TTE operations)
export const getRwPegawaiTTDList = (params?: any) => axiosInstance.get("/kepegawaian/rwpegawaittd", { params });
export const getRwPegawaiTTDToken = () => axiosInstance.get("/kepegawaian/rwpegawaittd/token");
export const getRwPegawaiTTDDetail = (id: string | number) => axiosInstance.get(`/kepegawaian/rwpegawaittd/${id}`);
export const getRwPegawaiTTDFile = (id: string | number) => axiosInstance.get(`/kepegawaian/rwpegawaittd/${id}/file`);
export const createRwPegawaiTTD = (data: any) => axiosInstance.post("/kepegawaian/rwpegawaittd", data);
export const updateRwPegawaiTTD = (id: string | number, data: any) => axiosInstance.patch(`/kepegawaian/rwpegawaittd/${id}`, data);
export const deleteRwPegawaiTTD = (id: string | number) => axiosInstance.delete(`/kepegawaian/rwpegawaittd/${id}`);

// Hak Akses TTD
export const getHakAksesTTD = () => axiosInstance.get("/kepegawaian/ttd/hak-akses");
export const updateHakAksesTTD = (data: any) => axiosInstance.post("/kepegawaian/ttd/hak-akses", data);
export const deleteHakAksesTTD = (id: string | number) => axiosInstance.delete(`/kepegawaian/ttd/hak-akses/${id}`);
