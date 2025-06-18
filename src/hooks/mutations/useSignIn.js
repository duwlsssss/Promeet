import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useErrorHandler from '../useHandleError';
import { useUserActions } from '../stores/auth/useUserStore';
import { BUILD_ROUTES, ROUTES } from '@/constants/routes';
import { postSignIn } from '@/apis/post/auth';
import { getUserData } from '@/apis/get/user';

const useSignIn = (setError) => {
  const handleError = useErrorHandler();
  const navigate = useNavigate();
  const { setUserId, setUserName, setFixedSchedules, setPromises, setUserType } = useUserActions();

  return useMutation({
    mutationFn: async ({ name, password, promiseId }) => postSignIn(name, password, promiseId),
    onSuccess: async ({ data }, { promiseId }) => {
      const userId = data.userId;
      setUserId(userId);

      // 데이터 프리로드
      const userData = await getUserData(userId);
      const { name, fixedSchedule, promises } = userData.data;

      setUserName(name);
      setFixedSchedules(fixedSchedule);
      setPromises({
        create: promises?.create ?? [],
        join: promises?.join ?? [],
      });

      // 참여 요청받은 약속이면
      if (promiseId && promises.join.includes(promiseId)) {
        setUserType('join');
        navigate(BUILD_ROUTES.PROMISE_LOCATION(promiseId));
      } else {
        navigate(ROUTES.HOME);
      }
    },
    onError: (error) => {
      if (error.response.data.error.code !== 'INVALID_PASSWORD') {
        // 다른 에러는 일반적인 에러 처리
        handleError(error);
      }

      // 비밀번호 에러는 폼에만 표시
      setError('password', { message: error.response.data.error.message });
    },
  });
};

export default useSignIn;
