import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';

export const Toast = styled(motion.div)`
  position: fixed;
  z-index: 9999; /* 가장 최상위 */
  right: 16px;
  bottom: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px 24px;
  border-radius: 5px;

  text-align: center;
  white-space: nowrap;

  background-color: ${theme.color.white};
  box-shadow: 0 2px 5px rgb(0, 0, 0, 20%);
`;
