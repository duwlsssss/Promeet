import axiosInstance from '../axiosInstance';

// 약속 참여
export const patchJoinPromise = async (promiseId, userId, nearestStation, availableTimes) => {
  const { data } = await axiosInstance.patch(`/promise/${promiseId}/join/${userId}`, {
    nearestStation,
    availableTimes,
  });
  return data;
};

// 약속 확정 (최종 장소 선택해서)
export const patchFinalizePromise = async (promiseId, userId, place) => {
  const { data } = await axiosInstance.patch(`/promise/${promiseId}/finalize`, {
    userId,
    place,
  });
  return data;
};
