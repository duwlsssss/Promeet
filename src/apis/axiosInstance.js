import axios from 'axios';
import { ROUTES } from '@/constants/routes';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorCode = error.response?.data?.error?.code;
    // 해당 userId의 유저가 없을 때
    if (errorCode === 'USER_NOT_FOUND') {
      localStorage.clear(); // 로컬 스토리지 초기화
      window.location.href = ROUTES.SIGN_IN; // 로그인 페이지로 이동
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
