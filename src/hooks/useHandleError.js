import { useErrorBoundary } from 'react-error-boundary';
import { AxiosError } from 'axios';
import ApiError from '@/apis/apiError';

// 에러 발생시 에러 바운더리로 사용자에게 표시
const useErrorHandler = () => {
  const { showBoundary } = useErrorBoundary();

  const handleError = (error) => {
    // 이미 ApiError로 래핑된 에러는 그대로 사용
    if (error instanceof ApiError) {
      showBoundary(error);
      return;
    }

    // Axios 에러 처리
    if (error instanceof AxiosError) {
      const { response, request, message } = error;

      // 서버에서 정의한 비즈니스 로직 에러
      if (response?.data?.error?.code) {
        showBoundary(
          new ApiError(
            response.data.error.code,
            response.data.error.message,
            { status: response.status, url: request?.responseURL },
            error,
          ),
        );
        return;
      }

      // 일반 HTTP 에러
      showBoundary(
        new Error(
          `HTTP Error: ${response?.status} - ${response?.statusText ?? message ?? 'API 요청 중 오류가 발생했습니다.'}`,
        ),
      );
      return;
    }

    // 그 외 에러는 일반 Error로 처리
    showBoundary(error instanceof Error ? error : new Error(String(error)));
  };

  return handleError;
};

export default useErrorHandler;
