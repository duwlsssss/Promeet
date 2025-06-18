import PropTypes from 'prop-types';
import * as S from './style';
import { DAYS } from '@/constants/calender';

const DaySelectModal = ({ isOpen, onClose, onSelect }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.Modal>
        <S.List>
          {Object.keys(DAYS).map((day) => (
            <S.Item key={day}>
              <S.Button
                type="button"
                onClick={() => {
                  onSelect(day);
                  onClose();
                }}
              >
                {DAYS[day]}
              </S.Button>
            </S.Item>
          ))}
        </S.List>
      </S.Modal>
    </S.Overlay>
  );
};

DaySelectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DaySelectModal;
