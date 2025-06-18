import styled from 'styled-components';
import wifiXRoundedSVG from '@/assets/img/icon/wifi-x-rounded.svg?react';
import warningRoundedSVG from '@/assets/img/icon/warning-rounded.svg?react';

export const BackwardWrapper = styled.div`
  position: absolute;
  top: 22px;
  left: 20px;
`;

export const ErrorContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: center;

  text-align: center;
`;

export const ErrorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  align-self: stretch;
`;

export const WifiXIcon = styled(wifiXRoundedSVG)`
  width: 78px;
  height: 78px;
`;

export const WarningIcon = styled(warningRoundedSVG)`
  width: 78px;
  height: 78px;
`;

export const ErrorTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const ErrorText = styled.h2`
  font-weight: 700;
  color: #555555;
`;

export const ErrorSubText = styled.h3`
  color: #999999;
`;
