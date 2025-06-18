import styled from 'styled-components';
// import { theme } from '@/styles/theme';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 320px;
  margin: 0 0 30px;
  padding: 0 5px;
`;

export const FixedScheduleTitle = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
  color: #000000;
`;

export const ButtonOptions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const DelSchedulButton = styled.button`
  cursor: pointer;

  width: 24px;
  height: 24px;
  border: none;

  background: none;
`;

export const AddScheduleButton = styled.button`
  cursor: pointer;

  width: 24px;
  height: 24px;
  border: none;

  background: none;
`;

export const TableScrollWrapper = styled.div`
  overflow: hidden auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 400px;
  max-height: 600px;
`;
