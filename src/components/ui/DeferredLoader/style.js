import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoaderTextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`;

export const LoaderText = styled.span`
  color: ${theme.color.main};
`;
