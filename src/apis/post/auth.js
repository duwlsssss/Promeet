import axiosInstance from '../axiosInstance';

// 로그인
export const postSignIn = async (name, password, promiseId) => {
  const { data } = await axiosInstance.post(`/auth/signin`, {
    name,
    password,
    promiseId,
  });
  return data;
};

// 로그아웃
export const postLogout = async (userId) => {
  const { data } = await axiosInstance.post(`/auth/logout`, {
    userId,
  });
  return data;
};
