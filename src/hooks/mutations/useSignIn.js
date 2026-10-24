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
      if (error.response?.data?.error?.code !== 'INVALID_PASSWORD') {
        // 다른 에러는 일반적인 에러 처리
        handleError(error);
        return;
      }

      // 이름이 곧 계정이라, 비밀번호 불일치는 "동명이인이 이미 사용 중"일 수도 있음을 함께 안내
      setError('password', {
        message:
          '이미 사용 중인 이름이에요. 본인이면 비밀번호를 확인하고, 처음이면 다른 이름을 써주세요.',
      });
    },
  });
};

export default useSignIn;
