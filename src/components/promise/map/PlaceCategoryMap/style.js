import styled from 'styled-components';
import { theme } from '@/styles/theme';
import MyLocationSvg from '@/assets/img/icon/map/my_location.svg?react';

export const TabsWrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
`;

export const List = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 200px;
  background-color: ${theme.color.white};
`;

export const MyLocationIcon = styled(MyLocationSvg)`
  cursor: pointer;

  position: absolute;
  z-index: 1;
  bottom: calc(30px + var(--bs-header-height));
  left: 30px;

  width: 40px;
  height: 40px;
`;
