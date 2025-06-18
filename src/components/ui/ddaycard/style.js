import styled from 'styled-components';

export const CircleCard = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-self: center;
`;

export const CircleProgressWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CircleProgress = styled.svg`
  position: relative;
  width: 98px;
  height: 98px;
`;

export const CircleCardDday = styled.div`
  position: relative;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-family: Pretendard, sans-serif;
  font-size: 18px;
  font-weight: 700;

  /* 지난 약속(완료)일 때 회색 처리 */
  &.past {
    color: #888888 !important; /* 숫자/글자 연회색 */
    background: #f2f3f5 !important; /* 원 배경 연회색 */
  }
`;

export const CircleCardCenterText = styled.div`
  position: relative;
  z-index: 2;
  top: 36px;

  width: 100%;

  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: bold;
  color: #002055;
  text-align: center;

  &.past {
    color: #b0b0b0 !important; /* 아래에 있는 글자도 연회색 */
  }
`;

export const CircleCenterText = styled.div`
  user-select: none;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  margin-top: 5px;
  padding: 0 2px;

  font-family: Pretendard, sans-serif;
  font-size: ${({ $size }) => $size / 4.5}px;
  color: ${({ $color }) => $color || '#001a41'};
  letter-spacing: 0.5px;
  white-space: nowrap;
`;

export const CircleCardLabel = styled.div`
  margin-top: 10px;

  font-size: 13px;
  color: ${({ $color }) => $color || '#001a41'};
  text-align: center;
  white-space: nowrap;
`;
