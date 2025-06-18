import { useMutation } from '@tanstack/react-query';
import queryClient from '@/lib/tanstack-query/queryClient';
import { postFixedSchedules } from '@/apis/post/user';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import useErrorHandler from '../useHandleError';
import { QUERY_KEY } from '@/constants/key';
import toast from '@/utils/toast';

const useCreateFixedSchedules = () => {
  const handleError = useErrorHandler();

  const { userId } = useUserInfo();

  return useMutation({
    mutationFn: ({ fixedSchedules }) => postFixedSchedules(userId, fixedSchedules),
    onSuccess: (_, __) => {
      // 유저 정보 캐시 무효화 (고정 일정 포함)
      queryClient.refetchQueries({ queryKey: [QUERY_KEY.user, userId] });
    },
    onError: (error) => {
      if (error.response.data.error.code === 'SCHEDULE_CONFLICT') {
        toast('이미 등록된 스케줄과 중복돼요');
        return;
      }

      handleError(error);
    },
  });
};

export default useCreateFixedSchedules;
