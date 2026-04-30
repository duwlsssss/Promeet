import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as S from './style';
import TimeIcon from '../../../assets/img/icon/time.svg';
import { DAYS } from '@/constants/calender';

// 시간 인덱스를 "HH:MM" 문자열로 변환
function getTimeFromIndex(hourIdx, quarterIdx) {
  const hour = String(hourIdx).padStart(2, '0');
  const minute = String(quarterIdx * 15).padStart(2, '0');
  return `${hour}:${minute}`;
}

const AbleTimeTable = ({ days, onChange, isFullTime = false }) => {
  const { minHour, maxHour } = useMemo(() => {
    // 생성 페이지(isFullTime)이거나 데이터가 없으면 무조건 0~24
    if (isFullTime || !days.some((d) => d.timeRanges?.length > 0)) {
      return { minHour: 0, maxHour: 24 };
    }

    let min = 24,
      max = 0;
    days.forEach((day) => {
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
  }, [days, isFullTime]);

  // 표시할 시간 배열
  const visibleHours = useMemo(
    () => Array.from({ length: maxHour - minHour }, (_, i) => String(i + minHour).padStart(2, '0')),
    [minHour, maxHour],
  );

  // 초기 상태를 24시간 혹은 계산된 범위에 맞게 설정
  const [selected, setSelected] = useState(() =>
    Array.from({ length: maxHour - minHour }, () =>
      Array.from({ length: days.length }, () => Array(4).fill(false)),
    ),
  );

  // days나 범위가 바뀔 때 selected 크기 재조정
  useEffect(() => {
    if (days.length > 0) {
      setSelected(
        Array.from({ length: maxHour - minHour }, () =>
          Array.from({ length: days.length }, () => Array(4).fill(false)),
        ),
      );
    }
  }, [days.length, minHour, maxHour]);

  // 생성자 가용 시간 확인 로직
  const isCreatorAvailable = useCallback(
    (dayIdx, rowIdx, quarterIdx) => {
      // 생성 페이지라면 모든 칸이 사용 가능
      if (isFullTime) return true;

      const actualHour = parseInt(visibleHours[rowIdx]);
      const cellTime = getTimeFromIndex(actualHour, quarterIdx);
      const dayData = days[dayIdx];

      // timeRanges가 아예 비어있어도 모든 시간 선택 가능
      if (!dayData?.timeRanges || dayData.timeRanges.length === 0) return true;

      return dayData.timeRanges.some((range) => {
        const start = range.startTime;
        const end = range.endTime === '00:00' ? '24:00' : range.endTime;
        return start <= cellTime && cellTime < end;
      });
    },
    [days, isFullTime, visibleHours],
  );

  const isDragging = useRef(false);
  const dragValue = useRef(true);

  const toggleQuarter = useCallback((hourIdx, dayIdx, quarterIdx) => {
    setSelected((prev) =>
      prev.map((row, h) =>
        row.map((cell, d) =>
          cell.map((val, q) =>
            h === hourIdx && d === dayIdx && q === quarterIdx ? dragValue.current : val,
          ),
        ),
      ),
    );
  }, []);

  // 마우스 이벤트 핸들러
  const handleQuarterMouseDown = (hourIdx, dayIdx, quarterIdx, e) => {
    e.preventDefault();
    isDragging.current = true;
    dragValue.current = !selected[hourIdx][dayIdx][quarterIdx];
    toggleQuarter(hourIdx, dayIdx, quarterIdx);
  };

  const handleQuarterMouseEnter = (hourIdx, dayIdx, quarterIdx) => {
    if (!isDragging.current) return;
    toggleQuarter(hourIdx, dayIdx, quarterIdx);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // 선택 상태 변경 시 상위로 전달
  useEffect(() => {
    if (onChange) onChange(selected);
  }, [selected, onChange, days.length]);

  // 렌더링 방어 코드: 인덱스 에러 방지
  if (selected.length === 0 || selected.length !== maxHour - minHour) return null;

  return (
    <S.TableWrapper onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
      <S.Row>
        <S.HeaderCell $noTop $noLeft>
          <img src={TimeIcon} alt="시간표" width={14} height={14} />
        </S.HeaderCell>
        {days.map((item, dayIdx) => {
          const dateObj = new Date(item.date);
          // JS: 0=일, 1=월, ..., 6=토
          // DAYS: 월~일 순서라면, 아래처럼 변환
          // 월요일부터 시작하는 DAYS라면:
          const jsDay = dateObj.getDay(); // 0~6 (일~토)
          // 월요일=0, ..., 일요일=6으로 맞추기
          const dayEng = Object.keys(DAYS)[(jsDay + 6) % 7];
          const dateStr = `${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(
            dateObj.getDate(),
          ).padStart(2, '0')}`;
          return (
            <S.HeaderCell key={`${item.date}-${dayIdx}`} $noTop>
              {dateStr} <br /> {DAYS[dayEng].slice(0, 1)}
            </S.HeaderCell>
          );
        })}
      </S.Row>

      {visibleHours.map((hour, hourIdx) => (
        <S.Row key={hour}>
          <S.HeaderCell $noLeft>{hour}</S.HeaderCell>
          {days.map((item, dayIdx) => (
            <S.Cell key={dayIdx}>
              {Array.from({ length: 4 }).map((_, quarterIdx) => {
                // 생성자가 제안한 시간이 아니면 비활성화
                const isAvailable = isCreatorAvailable(dayIdx, hourIdx, quarterIdx);
                return (
                  <S.Quarter
                    key={quarterIdx}
                    selected={selected[hourIdx]?.[dayIdx]?.[quarterIdx] || false}
                    $disabled={!isAvailable}
                    onMouseDown={(e) => {
                      if (!isAvailable) return;
                      handleQuarterMouseDown(hourIdx, dayIdx, quarterIdx, e);
                    }}
                    onMouseEnter={() => {
                      if (!isAvailable) return;
                      handleQuarterMouseEnter(hourIdx, dayIdx, quarterIdx);
                    }}
                  />
                );
              })}
            </S.Cell>
          ))}
        </S.Row>
      ))}
    </S.TableWrapper>
  );
};

AbleTimeTable.propTypes = {
  days: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  fixedSchedules: PropTypes.array,
  isFullTime: PropTypes.bool,
};

export default AbleTimeTable;
