import axiosInstance from './axiosInstance';

export const postProblem = (formData) => {
  // formData includes 'photo' as file, lat, lng, description
  return axiosInstance.post('/problems', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const fetchProblems = () => {
  return axiosInstance.get('/problems');
};

export const updateProblemStatus = (problemId, status) => {
  return axiosInstance.put(`/problems/${problemId}/status`, { status });
};