import * as S from './style';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/promise/Header';
import CalendarRange from '@/components/calendar';
import Button from '@/components/ui/Button';
import { PROMISE_CREATE_HEADER_TEXT } from '@/constants/promise';
import { ROUTES } from '@/constants/routes';
import {
  usePromiseDataInfo,
  usePromiseDataActions,
} from '@/hooks/stores/promise/usePromiseDataStore';

const DatePage = () => {
  const navigate = useNavigate();

  const { availableTimes } = usePromiseDataInfo();
  const { setAvailableTimes } = usePromiseDataActions();

  // 기존 데이터가 있다면 Date 객체로 변환하여 초기값 설정
  const initialRange = useMemo(() => {
    if (availableTimes && availableTimes.length > 0) {
      const start = new Date(availableTimes[0].date);
      const end = new Date(availableTimes[availableTimes.length - 1].date);
      // 유효한 날짜인지 체크 후 업데이트
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        return [start, end];
      }
    }
    const today = new Date();
    return [today, today];
  }, [availableTimes]);

  const [selectedRange, setSelectedRange] = useState(initialRange);

  const handleDateRangeChange = (range) => {
    setSelectedRange(range);
  };

  const handleSaveDates = () => {
    if (!selectedRange || !selectedRange[0] || !selectedRange[1]) return;
    const dates = [];
    let d = new Date(selectedRange[0]);
    const end = new Date(selectedRange[1]);

    while (d <= end) {
      const dateStr = d.toLocaleDateString('en-CA');
      dates.push({
        dateObj: new Date(d),
        dateStr,
        day: d.toLocaleDateString('en-US', { weekday: 'long' }),
      });
      d.setDate(d.getDate() + 1);
    }
    setAvailableTimes(
      dates.map((item, idx) => {
        // 기존 데이터 중 날짜가 같은 것이 있는지 확인
        const existing = availableTimes.find((at) => at.date === item.dateStr);
        return {
          id: `schedule${idx + 1}`,
          date: item.dateStr,
          day: item.day,
          // 이미 설정된 시간이 있다면 그것을 사용하고, 없으면 빈 배열
          timeRanges: existing ? existing.timeRanges : [],
        };
      }),
    );
    navigate(ROUTES.PROMISE_CREATE_LOCATION);
  };

  return (
    <S.Container>
      <Header text={PROMISE_CREATE_HEADER_TEXT} navigateUrl={ROUTES.PROMISE_CREATE_INFO} />
      <S.CalendarWrapper>
        <CalendarRange
          key={selectedRange[0].getTime()}
          onChange={handleDateRangeChange}
          value={selectedRange}
        />
      </S.CalendarWrapper>
      <S.BtnWrapper>
        <Button
          onClick={handleSaveDates}
          disabled={
            !selectedRange ||
            (Array.isArray(selectedRange) &&
              (!selectedRange[0] || (selectedRange.length > 1 && !selectedRange[1])))
          }
        >
          다음
        </Button>
      </S.BtnWrapper>
    </S.Container>
  );
};

export default DatePage;
