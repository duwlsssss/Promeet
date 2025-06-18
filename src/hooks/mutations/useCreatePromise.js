import { useMutation } from '@tanstack/react-query';
import queryClient from '@/lib/tanstack-query/queryClient';
import { postPromise } from '@/apis/post/promise';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import useErrorHandler from '../useHandleError';
import { QUERY_KEY } from '@/constants/key';

const useCreatePromise = () => {
  const handleError = useErrorHandler();

  const { userId } = useUserInfo();

  return useMutation({
    mutationFn: ({
      creatorId,
      promiseName,
      promiseDescription,
      memberCnt,
      nearestStation,
      availableTimes,
    }) =>
      postPromise(
        creatorId,
        promiseName,
        promiseDescription,
        memberCnt,
        nearestStation,
        availableTimes,
      ),
    onSuccess: (_, __) => {
      // 유저 정보 캐시 무효화 (약속 목록 포함)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user, userId] });
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

export default useCreatePromise;
