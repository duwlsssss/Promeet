import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { patchJoinPromise } from '@/apis/patch/promise';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import useErrorHandler from '../useHandleError';
import { BUILD_ROUTES } from '@/constants/routes';
import { QUERY_KEY } from '@/constants/key';
import { usePromiseDataActions } from '../stores/promise/usePromiseDataStore';

const useJoinPromise = () => {
  const queryClient = useQueryClient();
  const handleError = useErrorHandler();
  const navigate = useNavigate();
  const { resetPromiseData } = usePromiseDataActions();

  const { userId } = useUserInfo();

  return useMutation({
    mutationFn: ({ promiseId, nearestStation, availableTimes }) =>
      patchJoinPromise(promiseId, userId, nearestStation, availableTimes),
    onSuccess: (_, { promiseId }) => {
      // 약속 정보 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.promise, promiseId],
      });
      resetPromiseData(); // 데이터 비우기
      navigate(BUILD_ROUTES.PROMISE_RESULT(promiseId)); // 결과 페이지로 이동
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

export default useJoinPromise;
