import styled from 'styled-components';

// --- 원형(circle) 변형 ---

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

  &.past {
    color: #888888 !important;
    background: #f2f3f5 !important;
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
    color: #b0b0b0 !important;
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

// --- 카드(card) 변형 ---

export const Card = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 10px;
  justify-content: space-between;

  width: 140px;
  min-height: 90px;
  padding: 14px 16px;
  border-radius: 14px;

  background: ${({ $isPast }) => ($isPast ? '#f5f5f5' : '#eaf1ff')};
`;

export const CardDday = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${({ $isPast, $isUnfixed }) => ($isPast ? '#bbb' : $isUnfixed ? '#888' : '#40b59f')};
`;

export const CardTitle = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  font-size: 14px;
  font-weight: 600;
  color: ${({ $isPast }) => ($isPast ? '#aaa' : '#001a41')};
`;
