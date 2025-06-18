import styled, { css } from 'styled-components';

import RestaurantSVG from '@/assets/img/icon/place-category/restaurant.svg?react';
import CafeSVG from '@/assets/img/icon/place-category/cafe.svg?react';
import StudyCafeSVG from '@/assets/img/icon/place-category/study_cafe.svg?react';
import ActivitySVG from '@/assets/img/icon/place-category/activity.svg?react';

const IconStyle = css`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
`;

export const RestaurantIcon = styled(RestaurantSVG)`
  ${IconStyle}
`;
export const CafeIcon = styled(CafeSVG)`
  ${IconStyle}
`;
export const StudyCafeIcon = styled(StudyCafeSVG)`
  ${IconStyle}
`;
export const ActivityIcon = styled(ActivitySVG)`
  ${IconStyle}
`;
