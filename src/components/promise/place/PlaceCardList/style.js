import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const EmptyText = styled.div`
  margin: 30px auto;
  font-weight: 600;
  color: ${theme.color.text.grey};
`;
