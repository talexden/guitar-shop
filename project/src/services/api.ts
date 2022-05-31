import axios, {AxiosInstance} from 'axios';

const BACKEND_URL = 'https://guitar-shop.accelerator.pages.academy';
const REQUEST_TIMEOUT = 5000;


export const createAPI = (): AxiosInstance => {
  return axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
};
