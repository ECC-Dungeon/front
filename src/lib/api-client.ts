import Axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

import { env } from '@/config/env';

/**
 * Request interceptor to add authentication headers automatically
 */
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';

    // Automatically add Authorization header from localStorage if not already set
    const token = localStorage.getItem('token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = token;
    }
  }

  config.withCredentials = true;
  return config;
}

/**
 * Response error interceptor to handle errors consistently
 */
function responseErrorInterceptor(error: AxiosError) {
  // Return structured error response
  if (error.response) {
    return Promise.reject(error.response.data);
  }

  return Promise.reject({
    result: 'error',
    msg: error.message || 'Network error occurred',
  });
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  responseErrorInterceptor,
);
