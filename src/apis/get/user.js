import axiosInstance from '../axiosInstance';

export const getUserData = async (userId) => {
  const { data } = await axiosInstance.get(`/user/${userId}`);
  return data;
};
