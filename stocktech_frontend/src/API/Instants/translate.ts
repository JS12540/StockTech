import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../../constants";

const API: AxiosInstance = axios.create({
  baseURL: BASE_URL + "/lang/",
});

export const translateStatement = (config: any) =>
  API.post(`translate`, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.message;
    });
