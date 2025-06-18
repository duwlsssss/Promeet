import * as S from './style';
import { useRouteError } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isNetworkError, isServerError } from '@/utils/isError';
import toast from '@/utils/toast';
import Button from '@/components/ui/Button';
import Backward from '@/components/ui/Backward';

/**
 * ErrorFallback 컴포넌트
 *
 * @param {Error} error - 에러 객체
 */
const ErrorFallback = ({ error: propsError }) => {
  const routeError = useRouteError(); // 라우터 내부에서만 동작
  const error = propsError ?? routeError;

  console.error('[😡 에러 발생]', error.message ?? error);

  const handleRefresh = () => {
    // 리프레시해도 네트워크 오류 발생시
    if (isNetworkError(error)) {
      toast('네트워크 연결을 확인해주세요');
      return;
    }
    window.location.reload();
  };

  const ErrorMessage = ({ icon: Icon, message }) => (
    <>
      <Icon />
      <S.ErrorTextWrapper>
        <S.ErrorText>{message}</S.ErrorText>
        <S.ErrorSubText>잠시 후 다시 시도해주세요.</S.ErrorSubText>
      </S.ErrorTextWrapper>
    </>
  );

  ErrorMessage.propTypes = {
    icon: PropTypes.elementType.isRequired,
    message: PropTypes.string.isRequired,
  };

  return (
    <>
      <S.BackwardWrapper>
        <Backward size="28px" isErrorFallback={true} />
      </S.BackwardWrapper>
      <S.ErrorContainer role="alert" aria-live="assertive" aria-atomic="true">
        <S.ErrorInfo>
          {isNetworkError(error) ? (
            <ErrorMessage icon={S.WifiXIcon} message="인터넷 연결이 불안정해요." />
          ) : isServerError(error) ? (
            <ErrorMessage icon={S.WarningIcon} message="일시적인 오류가 발생했어요." />
          ) : (
            <ErrorMessage icon={S.WarningIcon} message="알 수 없는 에러가 발생했어요." />
          )}
        </S.ErrorInfo>
        <Button onClick={handleRefresh}>다시 시도</Button>
      </S.ErrorContainer>
    </>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.instanceOf(Error),
};

export default ErrorFallback;
