import styled, { css } from 'styled-components';

export const CELL_SIZE = 40;
export const BORDER_SIZE = 2;

export const TableWrapper = styled.div`
  user-select: none;

  display: inline-block;

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

export const Quarter = styled.div`
  cursor: pointer;
  user-select: none;

  flex: 1 1 0;

  width: 100%;

  background: ${({ selected, $isFixed }) =>
    selected ? 'rgba(195, 233, 224, 0.80)' : $isFixed ? '#949494' : '#fff'};

  &:active {
    background: rgb(195, 233, 224, 80%);
  }
`;

export const HeaderCell = styled(Cell)`
  cursor: default;

  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 600;
  font-style: normal;
  color: #6b7a99;
  text-align: center;

  background: #ffffff;
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
