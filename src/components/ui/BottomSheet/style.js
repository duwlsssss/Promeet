import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';
import LineSVG from '@/assets/img/icon/horizontal_line.svg?react';

export const BottomSheet = styled(motion.div)`
  position: fixed;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  border-radius: 10px 10px 0 0;

  background: ${theme.color.white};
  filter: drop-shadow(0 0 20px rgb(0, 0, 0, 30%));
`;

export const BottomSheetHeader = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: var(--bs-header-height);
`;

export const lineIcon = styled(LineSVG)`
  width: 32px;
  margin-top: -10px;
`;

export const BottomSheetContent = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;
