import { QueryClient, QueryCache } from '@tanstack/react-query';
import toast from '@/utils/toast';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 캐시된 데이터가 있을 때 백그라운드 refetch 에러
      if (query.state.data !== undefined) {
        toast(`에러가 발생했습니다: ${error.message}`);
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

export default queryClient;
