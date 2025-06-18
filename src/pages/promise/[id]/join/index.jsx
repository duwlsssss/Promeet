import * as S from './style';
import { useParams } from 'react-router-dom';
import SignInForm from '@/components/auth/SignInForm';
import DeferredLoader from '@/components/ui/DeferredLoader';
import useGetPromiseSummaryData from '@/hooks/queries/useGetPromiseSummaryData';

const JoinPage = () => {
  const { promiseId } = useParams();
  // 약속 생성자 정보 가져오기
  const { data: promiseSummary, isPending } = useGetPromiseSummaryData(promiseId);

  if (isPending) {
    return <DeferredLoader />;
  }

  const { creatorName, title, description } = promiseSummary;

  return (
    <S.Container>
      <S.CreaterText>{`${creatorName}님이 약속을 공유했어요`}</S.CreaterText>
      <S.InfoContainer>
        <S.Name>{title}</S.Name>
        <S.Description>{description}</S.Description>
      </S.InfoContainer>
      <S.Line />
      <SignInForm />
    </S.Container>
  );
};
export default JoinPage;
