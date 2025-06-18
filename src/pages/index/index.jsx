import React from 'react';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import DeferredLoader from '@/components/ui/DeferredLoader';
import Button from '@/components/ui/Button';
import Navbar from '@/layouts/Navbar';
import useGetMultiplePromiseData from '@/hooks/queries/useGetMultiplePromiseData';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import { BUILD_ROUTES, ROUTES } from '@/constants/routes';
import alarmIcon from '@/assets/img/icon/alarm.svg';
import Card from '@/components/ui/card';
import AppointmentCard from '@/components/ui/ddaycard';

// 오늘, 다가오는 약속 추출
const classifyPromises = (Promises) => {
  const today = dayjs().format('YYYY-MM-DD');
  const todayPromises = [];

  Promises.forEach((promise) => {
    if (!promise?.fixedTime || !promise?.fixedPlace) return;

    let isToday = false;

    promise.fixedTime.forEach((slot) => {
      if (slot.date === today) isToday = true;
    });

    // dday 계산 추가
    // const firstTime = promise.fixedTime[0];
    // const dday = dayjs(firstTime.date).diff(today, 'day'); // ❌ 사용하지 않으므로 삭제

    if (isToday) todayPromises.push({ ...promise, dday: 0 });
  });

  return { todayPromises };
};

