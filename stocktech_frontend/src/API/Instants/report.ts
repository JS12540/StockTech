import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../../constants";

const API: AxiosInstance = axios.create({
  baseURL: BASE_URL + "/report/",
});

/**
 * Retrieves the management report for a specific year and ISIN.
 *
 * @param {string} year - The year for which the management report is requested.
 * @param {string} isin - The ISIN (International Securities Identification Number) of the company.
 * @return {Promise<any>} A promise that resolves to the management report data or an error message.
 */
export const getReportSegment = (segment: string, year: string, isin: string) =>
  API.post(`get_data`, { company_id: isin, key: segment, year: year })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.message;
    });

export const getReportKeys = (year: string, isin: string) =>
  API.get(`${isin}/${year}/keys`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.message;
    });

export const getReportYears = (isin: string) =>
  API.get(`${isin}/all_years`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.message;
    });
  
