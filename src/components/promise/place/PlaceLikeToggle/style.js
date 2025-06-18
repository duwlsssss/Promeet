import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';
import LocationIconSVG from '@/assets/img/icon/location.svg?react';
import EmptyHeartSvg from '@/assets/img/icon/empty_heart.svg?react';

export const ToggleContainer = styled.div`
  cursor: pointer;

  position: relative;

  display: flex;
  align-items: center;

  width: 100%;
  height: 38px;
  border-radius: 20px;

  color: ${theme.color.text.grey};

  background-color: #e9e9e9;
`;

export const ToggleOption = styled.div`
  z-index: 1;

  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  color: ${theme.color.text.grey};
`;

export const ToggleItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const iconStyle = css`
  width: 15px;
  height: 15px;
`;
export const LocationIcon = styled(LocationIconSVG)`
  ${iconStyle}
`;
export const HeartIcon = styled(EmptyHeartSvg)`
  ${iconStyle}
`;

export const Slide = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;

  width: 50%;
  border: 2px solid ${theme.color.main};
  border-radius: 20px;

  background: ${theme.color.white};
`;
