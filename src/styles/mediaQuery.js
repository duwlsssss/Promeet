import { css } from 'styled-components';

/* 세로 모드 화면 너비 */
const breakpointsPortrait = {
  xsMobile: 320,
  sMobile: 360,
  mobile: 375,
};

/* 세로 모드 화면 너비 */
const breakpointsLandscape = {
  xsMobile: 568,
  sMobile: 640,
  mobile: 667,
};

const mediaQuery = Object.keys(breakpointsPortrait).reduce((acc, label) => {
  /* 세로 모드 */
  acc[label] = (...args) => css`
    @media (max-width: ${breakpointsPortrait[label]}px) {
      ${css(...args)}
    }
  `;
  /* 가로 모드 */
  acc[`${label}Landscape`] = (...args) => css`
    @media (max-width: ${breakpointsLandscape[label]}px) and (orientation: landscape) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export default mediaQuery;
