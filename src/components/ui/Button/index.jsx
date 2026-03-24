import * as S from './style';
import PropTypes from 'prop-types';
import { BUTTON_COLORS, BUTTON_TYPES } from '@/constants/ui';

/**
 * Button 컴포넌트
 * @param {'main'|'point1'} [color='main'] - 색상
 * @param {boolean} [disabled=false] - disabled 여부
 * @param {string} [maxWidth='100%'] - 최대 너비
 * @param {string} [type='button'] - 버튼 타입
 */
const Button = ({
  color = 'main',
  disabled = false,
  maxWidth = '100%',
  type = 'button',
  ...props
}) => {
  return (
    <S.Button
      type={type}
      $color={BUTTON_COLORS[color]}
      $maxWidth={maxWidth}
      disabled={disabled}
      {...props}
    >
      {props.children}
    </S.Button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(Object.keys(BUTTON_TYPES)),
  color: PropTypes.oneOf(Object.keys(BUTTON_COLORS)),
  disabled: PropTypes.bool,
  maxWidth: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
