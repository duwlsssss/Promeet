import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Button = styled.button`
  cursor: pointer;
  user-select: none;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 60px;
  border: none;
  border-radius: 15px;

  font-size: 18px;
  font-weight: 700;
  color: ${theme.color.white};
  letter-spacing: 0.2px;

  background-color: ${({ $color }) => $color};
  filter: drop-shadow(0 2px 8px rgb(16, 105, 227, 30%));

  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
    background-color: ${theme.color.disabled};
  }
`;
