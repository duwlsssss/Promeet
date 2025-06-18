import styled from 'styled-components';
// import { theme } from '@/styles/theme';

export const Container = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
`;

export const TableScrollWrapper = styled.div`
  overflow: auto;
  width: 100%;
  max-width: 400px;
  max-height: 600px;
`;

export const TableInnerWrapper = styled.div`
  width: fit-content;
`;

export const BtnWrapper = styled.div`
  margin-top: auto;
  padding-bottom: 30px;
`;
