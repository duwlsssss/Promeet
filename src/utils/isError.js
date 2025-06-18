import axios from 'axios';

export const isNetworkError = (error) => {
  if (!error) return;

  if (axios.isAxiosError(error)) {
    return !error.response && error.message === 'Network Error';
  }

  const message = error.message ?? '';
  return message === 'Failed to fetch' || message === 'Network request failed';
};

export const isServerError = (error) => {
  if (!error) return;

  // axios 에러인지 확인
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    return status >= 500 && status < 600;
  }

  // 그 외의 일반적인 에러 메시지 검사
  const message = error?.message ?? '';
  return (
    ['500', '503'].some((code) => message.includes(code)) ||
    error.name === 'TypeError' ||
    message.includes('Network')
  );
};
