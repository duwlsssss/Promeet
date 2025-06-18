import { useQueries } from '@tanstack/react-query';
import { getPlaceLike } from '@/apis/get/promise';
import { QUERY_KEY } from '@/constants/key';
import useHandleError from '../useHandleError';

// 장소 id들로 좋아요 여부 가져오기
const useGetLikePlaces = (userId, promiseId, placeIds) => {
  const handleError = useHandleError();

  return useQueries({
    queries: placeIds.map((placeId) => ({
      // 장소의 좋아요 정보
      queryKey: [QUERY_KEY.likes, promiseId, placeId, userId],
      queryFn: async () => {
        try {
          const { data } = await getPlaceLike(promiseId, placeId, userId);
          return data;
        } catch (error) {
          handleError(error);
          return error;
        }
      },
      enabled: !!placeId || !!userId,
    })),
  });
};

export default useGetLikePlaces;
