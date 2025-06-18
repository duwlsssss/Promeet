import axiosInstance from '../axiosInstance';

// 고정 스케줄 등록
export const postFixedSchedules = async (userId, fixedSchedules) => {
  const { data } = await axiosInstance.post(`/user/${userId}/fixed-schedules`, {
    fixedSchedules,
  });
  return data;
};
