import * as S from './style';
import PropTypes from 'prop-types';
import CommonModal from '../CommonModal';
import Button from '@/components/ui/Button';
import toast from '@/utils/toast';
import copyToClipboard from '@/utils/copyToClipBoard';

const ShareLinkModal = ({ isOpen, shareLink, onClose }) => {
  const handleCopyLinkBtnClick = () => {
    copyToClipboard(shareLink);
    toast('약속 링크가 복사됐어요');
    onClose();
  };
  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <S.Container>
        <S.Text>{`약속의 링크가 생성되었어요\n 공유하고 친구의 일정을 알아보세요`}</S.Text>
        <S.Link>
          <p>{shareLink}</p>
        </S.Link>
        <S.BtnWrapper>
          <Button onClick={handleCopyLinkBtnClick}>주소 복사하기</Button>
        </S.BtnWrapper>
      </S.Container>
    </CommonModal>
  );
};

ShareLinkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  shareLink: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShareLinkModal;
