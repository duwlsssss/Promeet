import axiosInstance from '../axiosInstance';

// 좋아요
export const postPlaceLike = async (promiseId, place, userId) => {
  const { data } = await axiosInstance.post(`/likes`, {
    promiseId,
    place,
    userId,
  });
  return data;
};

// 약속 생성
export const postPromise = async (
  creatorId,
  promiseName,
  promiseDescription,
  memberCnt,
  nearestStation,
  availableTimes,
) => {
  const { data } = await axiosInstance.post(`/promises`, {
    creatorId,
    promiseName,
    promiseDescription,
    memberCnt,
    nearestStation,
    availableTimes,
  });
  return data;
};
