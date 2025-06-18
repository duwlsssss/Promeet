import { useQuery } from '@tanstack/react-query';
import { getPromiseSummaryData } from '@/apis/get/promise';
import { QUERY_KEY } from '@/constants/key';
import useErrorHandler from '../useHandleError';

const useGetPromiseSummaryData = (promiseId) => {
  const handleError = useErrorHandler();

  return useQuery({
    queryKey: [QUERY_KEY.promiseSummary, promiseId],
    queryFn: async () => {
      try {
        const { data } = await getPromiseSummaryData(promiseId);
        return data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    enabled: !!promiseId,
  });
};

export default useGetPromiseSummaryData;
