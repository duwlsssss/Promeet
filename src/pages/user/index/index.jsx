import React from 'react';
import * as S from './style';
import logoutIcon from '../../../assets/img/icon/logout.svg';
import AppointmentCard from '../../../components/ui/ddaycard';
import Navbar from '@/layouts/Navbar';
import dayjs from 'dayjs';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import useLogout from '@/hooks/mutations/useLogout';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import useGetUserData from '@/hooks/queries/useGetUserData';

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

const FixedScheduleButton = () => {
  const navigate = useNavigate();
  return (
    <S.FixedButton onClick={() => navigate(ROUTES.ENTER_SCHEDULE)}>
      <S.FixedButtonTitle>고정 일정</S.FixedButtonTitle>
      <S.FixedButtonDesc>
        매주 반복되는 일정을 설정하여
        <br />
        편리하게 약속을 잡으세요.
      </S.FixedButtonDesc>
    </S.FixedButton>
  );
};

const UserPage = () => {
  const { userId, userName } = useUserInfo();
  const { mutate: logout } = useLogout();

  // 서버에서 사용자 데이터 받아오기
  const { data, isPending } = useGetUserData(userId);

  // 실제 데이터로 대체
  const createdPromises = data?.promises?.create ?? [];
  const joinedPromises = data?.promises?.join ?? [];

  // 오늘 또는 미래 약속만 남기는 필터 함수
  const isUpcoming = (p) => {
    const firstTime = p.fixedTime?.[0];
    if (!firstTime) return false;
    const dday = dayjs(firstTime.date).diff(dayjs().startOf('day'), 'day');
    return dday >= 0;
  };

  // 다가오는 약속: 오늘 또는 미래만
  const upcomingAppointments = createdPromises.filter(isUpcoming).map((p) => ({
    label: p.title,
    dday: getDday(p.fixedTime[0]?.date),
  }));

  // 초대된 약속: 오늘 또는 미래만
  const invitedAppointments = joinedPromises.filter(isUpcoming).map((p) => ({
    label: p.title,
    dday: '수락',
  }));

  // 제안한 약속: 오늘 또는 미래만
  const proposedAppointments = createdPromises.filter(isUpcoming).map((p) => ({
    label: p.title,
    dday: '제안',
  }));

  // 지난 약속
  const pastAppointments = [
    ...getPastAppointments(createdPromises),
    ...getPastAppointments(joinedPromises),
  ];

  if (isPending) return <div>로딩중...</div>;

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

          <FixedScheduleButton />

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
                <div style={{ color: '#aaa', fontSize: 14 }}>초대된 약속이 없습니다.</div>
              </S.CardWrapper>
            ) : (
              invitedAppointments.map((item, index) => (
                <S.CardWrapper key={index}>
                  <AppointmentCard {...item} />
                </S.CardWrapper>
              ))
            )}
          </S.CardList>

          <S.SectionTitle>제안한 약속</S.SectionTitle>
          <S.CardList>
            {proposedAppointments.length === 0 ? (
              <S.CardWrapper>
                <div style={{ color: '#aaa', fontSize: 14 }}>제안한 약속이 없습니다.</div>
              </S.CardWrapper>
            ) : (
              proposedAppointments.map((item, index) => (
                <S.CardWrapper key={index}>
                  <AppointmentCard {...item} />
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
