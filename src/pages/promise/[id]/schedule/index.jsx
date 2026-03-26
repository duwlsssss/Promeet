import * as S from './style';
import { useRef, useMemo } from 'react';
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
  const { nearestSubwayStation, availableTimes: storedTimes } = usePromiseDataInfo();
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();
  const { setAvailableTimes } = usePromiseDataActions();

  const prevAvailableTimesRef = useRef(null);
  const selectedRef = useRef(null);

  const { mutate: joinPromise, isPending: isJoinPending } = useJoinPromise();

  // 생성자의 데이터 추출
  const creator = promiseDataFromServer?.members.find(
    (member) => member.userId === promiseDataFromServer.creatorId,
  );

  // 생성자가 제안한 원본 날짜/시간 (AbleTimeTable의 기준이 됨)
  const baseAvailableTimes = useMemo(() => {
    if (!creator?.availableTimes) return [];

    // 날짜별로 그룹화
    const grouped = creator.availableTimes.reduce((acc, curr) => {
      const existing = acc.find((item) => item.date === curr.date);
      const range = { startTime: curr.startTime, endTime: curr.endTime };

      if (existing) {
        existing.timeRanges.push(range);
      } else {
        acc.push({
          date: curr.date,
          day: curr.day,
          timeRanges: [range],
        });
      }
      return acc;
    }, []);

    return grouped;
  }, [creator]);

  // handleTimeTableChange에서 사용할 min/max 계산
  const { minHour, maxHour } = useMemo(() => {
    // 생성자가 제안한 시간이 없으면 기본 24시간 (하지만 참여 페이지라면 보통 존재함)
    if (!baseAvailableTimes.some((d) => d.timeRanges?.length > 0)) {
      return { minHour: 0, maxHour: 24 };
    }

    let min = 24;
    let max = 0;
    baseAvailableTimes.forEach((day) => {
      day.timeRanges?.forEach((range) => {
        const startH = parseInt(range.startTime.split(':')[0]);
        const [endH, endM] =
          range.endTime === '24:00' ? [24, 0] : range.endTime.split(':').map(Number);
        if (startH < min) min = startH;
        const actualEndH = endM > 0 ? endH + 1 : endH;
        if (actualEndH > max) max = actualEndH;
      });
    });
    return { minHour: min, maxHour: max };
  }, [baseAvailableTimes]);

  const hasSelectedTime = () => {
    if (!selectedRef.current) return false;

    // 2차원 배열을 순회하면서 하나라도 true가 있으면 선택된 것
    return selectedRef.current.some((hourArr) =>
      hourArr.some((dayArr) => dayArr.some((selected) => selected)),
    );
  };

  const handleJoinPromiseBtnClick = () => {
    if (!hasSelectedTime()) return;
    if (!nearestSubwayStation?.id) return;

    // 서버 전송용으로 평탄화
    const flatAvailableTimes = [];
    storedTimes.forEach((item) => {
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

    // baseAvailableTimes(생성자 기준)를 기반으로 참여자의 선택 영역 매핑
    const newAvailableTimes = baseAvailableTimes.map((item, dayIdx) => {
      // 서버에 저장할 때는 다시 24시간 전체를 기준으로 복원
      const dayArr = Array.from({ length: 24 }, (_, h) => {
        // 현재 시간 h가 화면에 보이는 범위(minHour ~ maxHour) 안에 있는지 확인
        if (h >= minHour && h < maxHour) {
          const rowIdx = h - minHour; // 압축된 selected 배열에서의 실제 행 번호

          // selected[rowIdx]가 존재하는지 방어 코드 추가
          if (selected[rowIdx] && selected[rowIdx][dayIdx]) {
            return Array.from({ length: 4 }, (_, q) => selected[rowIdx][dayIdx][q]);
          }
        }
        // 범위 밖이거나 데이터가 없으면 선택 안 됨(false) 처리
        return Array(4).fill(false);
      });

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
            days={baseAvailableTimes}
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
