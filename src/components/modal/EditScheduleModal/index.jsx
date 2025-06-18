import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import DaySelectModal from '@/components/modal/DaySelectModal';
import TimeSelectModal from '@/components/modal/TimeSelectModal';
import selectIcon from '@/assets/img/icon/dropdown.svg';
import crossIcon from '@/assets/img/icon/cross.svg';
import { DAYS } from '@/constants/calender';
import * as S from './style';

// 시간 → 분 변환
function timeToMinutes({ hour, minute }) {
  return Number(hour) * 60 + Number(minute);
}
function addMinutes(time, mins) {
  let total = timeToMinutes(time) + mins;
  if (total < 0) total += 24 * 60;
  total = total % (24 * 60);
  return {
    hour: String(Math.floor(total / 60)).padStart(2, '0'),
    minute: String(total % 60).padStart(2, '0'),
  };
}
// 00:00(24:00) 처리 보조
function getEndMins(time) {
  return time.hour === '00' && time.minute === '00' ? 1440 : timeToMinutes(time);
}

const EditScheduleModal = ({ isOpen, schedule, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    title: '',
    day: 'Monday',
    startTime: { hour: '09', minute: '00' },
    endTime: { hour: '18', minute: '00' },
  });
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    if (schedule) {
      setForm({
        title: schedule.title ?? '',
        day: schedule.day ?? 'Monday',
        startTime: {
          hour: schedule.startTime.hour,
          minute: schedule.startTime.minute,
        },
        endTime: {
          hour: schedule.endTime.hour,
          minute: schedule.endTime.minute,
        },
      });
    }
  }, [schedule]);

  if (!isOpen || !schedule) return null;

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleDaySelect = (day) => {
    setForm((prev) => ({ ...prev, day }));
    closeModal();
  };

  // 시작 시간 선택: 끝 시간과의 관계 예외 처리
  const handleStartTimeSelect = (time) => {
    const startMins = timeToMinutes(time);
    const isEndTimeMidnight = form.endTime.hour === '00' && form.endTime.minute === '00';
    let endMins = isEndTimeMidnight ? 1440 : timeToMinutes(form.endTime);

    let newStart = time;
    let newEnd = form.endTime;

    if (startMins >= endMins) {
      // 시작이 23:00 이후면 끝 00:00(24:00)
      if (startMins >= 1380) {
        newEnd = { hour: '00', minute: '00' };
      }
      // 끝이 24:00이면 그대로
      else if (isEndTimeMidnight) {
        newEnd = { hour: '00', minute: '00' };
      }
      // 그 외 1시간 뒤
      else {
        newEnd = addMinutes(time, 60);
      }
    }
    setForm((prev) => ({
      ...prev,
      startTime: newStart,
      endTime: newEnd,
    }));
    closeModal();
  };

  // 끝 시간 선택: 시작 시간과의 관계 예외 처리
  const handleEndTimeSelect = (time) => {
    const endMins = getEndMins(time);
    const startMins = timeToMinutes(form.startTime);

    let newEnd = time;
    let newStart = form.startTime;

    if (endMins <= startMins) {
      // 01:00 이전이면 시작 00:00
      if (endMins < 60) {
        newStart = { hour: '00', minute: '00' };
      }
      // 그 외 1시간 전
      else {
        newStart = addMinutes(time, -60);
      }
    }
    setForm((prev) => ({
      ...prev,
      startTime: newStart,
      endTime: newEnd,
    }));
    closeModal();
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 서버가 요구하는 형식으로 변환
    const fixedSchedule = {
      id: schedule.id,
      day: form.day,
      startTime: `${form.startTime.hour}:${form.startTime.minute}`,
      endTime: `${form.endTime.hour}:${form.endTime.minute}`,
      title: form.title, // title 필드가 필요하다면 포함
    };

    onUpdate(fixedSchedule);
  };

  return (
    <>
      <S.Overlay>
        <S.TopBar>
          <S.CloseButton onClick={onClose} aria-label="close">
            <img src={crossIcon} alt="Close" />
          </S.CloseButton>
          <S.AddScheduleTitle>일정 수정</S.AddScheduleTitle>
          <S.SubmitButton type="button" onClick={handleSubmit}>
            저장
          </S.SubmitButton>
        </S.TopBar>
        <S.Slide>
          <S.ScheduleInput
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="일정명"
            required
          />
          <S.Divider />
          <S.TableSetting>
            <S.DayTimeSelect>
              <S.DaySelectButton type="button" onClick={() => openModal('day')}>
                {DAYS[form.day]}
                <img src={selectIcon} alt="Select Day" />
              </S.DaySelectButton>
              <S.TimeRow>
                <S.TimeButton type="button" onClick={() => openModal('start')}>
                  {form.startTime.hour}:{form.startTime.minute}
                  <img src={selectIcon} alt="Select Time" />
                </S.TimeButton>
              </S.TimeRow>
              <S.TimeRow>
                <S.TimeButton type="button" onClick={() => openModal('end')}>
                  {form.endTime.hour === '00' && form.endTime.minute === '00'
                    ? '24:00'
                    : `${form.endTime.hour}:${form.endTime.minute}`}
                  <img src={selectIcon} alt="Select Time" />
                </S.TimeButton>
              </S.TimeRow>
            </S.DayTimeSelect>
          </S.TableSetting>
        </S.Slide>
      </S.Overlay>
      <DaySelectModal
        isOpen={modalType === 'day'}
        onClose={closeModal}
        onSelect={handleDaySelect}
        days={Object.keys(DAYS)}
        dayLabels={DAYS}
      />
      <TimeSelectModal
        isOpen={modalType === 'start'}
        onClose={closeModal}
        onSelect={handleStartTimeSelect}
        initialHour={form.startTime.hour}
        initialMinute={form.startTime.minute}
      />
      <TimeSelectModal
        isOpen={modalType === 'end'}
        onClose={closeModal}
        onSelect={handleEndTimeSelect}
        initialHour={form.endTime.hour}
        initialMinute={form.endTime.minute}
        isEnd
      />
    </>
  );
};

EditScheduleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  schedule: PropTypes.object,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // 추가
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditScheduleModal;
