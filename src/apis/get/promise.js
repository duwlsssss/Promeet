import axiosInstance from '../axiosInstance';

// 장소 좋아요 가져오기
export const getPlaceLike = async (promiseId, placeId, userId) => {
  const { data } = await axiosInstance.get(`/likes`, {
    params: { promiseId, placeId, userId },
  });
  return data;
};

// 약속 정보 가져오기
export const getPromiseData = async (promiseId, userId) => {
  const { data } = await axiosInstance.get(`/promises/${promiseId}`, {
    params: { userId },
  });
  return data;
};

// 약속 간략 정보 가져오기 - userId 없을 때
export const getPromiseSummaryData = async (promiseId) => {
  const { data } = await axiosInstance.get(`/promises/${promiseId}/summary`);
  return data;
};
