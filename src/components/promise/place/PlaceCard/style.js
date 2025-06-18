import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';
import EmptyHeartSvg from '@/assets/img/icon/empty_heart.svg?react';
import FilledHeartSvg from '@/assets/img/icon/filled_heart.svg?react';

export const PlaceCard = styled(motion.div)`
  padding: 15px;
  border: 4px solid ${({ $isSelected }) => ($isSelected ? theme.color.main : 'transparent')};
  border-radius: 15px;
  box-shadow: 0 3px 8px 0 rgb(0, 0, 0, 25%);
`;

export const CardBackground = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 15px;
`;

const ellipseStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CardHeaderWrapper = styled.header`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const PlaceName = styled.h3`
  font-weight: 700;
  max-width: 170px;
  ${ellipseStyle}
`;

export const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PlaceInfoText = styled.p`
  font-size: 12px;
  max-width: 170px;
  color: ${theme.color.text.grey};
  ${ellipseStyle}
`;

export const PlaceLink = styled.a`
  cursor: pointer;
  font-size: 12px;
  color: #456aff;
  text-decoration: none;
`;

export const FixPlaceBtn = styled.button`
  cursor: pointer;

  width: 90px;
  padding: 5px;
  border: none;
  border-radius: 20px;

  font-weight: 600;
  color: ${theme.color.white};

  background-color: ${theme.color.main};
`;

export const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const HeartWrapper = styled.div`
  cursor: pointer;
  width: 100%;
`;

const IconStyle = css`
  flex-shrink: 0;
`;
export const EmptyHeartIcon = styled(EmptyHeartSvg)`
  ${IconStyle}
`;
export const FilledHeartIcon = styled(FilledHeartSvg)`
  ${IconStyle}
`;

export const heartCnt = styled.p`
  font-weight: 700;
  color: ${theme.color.text.grey};
`;

/* 스켈레톤 */
export const SkeletonName = styled(motion.div)`
  width: 125px;
  height: 20px;
  border-radius: 5px;
  background: #e0e0e0;
`;

export const SkeletonAddress = styled(motion.div)`
  width: 200px;
  height: 14px;
  border-radius: 5px;
  background: #e0e0e0;
`;
