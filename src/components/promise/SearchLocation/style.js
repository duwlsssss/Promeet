import styled from 'styled-components';
import { theme } from '@/styles/theme';
import LocationIconSVG from '@/assets/img/icon/location.svg?react';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 var(--outlet-padding);
`;

export const CurrLocationButton = styled.button`
  cursor: pointer;

  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 10px;
  border: 1px solid ${theme.color.text.grey};
  border-radius: 16px;

  font-size: 13px;
  font-weight: 500;
  color: ${theme.color.text.grey};

  background-color: ${theme.color.white};
`;

export const LocationIcon = styled(LocationIconSVG)`
  flex-shrink: 0;
`;
