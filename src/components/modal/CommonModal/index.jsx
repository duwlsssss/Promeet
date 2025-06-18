import PropTypes from 'prop-types';
import * as S from './style';

/*
 * CommonModal 컴포넌트
 *
 * @property {boolean} isOpen - 모달 열림 여부
 * @property {function} onClose - 닫기 버튼 클릭 시 호출
 * @property {React.ReactNode} children - 모달 내부 컨텐츠
 */
const CommonModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.Modal>
        <S.CloseButton onClick={onClose} aria-label="closeModal">
          ×
        </S.CloseButton>
        <S.Content>{children}</S.Content>
      </S.Modal>
    </S.Overlay>
  );
};

CommonModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default CommonModal;
