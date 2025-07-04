import axiosInstance from './axiosInstance';

export const fetchUsers = () => axiosInstance.get('/admin/users');
export const updateUser = (id, data) => axiosInstance.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => axiosInstance.delete(`/admin/users/${id}`);