import * as S from './style';
import logoutIcon from '../../assets/img/icon/logout.svg';
import AppointmentCard from '../../components/ui/AppiontmentCard';
import Navbar from '@/layouts/Navbar';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import useLogout from '@/hooks/mutations/useLogout';
import useGetUserData from '@/hooks/queries/useGetUserData';
import useGetMultiplePromiseData from '@/hooks/queries/useGetMultiplePromiseData';
import { BUILD_ROUTES } from '@/constants/routes';

// D-day 계산 함수
function getDday(dateStr) {
  if (!dateStr) return '';
  const today = dayjs().startOf('day');
  const target = dayjs(dateStr).startOf('day');
  const diff = target.diff(today, 'day');
  if (diff === 0) return 'D-day';
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}

// 지난 약속 데이터 추출 함수
function getPastAppointments(promises) {
  const today = dayjs().startOf('day');
  return promises
    .filter((p) => p.fixedTime?.some((t) => dayjs(t.date).isBefore(today)))
    .map((p) => ({
      label: p.title,
      dday: '완료',
    }));
}

const UserPage = () => {
  const { userId, userName } = useUserInfo();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  // 서버에서 사용자 데이터 받아오기
  const { data, isPending } = useGetUserData(userId);

  // ID 배열 추출
  const createIds = data?.promises?.create ?? [];
  const joinIds = data?.promises?.join ?? [];

  // 각 ID로 약속 전체 데이터 패치
  const createQueries = useGetMultiplePromiseData(createIds, userId);
  const joinQueries = useGetMultiplePromiseData(joinIds, userId);

  const isPromisesPending =
    createQueries.some((q) => q.isPending) || joinQueries.some((q) => q.isPending);

  const createdPromises = createQueries.map((q) => q.data).filter(Boolean);
  const joinedPromises = joinQueries.map((q) => q.data).filter(Boolean);

  // 확정 시간 기준 오늘 이상인지 (미확정 약속은 항상 통과)
  const isActiveOrUnfixed = (p) => {
    const firstTime = p.fixedTime?.[0];
    if (!firstTime) return true;
    return dayjs(firstTime.date).diff(dayjs().startOf('day'), 'day') >= 0;
  };

  // 오늘 또는 미래 확정 약속만
  const isUpcoming = (p) => {
    const firstTime = p.fixedTime?.[0];
    if (!firstTime) return false;
    return dayjs(firstTime.date).diff(dayjs().startOf('day'), 'day') >= 0;
  };

  // 다가오는 약속: 오늘 또는 미래 확정 약속만
  const upcomingAppointments = createdPromises.filter(isUpcoming).map((p) => ({
    promiseId: p.promiseId,
    label: p.title,
    dday: getDday(p.fixedTime[0]?.date),
  }));

  // 초대된 약속: 미확정 포함, 지난 약속 제외
  const invitedAppointments = joinedPromises.filter(isActiveOrUnfixed).map((p) => ({
    promiseId: p.promiseId,
    label: p.title,
    dday: p.fixedTime?.[0] ? getDday(p.fixedTime[0].date) : '미확정',
  }));

  // 제안한 약속: 미확정 포함, 지난 약속 제외
  const proposedAppointments = createdPromises.filter(isActiveOrUnfixed).map((p) => ({
    promiseId: p.promiseId,
    label: p.title,
    dday: p.fixedTime?.[0] ? getDday(p.fixedTime[0].date) : '미확정',
  }));

  // 지난 약속
  const pastAppointments = [
    ...getPastAppointments(createdPromises),
    ...getPastAppointments(joinedPromises),
  ];

  if (isPending || isPromisesPending) return <div>로딩중...</div>;

  return (
    <>
      <S.Container>
        <S.Frame>
          <S.UserHeader>
            <S.UserName>{userName ? `${userName} 님` : '사용자 님'}</S.UserName>
            <S.LogoutButton
              onClick={() => {
                logout({ userId });
              }}
            >
              <img src={logoutIcon} alt="로그아웃" />
            </S.LogoutButton>
          </S.UserHeader>

          <S.SectionTitle>다가오는 약속</S.SectionTitle>
          <S.CardList>
            {upcomingAppointments.length === 0 ? (
              <S.CardWrapper>
                <div style={{ color: '#aaa', fontSize: 14 }}>다가오는 약속이 없습니다.</div>
              </S.CardWrapper>
            ) : (
              upcomingAppointments.map((item, index) => (
                <S.CardWrapper key={index}>
                  <AppointmentCard {...item} />
                </S.CardWrapper>
              ))
            )}
          </S.CardList>

          <S.SectionTitle>초대된 약속</S.SectionTitle>
          <S.CardList>
            {invitedAppointments.length === 0 ? (
              <S.CardWrapper>
                <div>초대된 약속이 없습니다.</div>
              </S.CardWrapper>
            ) : (
              invitedAppointments.map((item) => (
                <S.CardWrapper
                  key={item.promiseId}
                  onClick={() => navigate(BUILD_ROUTES.PROMISE_RESULT(item.promiseId))}
                >
                  <AppointmentCard dday={item.dday} label={item.label} variant="card" />
                </S.CardWrapper>
              ))
            )}
          </S.CardList>

          <S.SectionTitle>제안한 약속</S.SectionTitle>
          <S.CardList>
            {proposedAppointments.length === 0 ? (
              <S.CardWrapper>
                <div>제안한 약속이 없습니다.</div>
              </S.CardWrapper>
            ) : (
              proposedAppointments.map((item) => (
                <S.CardWrapper
                  key={item.promiseId}
                  onClick={() => navigate(BUILD_ROUTES.PROMISE_FINALIZE(item.promiseId))}
                >
                  <AppointmentCard dday={item.dday} label={item.label} variant="card" />
                </S.CardWrapper>
              ))
            )}
          </S.CardList>

          <S.SectionTitle>지난 약속</S.SectionTitle>
          <S.CardList>
            {pastAppointments.length === 0 ? (
              <S.CardWrapper>
                <div style={{ color: '#aaa', fontSize: 14 }}>지난 약속이 없습니다.</div>
              </S.CardWrapper>
            ) : (
              pastAppointments.map((item, index) => (
                <S.PastCardWrapper key={index}>
                  <AppointmentCard {...item} />
                </S.PastCardWrapper>
              ))
            )}
          </S.CardList>
        </S.Frame>
      </S.Container>
      <Navbar />
    </>
  );
};

export default UserPage;
