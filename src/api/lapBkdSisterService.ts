import axiosInstance from "../utils/axios";

export const getLapBkdSisterList = (params?: any) => axiosInstance.get("/kepegawaian/laporan/bkd_sister", { params });
export const getLapBkdSisterDetail = (id: string | number) => axiosInstance.get(`/kepegawaian/laporan/bkd_sister/${id}`);
export const createLapBkdSister = (data: any) => axiosInstance.post("/kepegawaian/laporan/bkd_sister", data);
export const updateLapBkdSister = (id: string | number, data: any) => axiosInstance.patch(`/kepegawaian/laporan/bkd_sister/${id}`, data);
export const deleteLapBkdSister = (id: string | number) => axiosInstance.delete(`/kepegawaian/laporan/bkd_sister/${id}`);
export const uploadLapBkdSister = (formData: FormData) => axiosInstance.post("/kepegawaian/laporan/bkd_sister/upload", formData, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
});
