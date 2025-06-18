import axiosInstance from '../axiosInstance';

// 고정 스케줄 삭제
export const deleteFixedSchedule = async (userId, scheduleId) => {
  const { data } = await axiosInstance.delete(`/user/${userId}/fixed-schedules/${scheduleId}`);
  return data;
};
