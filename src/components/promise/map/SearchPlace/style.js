import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 5px 15px calc(80px + var(--next-btn-container-height));
`;

export const NextBtnContainer = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: var(--next-btn-container-height);
  padding: 10px;

  background-color: ${theme.color.white};
`;

export const Descriptrtion = styled.p`
  font-weight: 600;
  color: ${theme.color.text.grey};
`;
