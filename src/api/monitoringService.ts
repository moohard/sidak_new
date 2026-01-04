import axiosInstance from "../utils/axios";

export const getMonitoringPensiun = (params?: any) => axiosInstance.get("/kepegawaian/monitoring/pensiun", { params });
export const getMonitoringBerkala = (params?: any) => axiosInstance.get("/kepegawaian/monitoring/berkala", { params });
