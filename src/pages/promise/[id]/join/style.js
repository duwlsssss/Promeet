import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 40px 0;
`;

export const CreaterText = styled.h1`
  font-size: 36px;
  font-weight: 700;
  line-height: 45px; /* 125% */
  color: ${theme.color.text.blue};
  letter-spacing: 0.2px;
  white-space: pre-line;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Name = styled.h2`
  font-size: 30px;
  font-weight: 700;
`;

export const Description = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

export const Line = styled.div`
  width: 100vw;
  height: 10px;
  margin-left: calc(0px - var(--outlet-padding));
  background-color: #e9e9e9;
`;
