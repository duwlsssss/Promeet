import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 30px;
`;

export const Slide = styled(motion.div)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: ${theme.color.white};
`;

export const BtnWrapper = styled.div`
  margin-top: auto;
`;
