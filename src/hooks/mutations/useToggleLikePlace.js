import { useMutation } from '@tanstack/react-query';
import { postPlaceLike } from '@/apis/post/promise';
import { deletePlaceLike } from '@/apis/delete/promise';
import useHandleError from '../useHandleError';
import queryClient from '@/lib/tanstack-query/queryClient';
import { QUERY_KEY } from '@/constants/key';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import {
  usePromiseDataFromServerInfo,
  usePromiseDataFromServerActions,
} from '@/hooks/stores/promise/usePromiseDataFromServerStore';

const useToggleLikePlace = () => {
  const handleError = useHandleError();
  const { userId } = useUserInfo();
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();
  const { setLikedPlaces } = usePromiseDataFromServerActions();

  const mutation = useMutation({
    mutationFn: ({ promiseId, place, isLiked }) => {
      if (!promiseDataFromServer) return Promise.reject(new Error('약속 데이터가 없습니다.'));
      return isLiked
        ? deletePlaceLike(promiseId, place.placeId, userId)
        : postPlaceLike(promiseId, place, userId);
    },
    onMutate: async ({ place, promiseId, isLiked }) => {
      if (!promiseDataFromServer?.likedPlaces) {
        throw new Error('좋아요 데이터가 없습니다.');
      }

      // 1. 장소에 관련된 쿼리를 취소
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.promise, promiseId, userId],
      });

      // 2. 현재 좋아요 상태 저장
      const prevLikedPlaces = promiseDataFromServer.likedPlaces;

      // 3. 낙관적 업데이트
      let finalLikedPlaces;

      if (isLiked) {
        // 좋아요 취소
        finalLikedPlaces = prevLikedPlaces
          .map((likedPlace) => {
            if (likedPlace.place.placeId === place.placeId) {
              const uniqueUserIds = [...new Set(likedPlace.userIds)].filter((id) => id !== userId);
              return {
                ...likedPlace,
                userIds: uniqueUserIds,
                likesCount: uniqueUserIds.length,
              };
            }
            return likedPlace;
          })
          .filter((likedPlace) => likedPlace.likesCount > 0); // likesCount가 0이면 제거
      } else {
        // 좋아요 추가
        // 장소가 이전 좋아요 배열에 있는지
        const existingPlace = prevLikedPlaces.find((p) => p.place.placeId === place.placeId);

        // 있으면 userIds, likesCount만 업데이트
        if (existingPlace) {
          finalLikedPlaces = prevLikedPlaces.map((likedPlace) => {
            if (likedPlace.place.placeId === place.placeId) {
              const uniqueUserIds = [...new Set([...likedPlace.userIds, userId])];
              return {
                ...likedPlace,
                userIds: uniqueUserIds,
                likesCount: uniqueUserIds.length,
              };
            }
            return likedPlace;
          });
        } else {
          // 없으면 장소 정보도 추가
          finalLikedPlaces = [
            ...prevLikedPlaces,
            {
              userIds: [userId],
              likesCount: 1,
              place: {
                placeId: place.placeId,
                type: place.type,
                name: place.name,
                position: place.position,
                address: place.address,
                phone: place.phone,
                link: place.link,
              },
            },
          ];
        }
      }

      setLikedPlaces(finalLikedPlaces);
      return { prevLikedPlaces }; // 요청 실패시 되돌리기용
    },

    // 요청 실패시 롤백
    onError: (error, _, context) => {
      if (context?.prevLikedPlaces) {
        setLikedPlaces(context.prevLikedPlaces);
      }
      handleError(error);
    },

    // 실제 서버의 최신 데이터를 다시 가져옴
    onSettled: (_, __, { promiseId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.promise, promiseId],
      });
    },
  });

  return mutation;
};

export default useToggleLikePlace;
