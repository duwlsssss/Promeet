import * as S from './style';
import { useState } from 'react';
import Header from '@/components/promise/Header';
import { usePromiseDataFromServerInfo } from '@/hooks/stores/promise/usePromiseDataFromServerStore';
import { PROMISE_JOIN_HEADER_TEXT } from '@/constants/promise';
import copyToClipboard from '@/utils/copyToClipBoard';
import toast from '@/utils/toast';
import FinalPlaceMap from '@/components/promise/map/FinalPlaceMap';
import { ROUTES } from '@/constants/routes';

const SummaryPage = () => {
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const time =
    promiseDataFromServer.fixedTime.length === 0
      ? '겹치는 시간이 없어요'
      : promiseDataFromServer.fixedTime
          .map(({ date, startTime, endTime }) => {
            const [year, month, day] = date.split('-');
            return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일 ${startTime} ~ ${endTime}`;
          })
          .join('\n');
  const hasFixedPlace = promiseDataFromServer.fixedPlace;
  const place = hasFixedPlace
    ? `${promiseDataFromServer.fixedPlace.name}\n${promiseDataFromServer.fixedPlace.address}`
    : '약속 생성자가 곧 확정할 거예요';

  const placeForMap = promiseDataFromServer.fixedPlace;

  const handleCopyClick = () => {
    copyToClipboard(promiseDataFromServer.fixedPlace.address);
    toast('주소가 복사됐어요');
  };

  const handlePlaceMapClick = () => {
    setIsMapOpen(!isMapOpen);
  };

  return (
    <S.Container>
      <Header text={PROMISE_JOIN_HEADER_TEXT} navigateUrl={ROUTES.HOME} />
      <S.InfoConainer>
        <S.Name>{promiseDataFromServer.title}</S.Name>
        <S.Description>{promiseDataFromServer.description}</S.Description>
      </S.InfoConainer>
      <S.Line />
      <S.StatusContainer>
        <S.StatusWrapper>
          <S.TimeIcon />
          {time}
        </S.StatusWrapper>
        <S.StatusWrapper>
          <S.LocationIcon />
          {place}
          {hasFixedPlace ? (
            <>
              <S.CopyIcon onClick={handleCopyClick} />
              <S.MapIcon onClick={handlePlaceMapClick} />
            </>
          ) : null}
        </S.StatusWrapper>
        <S.StatusWrapper>
          <S.PeopleIcon />
          <S.MemberList>
            {promiseDataFromServer.members.map((member, index) => (
              <p key={index}>{member.name}</p>
            ))}
          </S.MemberList>
        </S.StatusWrapper>
      </S.StatusContainer>
      {isMapOpen ? (
        <S.MapSection>
          <FinalPlaceMap place={placeForMap} />
        </S.MapSection>
      ) : null}
    </S.Container>
  );
};

export default SummaryPage;
