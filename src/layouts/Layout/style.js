import styled from 'styled-components';

export const MainContainer = styled.main`
  /* 자식 요소 배치 */
  position: relative;

  /* y축 스크롤만 허용 */
  overflow-x: hidden;

  /* 자식 요소들이 부모 높이를 상속받도록 */

  display: flex;
  flex-direction: column;

  /* 전체 높이 확보 */
  min-height: 100vh;

  /* 양 옆 패딩 */
  padding: 0 var(--outlet-padding);

  & > * {
    flex: 1;
  }
`;
