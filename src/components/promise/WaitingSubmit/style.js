import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import TimeSVG from '@/assets/img/icon/time.svg?react';
import LocationSVG from '@/assets/img/icon/location.svg?react';
import PeopleSVG from '@/assets/img/icon/people.svg?react';

export const Contianer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 40px 0;
`;

export const WatingText = styled.h1`
  font-size: 36px;
  font-weight: 700;
  line-height: 45px; /* 125% */
  color: ${theme.color.text.blue};
  letter-spacing: 0.2px;
  white-space: pre-line;
`;

export const InfoConainer = styled.div`
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

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StatusWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  font-size: 18px;
`;

const IconStyle = css`
  width: 20px;
  height: auto;
`;

export const TimeIcon = styled(TimeSVG)`
  ${IconStyle}
`;
export const LocationIcon = styled(LocationSVG)`
  ${IconStyle}
`;
export const PeopleIcon = styled(PeopleSVG)`
  ${IconStyle}
`;

export const MemberList = styled.div`
  display: flex;
  gap: 10px;
`;
