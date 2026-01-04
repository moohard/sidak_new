import axiosInstance from "../utils/axios";

/**
 * Generic service to handle CRUD operations for various reference tables.
 * @param entity The endpoint segment for the reference (e.g., 'ref_bank', 'agama')
 */
export const getGenericList = (entity: string, params?: any) => {
  return axiosInstance.get(`/kepegawaian/referensi/${entity}`, { params });
};

export const getGenericDetail = (entity: string, id: string | number) => {
  return axiosInstance.get(`/kepegawaian/referensi/${entity}/${id}`);
};

export const createGeneric = (entity: string, data: any) => {
  return axiosInstance.post(`/kepegawaian/referensi/${entity}`, data);
};

export const updateGeneric = (entity: string, id: string | number, data: any) => {
  return axiosInstance.patch(`/kepegawaian/referensi/${entity}/${id}`, data);
};

export const deleteGeneric = (entity: string, id: string | number) => {
  return axiosInstance.delete(`/kepegawaian/referensi/${entity}/${id}`);
};

// For entities outside /referensi/ like 'modul' or 'groups-pegawai'
export const getBaseList = (entity: string, params?: any) => {
  return axiosInstance.get(`/kepegawaian/${entity}`, { params });
};
