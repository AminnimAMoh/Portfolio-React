import axios, { AxiosError, AxiosResponse } from "axios";

export default () => {
  const baseURL = process.env.REACT_APP_BASE_DESTINATION;
  const headers = { "Content-Type": "application/json" };

  const axiosInterceptor = axios.create({
    baseURL,
    timeout: 10000,
    headers,
  });

  const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };
  const onResponseError = (error: AxiosError): AxiosError => {
    console.log(error);
    return error;
  };

  axiosInterceptor.interceptors.response.use(onResponse, onResponseError);

  return axiosInterceptor;
};
