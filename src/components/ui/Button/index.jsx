import * as S from './style';
import PropTypes from 'prop-types';
import { BUTTON_COLORS } from '@/constants/ui';

/**
 * Button 컴포넌트
 * @param {'main'|'point1'} [color='main'] - 색상
 * @param {boolean} [disabled=false] - disabled 여부
 */

const Button = ({ color = 'main', disabled = false, ...props }) => {
  return (
    <S.Button $color={BUTTON_COLORS[color]} disabled={disabled} {...props}>
      {props.children}
    </S.Button>
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(Object.keys(BUTTON_COLORS)),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
