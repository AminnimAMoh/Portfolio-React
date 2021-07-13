// import axios, { AxiosError, AxiosResponse } from "axios";

<<<<<<< Updated upstream
// export default () => {

//   const headers = { "Content-Type": "application/json" };
=======
export default () => {
//   const BASE_DESTINATION = 'http://localhost:3001/';
  const headers = { "Content-Type": "application/json" };

  const axiosInterceptor= axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 1000,
    headers,
  });
>>>>>>> Stashed changes

//   const axiosInterceptor = axios.create({
//     BASE_DESTINATION:'http://localhost:3000/',
//     timeout: 1000,
//     headers,
//   });

//   const onResponse = (response: AxiosResponse): AxiosResponse => {
//     console.log(response);
//     return response;
//   };
//   const onResponseError = (error: AxiosError): AxiosError => {
//     console.log(error);
//     return error;
//   };

//   axiosInterceptor.interceptors.response.use(onResponse, onResponseError);

//   return axiosInterceptor;
// };

export default null