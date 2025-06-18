import mediaQuery from '@/styles/mediaQuery';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const TabsContainer = styled.section`
  user-select: none;

  height: var(--place-category-tab-height);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${mediaQuery.sMobile`
    gap: 10px;
  `}
`;

export const ListContainer = styled.header`
  scrollbar-width: none; /* Firefox */

  overflow-x: scroll;
  display: flex;
  gap: 16px;

  /* 가로 스크롤 */
  width: calc(100vw + 2 * var(--outlet-padding));

  /* 전체 너비 채우기 */
  margin-left: calc(0px - var(--outlet-padding));
  padding: 3px calc(2 * var(--outlet-padding)) 10px;

  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const PanelContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0;
`;

export const TriggerBtn = styled.button`
  cursor: pointer;

  display: flex;
  gap: 6px;
  align-items: center;

  padding: 6px 8px;
  border: none;
  border-radius: 16px;

  font-size: 18px;
  font-weight: 600;
  color: ${({ $isActive }) => ($isActive ? theme.color.white : theme.color.text.grey)};
  white-space: nowrap;

  background: ${({ $isActive }) => ($isActive ? theme.color.main : theme.color.white)};
  box-shadow: 2px 4px 6px 0 rgb(0, 0, 0, 20%);
`;
