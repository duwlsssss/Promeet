import axiosInstance from '../axiosInstance';

// 고정 스케줄 수정
export const patchFixedSchedule = async (userId, scheduleId, fixedSchedule) => {
  const { data } = await axiosInstance.patch(`/user/${userId}/fixed-schedules/${scheduleId}`, {
    fixedSchedule,
  });
  return data;
};
