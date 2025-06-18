import * as S from './style';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Header from '@/components/promise/Header';
import Button from '@/components/ui/Button';
import AbleTimeTable from '@/components/timeTable/AbleTimeTable';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import {
  usePromiseDataInfo,
  usePromiseDataActions,
} from '@/hooks/stores/promise/usePromiseDataStore';
import useJoinPromise from '@/hooks/mutations/useJoinPromise';
import { usePromiseDataFromServerInfo } from '@/hooks/stores/promise/usePromiseDataFromServerStore';
import { PROMISE_CREATE_HEADER_TEXT } from '@/constants/promise';
import { BUILD_ROUTES } from '@/constants/routes';

const JoinSchedulePage = () => {
  const { promiseId } = useParams();
  const { fixedSchedules } = useUserInfo();

  // 폼 제출 위해 가져옴
  const { nearestSubwayStation } = usePromiseDataInfo();
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();
  const { setAvailableTimes, resetPromiseData } = usePromiseDataActions();
  const prevAvailableTimesRef = useRef(null);
  const selectedRef = useRef(null);

  const { mutateAsync: joinPromise, isPending: isJoinPending } = useJoinPromise();

  // 생성자가 설정한 날짜만 가져오기
  const creator = promiseDataFromServer?.members.find(
    (member) => member.userId === promiseDataFromServer.creatorId,
  );

  // 날짜만 추출해서 새로운 배열 생성
  const availableTimes =
    creator?.availableTimes.map(({ date, day }) => ({
      date,
      day,
      timeRanges: [],
    })) ?? [];

  const hasSelectedTime = () => {
    if (!selectedRef.current) return false;

    // 2차원 배열을 순회하면서 하나라도 true가 있으면 선택된 것
    return selectedRef.current.some((hourArr) =>
      hourArr.some((dayArr) => dayArr.some((selected) => selected)),
    );
  };

  const handleJoinPromiseBtnClick = async () => {
    const newAvailableTimes = availableTimes
      .map((item, dayIdx) => {
        const dayArr = Array.from({ length: 24 }, (_, h) =>
          Array.from({ length: 4 }, (_, q) => selectedRef.current[h][dayIdx][q]),
        );
        const ranges = extractTimeRanges(dayArr);
        return {
          ...item,
          timeRanges: ranges.map((r) => ({
            startTime: r.start,
            endTime: r.end,
          })),
        };
      })
      .filter((item) => item.timeRanges.length > 0);

    // 날짜별 여러 구간을 각각 객체로 변환
    const flatAvailableTimes = [];
    newAvailableTimes.forEach((item) => {
      item.timeRanges.forEach((range) => {
        flatAvailableTimes.push({
          id: uuidv4(),
          date: item.date,
          day: item.day,
          startTime: range.startTime,
          endTime: range.endTime,
        });
      });
    });

    // 서버로 전송
    joinPromise({
      promiseId,
      nearestStation: nearestSubwayStation,
      availableTimes: flatAvailableTimes,
    });

    resetPromiseData();
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

  return (
    <S.Container>
      <Header
        text={PROMISE_CREATE_HEADER_TEXT}
        navigateUrl={BUILD_ROUTES.PROMISE_LOCATION(promiseId)}
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
        <Button onClick={handleJoinPromiseBtnClick} disabled={isJoinPending || !hasSelectedTime()}>
          {isJoinPending ? '약속 참여 중...' : '약속 참여'}
        </Button>
      </S.BtnWrapper>
    </S.Container>
  );
};
export default JoinSchedulePage;
