import * as S from './style';
import PropTypes from 'prop-types';
import Backward from '@/components/ui/Backward';
import { BACKWARD_ICON } from '@/constants/ui';

/**
 * Promise 관련 Header 컴포넌트
 *
 * @param {string} text - 제목 텍스트
 * @param {boolean} [backward=true] - 뒤로가기 버튼 유무
 * @param {string} [backwardSize='42px'] - 뒤로가기 버튼 크기
 * @param {'back' | 'arrow'} [backwardType='back'] - 뒤로가기 버튼 종류
 * @param {string} [navigateUrl=''] - 뒤로가기시 이동할 경로
 * @param {function} [onBackwardClick] - 뒤로가기시 실행할 함수
 */

const Header = ({
  text,
  backward = true,
  backwardSize = '42px',
  backwardType = 'back',
  navigateUrl,
  onBackwardClick,
}) => {
  return (
    <S.Header>
      {backward ? (
        <Backward
          type={backwardType}
          size={backwardSize}
          navigateUrl={navigateUrl}
          onClick={onBackwardClick}
        />
      ) : null}
      <S.Text>{text}</S.Text>
      {backward && <S.DummySpace />}
    </S.Header>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  backward: PropTypes.bool,
  backwardSize: PropTypes.string,
  backwardType: PropTypes.oneOf(Object.values(BACKWARD_ICON)),
  navigateUrl: PropTypes.string,
  onBackwardClick: PropTypes.func,
};

export default Header;
