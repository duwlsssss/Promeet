import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Text = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 136%; /* 27.2px */
  white-space: pre-line;
`;

export const Link = styled.div`
  padding: 10px;
  border: 1px solid #c2c2c2;
  border-radius: 15px;
  color: ${theme.color.text.grey};

  p {
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const BtnWrapper = styled.div`
  margin-top: 30px;
`;
