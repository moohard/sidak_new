import axiosInstance from "../utils/axios";

export const getSlideList = (params?: any) => {
  return axiosInstance.get(`/kepegawaian/slide`, { params });
};

export const getSlideDetail = (id: string | number) => {
  return axiosInstance.get(`/kepegawaian/slide/${id}`);
};

export const createSlide = (data: any) => {
  return axiosInstance.post(`/kepegawaian/slide`, data);
};

export const updateSlide = (id: string | number, data: any) => {
  return axiosInstance.patch(`/kepegawaian/slide/${id}`, data);
};

export const deleteSlide = (id: string | number) => {
  return axiosInstance.delete(`/kepegawaian/slide/${id}`);
};

export const updateSlideOrder = (data: { id: number; order: number }[]) => {
  return axiosInstance.post(`/kepegawaian/slide/reorder`, { slides: data });
};
