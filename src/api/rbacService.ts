import axiosInstance from "../utils/axios";

// Management Modul
export const getModulList = (params?: any) => axiosInstance.get("/kepegawaian/modul", { params });
export const getModulNested = () => axiosInstance.get("/kepegawaian/modul/nested");
export const getModulDetail = (id: string | number) => axiosInstance.get(`/kepegawaian/modul/${id}`);
export const createModul = (data: any) => axiosInstance.post("/kepegawaian/modul", data);
export const updateModul = (id: string | number, data: any) => axiosInstance.patch(`/kepegawaian/modul/${id}`, data);
export const deleteModul = (id: string | number) => axiosInstance.delete(`/kepegawaian/modul/${id}`);

// Management Groups (Role)
export const getGroupsList = (params?: any) => axiosInstance.get("/kepegawaian/groups-pegawai", { params });
export const updateGroup = (id: string | number, data: any) => axiosInstance.patch(`/kepegawaian/groups-pegawai/${id}`, data);
export const getGroupModul = (id: string | number) => axiosInstance.get(`/kepegawaian/groups/${id}/modul`);
export const updateGroupModul = (id: string | number, data: any) => axiosInstance.put(`/kepegawaian/groups/${id}/modul`, data);
export const getGroupUnit = (id: string | number) => axiosInstance.get(`/kepegawaian/groups/${id}/unit`);
export const updateGroupUnit = (id: string | number, data: any) => axiosInstance.put(`/kepegawaian/groups/${id}/unit`, data);

// User Management & Resets
export const getUserResetList = (params?: any) => axiosInstance.get("/kepegawaian/user_reset", { params });
export const getUserResetDetail = (id: string | number) => axiosInstance.get(`/kepegawaian/user_reset/${id}`);
export const createUserReset = (data: any) => axiosInstance.post("/kepegawaian/user_reset", data);
export const updateUserReset = (id: string | number, data: any) => axiosInstance.patch(`/kepegawaian/user_reset/${id}`, data);
export const deleteUserReset = (id: string | number) => axiosInstance.delete(`/kepegawaian/user_reset/${id}`);
