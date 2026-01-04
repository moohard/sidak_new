import axiosInstance from "../utils/axios";

export const getNewsList = (params?: any) => {
  return axiosInstance.get(`/kepegawaian/news`, { params });
};

export const getNewsDetail = (id: string | number) => {
  return axiosInstance.get(`/kepegawaian/news/${id}`);
};

export const createNews = (data: any) => {
  return axiosInstance.post(`/kepegawaian/news`, data);
};

export const updateNews = (id: string | number, data: any) => {
  return axiosInstance.patch(`/kepegawaian/news/${id}`, data);
};

export const deleteNews = (id: string | number) => {
  return axiosInstance.delete(`/kepegawaian/news/${id}`);
};

export const getNewsCategories = () => {
  return axiosInstance.get(`/kepegawaian/news-categories`);
};
