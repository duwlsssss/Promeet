import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/apis/get/user';
import { QUERY_KEY } from '@/constants/key';
import { useUserActions } from '../stores/auth/useUserStore';
import useErrorHandler from '../useHandleError';

const useGetUserData = (userId, readOnly = false) => {
  const { setUserName, setFixedSchedules, setPromises } = useUserActions();
  const handleError = useErrorHandler();

  return useQuery({
    queryKey: [QUERY_KEY.user, userId],
    queryFn: async () => {
      try {
        const { data } = await getUserData(userId);
        if (!readOnly) {
          // 데이터를 가져오자마자 store 업데이트
          const { name, fixedSchedule, promises } = data;
          setUserName(name);
          setFixedSchedules(fixedSchedule);
          setPromises({
            create: promises?.create ?? [],
            join: promises?.join ?? [],
          });
        }

        return data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    enabled: !!userId,
  });
};

export default useGetUserData;
