import { css } from 'styled-components';
import { theme } from './theme';

/* 추가로 필요한 css 변수를 정의해주세요  */
const designTokens = css`
  /* --css-variable-example: ${theme.color.point2}; */
  --nav-height: 82px;
  --header-height: 80px;
  --outlet-padding: 30px;
  --place-category-tab-height: 65px;
  --bs-header-height: 50px;
  --next-btn-container-height: 110px;
`;

export default designTokens;
