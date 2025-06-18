import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import BackSVG from '@/assets/img/icon/back.svg?react';
import ReftArrowSVG from '@/assets/img/icon/left_arrow.svg?react';

const IconStyle = css`
  cursor: pointer;
  flex-shrink: 0;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
`;

export const BackIcon = styled(BackSVG)`
  ${IconStyle}
`;

export const BackIconArrow = styled(ReftArrowSVG)`
  ${IconStyle}
  color: ${theme.color.text.black};
`;
