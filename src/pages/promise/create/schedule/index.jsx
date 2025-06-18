import * as S from './style';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Header from '@/components/promise/Header';
import Button from '@/components/ui/Button';
import ShareLinkModal from '@/components/modal/ShareLinkModal';
import AbleTimeTable from '@/components/timeTable/AbleTimeTable';
import DeferredLoader from '@/components/ui/DeferredLoader';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import {
  usePromiseDataInfo,
  usePromiseDataActions,
} from '@/hooks/stores/promise/usePromiseDataStore';
import useGetUserData from '@/hooks/queries/useGetUserData';
import useCreatePromise from '@/hooks/mutations/useCreatePromise';
import { PROMISE_CREATE_HEADER_TEXT } from '@/constants/promise';
import { BUILD_ROUTES, ROUTES } from '@/constants/routes';

const SchedulePage = () => {
  // 공유 주소 모달
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [promiseId, setPromiseId] = useState('');

  const navigate = useNavigate();

  const { userId, fixedSchedules } = useUserInfo();
  const { isPending: isGetUserDataPending } = useGetUserData(userId);

  // 폼 제출 위해 가져옴
  const { name, description, memberCnt, nearestSubwayStation, availableTimes } =
    usePromiseDataInfo();
  const { setAvailableTimes, resetPromiseData } = usePromiseDataActions();
  const prevAvailableTimesRef = useRef(null);
  const selectedRef = useRef(null);

  const { mutateAsync: createPromise, isPending: isCreatePromisePending } = useCreatePromise();

  const handleCreatePromiseBtnClick = async () => {
    // 날짜별로 여러 구간을 각각 객체로 변환
    const newAvailableTimes = [];
    availableTimes.forEach((item) => {
      if (!item.timeRanges || item.timeRanges.length === 0) return;
      item.timeRanges.forEach((range) => {
        newAvailableTimes.push({
          id: uuidv4(),
          date: item.date,
          day: item.day,
          startTime: range.startTime,
          endTime: range.endTime,
        });
      });
    });

    const res = await createPromise({
      creatorId: userId,
      promiseName: name,
      promiseDescription: description,
      memberCnt,
      nearestStation: nearestSubwayStation,
      availableTimes: newAvailableTimes,
    });

    const pId = res.data.promiseId;
    const shareLink = `https://promeet-develop.vercel.app/promise/${pId}/join`;
    setPromiseId(pId);
    setShareLink(shareLink);
    setIsOpenShareModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenShareModal(false);
    resetPromiseData(); // 저장해놨던 데이터 비우기
    navigate(BUILD_ROUTES.PROMISE_FINALIZE(promiseId));
  };

  // 시간 인덱스를 "HH:MM" 문자열로 변환
  function getTimeFromIndex(hourIdx, quarterIdx) {
    const hour = String(hourIdx).padStart(2, '0');
    const minute = String(quarterIdx * 15).padStart(2, '0');
    return `${hour}:${minute}`;
  }

  // 선택된 시간표에서 연속된 구간 추출
  function extractTimeRanges(selectedDayArr) {
    const ranges = [];
    let rangeStart = null;
    for (let h = 0; h < 24; h++) {
      for (let q = 0; q < 4; q++) {
        if (selectedDayArr[h][q]) {
          if (rangeStart === null) rangeStart = { hour: h, quarter: q };
        } else {
          if (rangeStart !== null) {
            ranges.push({
              start: getTimeFromIndex(rangeStart.hour, rangeStart.quarter),
              end: getTimeFromIndex(h, q),
            });
            rangeStart = null;
          }
        }
      }
    }
    if (rangeStart !== null) {
      ranges.push({
        start: getTimeFromIndex(rangeStart.hour, rangeStart.quarter),
        end: '24:00',
      });
    }
    return ranges;
  }

  const handleTimeTableChange = (selected) => {
    selectedRef.current = selected;
    const newAvailableTimes = availableTimes.map((item, dayIdx) => {
      const dayArr = Array.from({ length: 24 }, (_, h) =>
        Array.from({ length: 4 }, (_, q) => selected[h][dayIdx][q]),
      );
      const ranges = extractTimeRanges(dayArr);
      return {
        ...item,
        timeRanges: ranges.map((r) => ({
          startTime: r.start,
          endTime: r.end,
        })),
      };
    });

    // 상태 변경이 있을 때만 저장
    const prev = prevAvailableTimesRef.current;
    const isSame = prev && JSON.stringify(prev) === JSON.stringify(newAvailableTimes);

    if (!isSame) {
      prevAvailableTimesRef.current = newAvailableTimes;
      setAvailableTimes(newAvailableTimes);
    }
  };

  // "가능 시간 입력 여부" 체크 함수 추가
  const hasSelectedTime = () => {
    return availableTimes.some(
      (item) => Array.isArray(item.timeRanges) && item.timeRanges.length > 0,
    );
  };

  return (
    <>
      {isGetUserDataPending ? (
        <DeferredLoader />
      ) : (
        <>
          <S.Container>
            <Header
              text={PROMISE_CREATE_HEADER_TEXT}
              navigateUrl={ROUTES.PROMISE_CREATE_LOCATION}
            />
            <S.TableScrollWrapper>
              <S.TableInnerWrapper>
                <AbleTimeTable
                  days={availableTimes}
                  onChange={handleTimeTableChange}
                  fixedSchedules={fixedSchedules}
                />
              </S.TableInnerWrapper>
            </S.TableScrollWrapper>
            <S.BtnWrapper>
              <Button
                onClick={handleCreatePromiseBtnClick}
                disabled={isCreatePromisePending || !hasSelectedTime()}
              >
                {isCreatePromisePending ? '약속 생성 중...' : '약속 생성'}
              </Button>
            </S.BtnWrapper>
          </S.Container>
          <ShareLinkModal
            isOpen={isOpenShareModal}
            shareLink={shareLink}
            onClose={handleCloseModal}
          />
        </>
      )}
    </>
  );
};

export default SchedulePage;
