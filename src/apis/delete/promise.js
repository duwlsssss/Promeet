import axiosInstance from '../axiosInstance';

// 장소 좋아요 취소
export const deletePlaceLike = async (promiseId, placeId, userId) => {
  const { data } = await axiosInstance.delete(`/likes`, {
    data: {
      promiseId,
      placeId,
      userId,
    },
  });
  return data;
};
