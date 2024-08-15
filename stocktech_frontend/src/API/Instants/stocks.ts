import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../../constants";

const API: AxiosInstance = axios.create({
  baseURL: BASE_URL + "/stocks/",
});

export const getCompanyDetails = (isin: string) =>
  API.get(`${isin}/data`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.message;
    });

export const searchWord = (word: string) =>
  API.get(`search?query=${word}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.message;
    });
