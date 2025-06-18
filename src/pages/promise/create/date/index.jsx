import * as S from './style';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/promise/Header';
import CalendarRange from '@/components/calendar';
import Button from '@/components/ui/Button';
import { PROMISE_CREATE_HEADER_TEXT } from '@/constants/promise';
import { ROUTES } from '@/constants/routes';
import { usePromiseDataActions } from '@/hooks/stores/promise/usePromiseDataStore';
import { useState } from 'react';

const DatePage = () => {
  const navigate = useNavigate();
  const { setAvailableTimes } = usePromiseDataActions();
  const [selectedRange, setSelectedRange] = useState(null);

  const handleDateRangeChange = (range) => {
    setSelectedRange(range);
  };

  const handleSaveDates = () => {
    if (!selectedRange || !selectedRange[0] || !selectedRange[1]) return;
    const dates = [];
    let d = new Date(
      selectedRange[0].getFullYear(),
      selectedRange[0].getMonth(),
      selectedRange[0].getDate(),
    );
    const end = new Date(
      selectedRange[1].getFullYear(),
      selectedRange[1].getMonth(),
      selectedRange[1].getDate(),
    );
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
      dates.map((item, idx) => ({
        id: `schedule${idx + 1}`,
        date: item.dateStr,
        day: item.day,
        timeRanges: [],
      })),
    );
    navigate(ROUTES.PROMISE_CREATE_LOCATION);
  };

  return (
    <S.Container>
      <Header text={PROMISE_CREATE_HEADER_TEXT} navigateUrl={ROUTES.PROMISE_CREATE_INFO} />
      <S.CalendarWrapper>
        <CalendarRange onChange={handleDateRangeChange} value={selectedRange} />
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
