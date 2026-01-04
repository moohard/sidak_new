import axiosInstance from "../utils/axios";

export const getPegawaiList = (params?: any) => {
  return axiosInstance.get("/kepegawaian/pegawai", { params });
};

export const getPegawaiDetail = (id: string | number) => {
  return axiosInstance.get(`/kepegawaian/pegawai/detail/${id}`);
};

export const getPegawaiData = (id: string | number) => {
  return axiosInstance.get(`/kepegawaian/pegawai/${id}`);
};

export const createPegawai = (data: any) => {
  return axiosInstance.post("/kepegawaian/pegawai", data);
};

export const updatePegawai = (nip: string, data: any) => {
  return axiosInstance.patch(`/kepegawaian/pegawai/${nip}`, data);
};

export const updateFotoPegawai = (nip: string, formData: FormData) => {
  return axiosInstance.patch(`/kepegawaian/pegawai/foto/${nip}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePegawai = (id: string | number) => {
  return axiosInstance.delete(`/kepegawaian/pegawai/${id}`);
};

export const softDeletePegawai = (nip: string) => {
  return axiosInstance.patch(`/kepegawaian/pegawai/softdel/${nip}`);
};
