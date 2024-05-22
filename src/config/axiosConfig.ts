import axios, { AxiosResponse } from "axios";

export const configAxios = () => {
  axios.defaults.baseURL = "https://kanban-backend-02ml.onrender.com/api";

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};