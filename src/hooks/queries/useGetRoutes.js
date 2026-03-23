import { useQuery } from '@tanstack/react-query';
import { getRoutes } from '@/apis/get/promise';
import { QUERY_KEY } from '@/constants/key';
import useErrorHandler from '../useHandleError';
import { usePromiseDataFromServerActions } from '../stores/promise/usePromiseDataFromServerStore';

const useGetRoutes = (promiseId) => {
  const handleError = useErrorHandler();
  const { setPromiseDataFromServer } = usePromiseDataFromServerActions();

  return useQuery({
    queryKey: [QUERY_KEY.promise, promiseId],
    queryFn: async () => {
      if (!promiseId) return null;

      try {
        const { data } = await getRoutes(promiseId);
        // 전역 상태에 약속 정보 저장
        setPromiseDataFromServer(data);

        return data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    enabled: !!promiseId,
  });
};

export default useGetRoutes;