const HomePage = () => {
  const [cardIdx, setCardIdx] = React.useState(0);
  const startX = React.useRef(null);

  const navigate = useNavigate();
  const { userId, userName, promises } = useUserInfo();

  // 실제 데이터로 대체
  const createIds = promises.create ?? []; // 생성한 약속 ids
  const joinIds = promises.join ?? []; // 초대받은 약속 ids

  const createQueries = useGetMultiplePromiseData(createIds, userId);
  const joinQueries = useGetMultiplePromiseData(joinIds, userId);

  const isLoading = createQueries.some((q) => q.isPending) || joinQueries.some((q) => q.isPending);

  // falsy값 제거해 정상적으로 받은 데이터만 필터링
  const createdPromises = createQueries.map((q) => q.data).filter(Boolean);
  const joinedPromises = joinQueries.map((q) => q.data).filter(Boolean);

  // console.log('참여 요청받은 약속', joinIds, '생성한 약속', createIds);

  const allPromises = [...createdPromises, ...joinedPromises]; // 생성 + 초대
  const { todayPromises } = classifyPromises(allPromises);

  // 드래그 시작
  const handleDragStart = (e) => {
    startX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  };
  // 드래그 끝
  const handleDragEnd = (e) => {
    if (startX.current === null) return;
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - startX.current;

    if (diff < -50) {
      // 왼쪽으로 넘기면 다음 카드
      setCardIdx((prev) => (prev === todayPromises.length - 1 ? 0 : prev + 1));
    } else if (diff > 50) {
      // 오른쪽으로 넘기면 이전 카드
      setCardIdx((prev) => (prev === 0 ? todayPromises.length - 1 : prev - 1));
    }
    startX.current = null;
  };

  const handleCreatePromiseBtnClick = () => {
    if (!userId) navigate(ROUTES.SIGN_IN);
    else navigate(ROUTES.PROMISE_CREATE_INFO);
  };

  const handleAppointmentClick = (promiseId) => {
    console.log(promiseId);
    navigate(BUILD_ROUTES.PROMISE_SUMMARY(promiseId));
  };

  if (!userId)
    return (
      <S.EnterContainer>
        <S.LogoContainer>
          <S.Logo />
          <S.EnterText>쉽고 빠른 약속 정하기</S.EnterText>
        </S.LogoContainer>
        <Button color="point1" onClick={handleCreatePromiseBtnClick}>
          약속 잡으러가기
        </Button>
      </S.EnterContainer>
    );

  return (
    <>
      {isLoading ? (
        <DeferredLoader />
      ) : (
        <>
          <S.Container>
            {/* 상단 헤더 */}
            <S.Header>
              <S.HeaderRow>
                <S.TopRow>{dayjs().format('ddd, D')}</S.TopRow>
                <S.AlarmIcon src={alarmIcon} alt="알람" />
              </S.HeaderRow>
              <S.Greeting style={{ marginTop: '24px' }}>
                {userName}님,
                <br />
                오늘 일정 잊지 않으셨죠?
              </S.Greeting>
            </S.Header>

            <S.SectionTitle />
            <S.TodayCardWrapper>
              {todayPromises.length === 0 ? (
                <S.EmptyBox>
                  <S.EmptyText>
                    지금 바로,
                    <br /> 약속을 잡아보세요
                  </S.EmptyText>
                </S.EmptyBox>
              ) : (
                <S.TodayCardScroller
                  $cardIdx={cardIdx}
                  onTouchStart={handleDragStart}
                  onTouchEnd={handleDragEnd}
                  onMouseDown={handleDragStart}
                  onMouseUp={handleDragEnd}
                >
                  {todayPromises.map((card, i) => (
                    <S.TodayCard
                      key={card.promiseId}
                      style={{ opacity: cardIdx === i ? 1 : 0.6 }}
                      $active={cardIdx === i}
                    >
                      <Card
                        title={card.title}
                        subtitle={`${card.fixedTime?.[0]?.date} ${card.fixedTime?.[0]?.startTime}`}
                        dday={
                          card.dday === 0 || card.dday === '0' ? 'D-DAY' : `D-${card.dday ?? '0'}`
                        }
                        avatars={card.avatars ?? []}
                      />
                    </S.TodayCard>
                  ))}
                </S.TodayCardScroller>
              )}
            </S.TodayCardWrapper>

            {/* 다가오는 약속 리스트 */}
            <S.SectionTitle>다가오는 약속</S.SectionTitle>

            {/* 내가 생성한 약속 리스트 */}
            <S.SectionTitle2>내가 생성한 약속</S.SectionTitle2>
            {createdPromises.filter((promise) => {
              const firstTime = promise.fixedTime?.[0];
              if (!firstTime) return false;
              const dday = dayjs(firstTime.date).diff(dayjs().format('YYYY-MM-DD'), 'day');
              return dday >= 0;
            }).length === 0 ? (
              <S.EmptyPromiseBox>
                <S.EmptyPromiseText>아직 생성한 약속이 없어요!</S.EmptyPromiseText>
              </S.EmptyPromiseBox>
            ) : (
              createdPromises
                .filter((promise) => {
                  const firstTime = promise.fixedTime?.[0];
                  if (!firstTime) return false;
                  const dday = dayjs(firstTime.date).diff(dayjs().format('YYYY-MM-DD'), 'day');
                  return dday >= 0;
                })
                .sort((a, b) => {
                  const ddayA = dayjs(a.fixedTime?.[0]?.date).diff(
                    dayjs().format('YYYY-MM-DD'),
                    'day',
                  );
                  const ddayB = dayjs(b.fixedTime?.[0]?.date).diff(
                    dayjs().format('YYYY-MM-DD'),
                    'day',
                  );
                  return ddayA - ddayB;
                })
                .map((promise) => (
                  <S.Appointment
                    key={promise.promiseId}
                    onClick={() => handleAppointmentClick(promise.promiseId)}
                  >
                    <div>
                      <small>내가 생성함</small>
                      <h4>{promise.title}</h4>
                      <span>{promise.fixedTime?.[0]?.date}</span>
                    </div>
                    <AppointmentCard
                      dday={getDday(promise.fixedTime?.[0]?.date)}
                      label=""
                      size={40}
                    />
                  </S.Appointment>
                ))
            )}

            {/* 초대받은 약속 리스트 */}
            <S.SectionTitle2>초대받은 약속</S.SectionTitle2>
            {joinedPromises.filter((promise) => {
              const firstTime = promise.fixedTime?.[0];
              if (!firstTime) return false;
              const dday = dayjs(firstTime.date).diff(dayjs().format('YYYY-MM-DD'), 'day');
              return dday >= 0;
            }).length === 0 ? (
              <S.EmptyPromiseBox>
                <S.EmptyPromiseText>아직 초대 받은 약속이 없어요!</S.EmptyPromiseText>
              </S.EmptyPromiseBox>
            ) : (
              joinedPromises
                .filter((promise) => {
                  const firstTime = promise.fixedTime?.[0];
                  if (!firstTime) return false;
                  const dday = dayjs(firstTime.date).diff(dayjs().format('YYYY-MM-DD'), 'day');
                  return dday >= 0;
                })
                .sort((a, b) => {
                  const ddayA = dayjs(a.fixedTime?.[0]?.date).diff(
                    dayjs().format('YYYY-MM-DD'),
                    'day',
                  );
                  const ddayB = dayjs(b.fixedTime?.[0]?.date).diff(
                    dayjs().format('YYYY-MM-DD'),
                    'day',
                  );
                  return ddayA - ddayB;
                })
                .map((promise) => (
                  <S.Appointment
                    key={promise.promiseId}
                    onClick={() => handleAppointmentClick(promise.promiseId)}
                  >
                    <div>
                      <small>초대받음</small>
                      <h4>{promise.title}</h4>
                      <span>{promise.fixedTime?.[0]?.date}</span>
                    </div>
                    <AppointmentCard
                      dday={getDday(promise.fixedTime?.[0]?.date)}
                      label=""
                      size={40}
                    />
                  </S.Appointment>
                ))
            )}
          </S.Container>
          <Navbar />
        </>
      )}
    </>
  );
};

export default HomePage;

// D-day 계산 함수
function getDday(dateStr) {
  if (!dateStr) return '';
  const today = dayjs().startOf('day');
  const target = dayjs(dateStr).startOf('day');
  const diff = target.diff(today, 'day');
  if (diff === 0) return 'D-0'; // 당일이면 D-0
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}
