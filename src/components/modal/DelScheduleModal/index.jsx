import * as S from './style';
import CommonModal from '@/components/modal/CommonModal';
import PropTypes from 'prop-types';

const DelScheduleModal = ({ isOpen, schedule, onClose, onDelete }) => {
  if (!isOpen || !schedule) return null;

  const handleDeleteSchedule = () => {
    onDelete(schedule.id);
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <S.ModalContent>
        <S.Title>이 일정을 삭제하시겠습니까?</S.Title>
        <S.Info>
          <S.ScheduleName>{schedule.title}</S.ScheduleName>
          <br />
          {schedule.day} {schedule.startTime.hour}:{schedule.startTime.minute} ~{' '}
          {schedule.endTime.hour}:{schedule.endTime.minute}
        </S.Info>
        <S.ButtonRow>
          <S.CancelButton onClick={onClose}>취소</S.CancelButton>
          <S.DeleteButton onClick={handleDeleteSchedule}>삭제</S.DeleteButton>
        </S.ButtonRow>
      </S.ModalContent>
    </CommonModal>
  );
};

DelScheduleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  schedule: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    startTime: PropTypes.shape({
      hour: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      minute: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    endTime: PropTypes.shape({
      hour: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      minute: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DelScheduleModal;
