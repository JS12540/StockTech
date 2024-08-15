import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../../constants";

const API: AxiosInstance = axios.create({
  baseURL: BASE_URL + "/users",
});

/**
 * Makes a request to the server to sign in with the provided form data.
 *
 * @param {any} formData - The data to be sent in the request body.
 * @return {Promise<any>} A promise that resolves with the response data if the request is successful, or rejects with an error message if the request fails.
 */
export const signIn = (formData: any) =>
  API.post("/signin", formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.message;
    });

/**
 * Makes a sign-up request to the server.
 *
 * @param {any} formData - The data to be sent in the sign-up request.
 * @return {Promise<any>} A promise that resolves to the response data from the server or rejects with an error message.
 */
export const signUp = (formData: any) =>
  API.post("/signup", formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.message;
    });
