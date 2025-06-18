import styled, { css } from 'styled-components';

export const CELL_SIZE = 40;
export const BORDER_SIZE = 2;

export const TableWrapper = styled.div`
  user-select: none;

  display: inline-block;

  width: 320px;
  border: none;
  border-radius: 8px;

  background: #ffffff;
  box-shadow: 0 2px 8px rgb(0, 0, 0, 4%);
`;

export const Row = styled.div`
  display: flex;
`;

export const Cell = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  border-right: ${BORDER_SIZE}px solid #f5f6f7;
  border-bottom: ${BORDER_SIZE}px solid #f5f6f7;

  font-size: 0.95rem;

  background: #ffffff;

  transition: background 0.15s;

  &:last-child {
    border-right: none;
  }
`;

export const ButtonGroup = styled.div`
  position: absolute;
  z-index: 1;
  top: -100%;
  left: 1%;
  transform: translateY(-50%);

  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: center;

  margin: 2px 0 0 2px;
`;

export const EditButton = styled.button`
  cursor: pointer;

  padding: 0 2px;
  border: none;

  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 600;
  font-style: normal;

  background: none;
`;

export const DeleteButton = styled.button`
  cursor: pointer;

  padding: 0 2px;
  border: none;

  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 600;
  font-style: normal;

  background: none;
`;

export const Quarter = styled.div`
  width: 100%;
  height: 25%;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  font-size: 10px;
  white-space: normal;
  word-break: break-all;

  position: relative;

  ${({ selected, isStart, isEnd }) =>
    selected &&
    css`
      font-weight: 600;
      color: #4d5e80;
      background: #40b59f80;
      ${isStart && 'border-radius: 6px 6px 0 0; z-index: 100; padding: 2px 1px 0;'}
      ${isEnd && 'border-radius: 0 0 6px 6px;'}
      ${isStart && isEnd && 'border-radius: 6px;'}
    `}
`;

export const DeleteScheduleButton = styled.button`
  border: none;
  color: #ffffff;
  background: none;
`;

export const HeaderCell = styled(Cell)`
  background: #ffffff;

  cursor: default;

  color: #6b7a99;
  font-family: Pretendard, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  ${({ $noTop }) =>
    $noTop &&
    css`
      border-top: none;
    `}
  ${({ $noLeft }) =>
    $noLeft &&
    css`
      border-left: none;
    `}
`;

export const AddButton = styled.button`
  cursor: pointer;

  width: 100%;
  margin-top: 16px;
  padding: 12px 0;
  border: none;
  border-radius: 6px;

  font-size: 1rem;
  font-weight: 600;
  color: #2563eb;

  background: #e6f0ff;

  transition: background 0.2s;

  &:hover,
  &:focus {
    color: #ffffff;
    background: #4f8cff;
    outline: none;
  }
`;
