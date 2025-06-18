import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import * as S from './style';
import 'react-calendar/dist/Calendar.css';
import prevIcon from '../../assets/img/icon/left.svg';
import nextIcon from '../../assets/img/icon/right.svg';
import PropTypes from 'prop-types';

export default function CalendarRange({ onChange, value }) {
  const [range, setRange] = useState([new Date(), new Date()]);
  const [dragging, setDragging] = useState(false);
  const [dragRange, setDragRange] = useState({ from: null, to: null });

  const today = new Date();

  const isPastDay = (date) => {
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const compare = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return compare < todayMidnight;
  };

  const handleMouseDown = (date) => {
    setDragging(true);
    setDragRange({ from: date, to: date });
  };

  const handleMouseEnter = (date) => {
    if (dragging && dragRange.from) {
      setDragRange((prev) => ({ ...prev, to: date }));
    }
  };

  const handleMouseUp = useCallback(() => {
    if (dragRange.from && dragRange.to) {
      const [start, end] = [dragRange.from, dragRange.to].sort((a, b) => a - b);
      setRange([start, end]);
      if (typeof onChange === 'function') {
        onChange([start, end]);
      }
    }
    setDragging(false);
  }, [dragRange.from, dragRange.to, onChange]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragRange, handleMouseUp]);

  return (
    <S.CalendarWrapper>
      <Calendar
        onChange={onChange}
        value={value}
        tileDisabled={({ date }) => isPastDay(date)}
        tileClassName={({ date, view, activeStartDate }) => {
          if (view === 'month') {
            const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

            const dragFrom =
              dragRange.from &&
              new Date(
                dragRange.from.getFullYear(),
                dragRange.from.getMonth(),
                dragRange.from.getDate(),
              );
            const dragTo =
              dragRange.to &&
              new Date(dragRange.to.getFullYear(), dragRange.to.getMonth(), dragRange.to.getDate());

            if (range[0] && range[1]) {
              const start = new Date(range[0].setHours(0, 0, 0, 0));
              const end = new Date(range[1].setHours(0, 0, 0, 0));
              if (start.getTime() === end.getTime() && dateOnly.getTime() === start.getTime()) {
                return 'single-day';
              }
            }
            if (dragFrom && dragTo) {
              const [start, end] = dragFrom < dragTo ? [dragFrom, dragTo] : [dragTo, dragFrom];

              if (dateOnly.getTime() === start.getTime()) return 'drag-start';
              if (dateOnly.getTime() === end.getTime()) return 'drag-end';
              if (dateOnly > start && dateOnly < end) return 'custom-drag-range';
            }
            if (isPastDay(dateOnly)) return 'past-day';
            if (date.getMonth() !== activeStartDate.getMonth()) return 'not-this-month';
            return 'future-day';
          }
          return null;
        }}
        tileContent={({ date }) => (
          <S.TileOverlay
            onMouseDown={() => handleMouseDown(date)}
            onMouseEnter={() => handleMouseEnter(date)}
          />
        )}
        locale="en-US"
        formatMonthYear={(locale, date) =>
          `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}`
        }
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 1)
        }
        next2Label={null}
        prev2Label={null}
        nextLabel={<img src={nextIcon} alt="Next" />}
        prevLabel={<img src={prevIcon} alt="Previous" />}
      />
    </S.CalendarWrapper>
  );
}

CalendarRange.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
};
