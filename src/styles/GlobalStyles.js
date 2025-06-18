import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import mediaQuery from './mediaQuery';
import designTokens from './designTokens';
import { theme } from './theme';

const GlobalStyles = createGlobalStyle`
  /* 브라우저 기본 스타일 초기화 */
  ${reset}

  /* CSS 전역 변수 선언 */
  :root {
    ${designTokens}
  }

  * {
    box-sizing: border-box;

    /* 포커스 링 제거 */
    -webkit-focus-ring-color: transparent;

    /* (모바일) */

    /* 터치 하이라이트 제거 */
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-family: Pretendard, sans-serif;

    background: ${theme.color.white};

    color: ${theme.color.text.black};

    /* 볼드체, 이탤릭체 자동 생성 방지 */
    font-synthesis: none;

    /* 가독성 높이는 텍스트를 렌더링 */
    text-rendering: optimizeLegibility;

    /* Safari, Chrome에서 폰트 외곽을 부드럽게 표시 */
    -webkit-font-smoothing: antialiased;

    /* Firefox에서 폰트를 더 선명하게 표시 */
    -moz-osx-font-smoothing: grayscale;

    /* Safari에서 부드러운 자연스러운 스크롤 */
    -webkit-overflow-scrolling: touch;

    /* 중간 사이즈 세로 모드 */
    ${mediaQuery.sMobile`
    `}

    /* 중간 사이즈 가로 모드 */
    ${mediaQuery.sMobileLandscape`
    `}

    /* 작은 사이즈 세로 모드 */
    ${mediaQuery.xsMobile`
    `}

    /* 작은 사이즈 가로 모드 */
    ${mediaQuery.xsMobileLandscape`
    `}
  }

  p, h1, h2, h3, h4, div, span {
    /* 단어 단위 줄바꿈 */
    word-break: keep-all;
  }

  img {
    display: block;
  }
`;

export default GlobalStyles;
