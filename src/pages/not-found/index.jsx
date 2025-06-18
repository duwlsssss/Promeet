import * as S from './style';
import Backward from '@/components/ui/Backward';

const NotFoundPage = () => {
  return (
    <>
      <S.BackwardWrapper>
        <Backward />
      </S.BackwardWrapper>
      <S.Container role="alert" aria-live="assertive" aria-atomic="true">
        유효하지 않은 경로입니다.
      </S.Container>
    </>
  );
};

export default NotFoundPage;
