import * as S from './style';
import { useParams, useNavigate } from 'react-router-dom';
import SignInForm from '@/components/auth/SignInForm';
import DeferredLoader from '@/components/ui/DeferredLoader';
import useGetPromiseData from '@/hooks/queries/useGetPromiseData';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import { ROUTES } from '@/constants/routes';

const JoinPage = () => {
  const { promiseId } = useParams();
  const { userId } = useUserInfo();
  const navigate = useNavigate();

  // 약속 생성자 정보 가져오기
  const { data: promiseData, isPending } = useGetPromiseData(promiseId, userId);

  if (isPending) {
    return <DeferredLoader />;
  }

  const { creatorId, members, title, description, isAllMembersSubmit } = promiseData;
  const creator = members.find((m) => m.userId === creatorId);

  if (isAllMembersSubmit) {
    navigate(ROUTES.HOME, { state: { toastMessage: '이미 모든 멤버가 참여한 약속입니다.' } });
  }

  return (
    <S.Container>
      <S.CreaterText>{`${creator.name}님이 약속을 공유했어요`}</S.CreaterText>
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
