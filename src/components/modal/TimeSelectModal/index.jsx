import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import * as S from './style';

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = ['00', '15', '30', '45'];

function getPrevNext(arr, current) {
  const idx = arr.indexOf(current);
  const prev = arr[(idx - 1 + arr.length) % arr.length];
  const next = arr[(idx + 1) % arr.length];
  return { prev, next };
}

const TimeSelectModal = ({
  isOpen,
  onClose,
  onSelect,
  initialHour,
  initialMinute,
  isEnd = false,
}) => {
  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);

  // 스로틀용 ref
  const lastHourWheelTime = useRef(0);
  const lastMinuteWheelTime = useRef(0);
  const throttleMs = 70; // 70ms마다 한 번만 반응

  // 모달이 열릴 때마다 초기값 동기화
  useEffect(() => {
    if (isOpen) {
      setSelectedHour(initialHour);
      setSelectedMinute(initialMinute);
    }
  }, [isOpen, initialHour, initialMinute]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleHourWheel = (e) => {
    const now = Date.now();
    if (now - lastHourWheelTime.current < throttleMs) return;
    lastHourWheelTime.current = now;

    if (e.deltaY < 0) {
      setSelectedHour(getPrevNext(HOURS, selectedHour).prev);
    } else if (e.deltaY > 0) {
      setSelectedHour(getPrevNext(HOURS, selectedHour).next);
    }
  };

  const handleMinuteWheel = (e) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastMinuteWheelTime.current < throttleMs) return;
    lastMinuteWheelTime.current = now;

    const currentIdx = MINUTES.indexOf(selectedMinute);
    if (e.deltaY < 0) {
      if (currentIdx === 0) {
        setSelectedMinute(MINUTES[MINUTES.length - 1]);
        setSelectedHour(getPrevNext(HOURS, selectedHour).prev);
      } else {
        setSelectedMinute(MINUTES[currentIdx - 1]);
      }
    } else if (e.deltaY > 0) {
      if (currentIdx === MINUTES.length - 1) {
        setSelectedMinute(MINUTES[0]);
        setSelectedHour(getPrevNext(HOURS, selectedHour).next);
      } else {
        setSelectedMinute(MINUTES[currentIdx + 1]);
      }
    }
  };

  const handleSelect = () => {
    onSelect({ hour: selectedHour, minute: selectedMinute });
    onClose();
  };

  const { prev: prevHour, next: nextHour } = getPrevNext(HOURS, selectedHour);
  const { prev: prevMinute, next: nextMinute } = getPrevNext(MINUTES, selectedMinute);

  // 00:00을 24:00으로 표시
  const displayHour =
    isEnd && selectedHour === '00' && selectedMinute === '00' ? '24' : selectedHour;
  const displayPrevHour = prevHour;
  const displayNextHour = isEnd && nextHour === '00' ? '24' : nextHour;

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.Modal>
        <S.Title>시간 선택</S.Title>
        <S.ScrollPickerWrapper>
          <S.PickerCol onWheel={handleHourWheel} tabIndex={0}>
            <S.PrevNext>{displayPrevHour}</S.PrevNext>
            <S.Selected>{displayHour}</S.Selected>
            <S.PrevNext>{displayNextHour}</S.PrevNext>
          </S.PickerCol>
          <S.Colon>:</S.Colon>
          <S.PickerCol onWheel={handleMinuteWheel} tabIndex={0}>
            <S.PrevNext>{prevMinute}</S.PrevNext>
            <S.Selected>{selectedMinute}</S.Selected>
            <S.PrevNext>{nextMinute}</S.PrevNext>
          </S.PickerCol>
        </S.ScrollPickerWrapper>
        <S.ConfirmButton type="button" onClick={handleSelect}>
          확인
        </S.ConfirmButton>
      </S.Modal>
    </S.Overlay>
  );
};

TimeSelectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  initialHour: PropTypes.string.isRequired,
  initialMinute: PropTypes.string.isRequired,
  isEnd: PropTypes.bool,
};

export default TimeSelectModal;
