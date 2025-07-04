import axiosInstance from './axiosInstance';

export const loginUser = (credentials) => {
  return axiosInstance.post('/auth/login', credentials);
};

export const registerUser = (details) => {
  return axiosInstance.post('/auth/register', details);
};