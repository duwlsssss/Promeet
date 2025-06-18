import { useQueries } from '@tanstack/react-query';
import { getPromiseData } from '@/apis/get/promise';
import { QUERY_KEY } from '@/constants/key';
import useErrorHandler from '../useHandleError';

const useGetMultiplePromiseData = (promiseIds, userId) => {
  const handleError = useErrorHandler();

  return useQueries({
    queries: promiseIds.map((promiseId) => ({
      queryKey: [QUERY_KEY.promise, promiseId],
      queryFn: async () => {
        try {
          const { data } = await getPromiseData(promiseId, userId);
          return data;
        } catch (error) {
          handleError(error);
          throw error;
        }
      },
      enabled: !!promiseId || !!promiseIds.length,
    })),
  });
};

export default useGetMultiplePromiseData;
