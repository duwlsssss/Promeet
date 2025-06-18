import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { patchJoinPromise } from '@/apis/patch/promise';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import useErrorHandler from '../useHandleError';
import { BUILD_ROUTES } from '@/constants/routes';

const useJoinPromise = () => {
  const handleError = useErrorHandler();
  const navigate = useNavigate();

  const { userId } = useUserInfo();

  return useMutation({
    mutationFn: ({ promiseId, nearestStation, availableTimes }) =>
      patchJoinPromise(promiseId, userId, nearestStation, availableTimes),
    onSuccess: (_, { promiseId }) => {
      // 결과 페이지로 이동
      navigate(BUILD_ROUTES.PROMISE_RESULT(promiseId));
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

export default useJoinPromise;
