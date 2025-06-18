import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: var(--header-height);
`;

export const Text = styled.h1`
  flex: 1;

  font-size: 18px;
  font-weight: 500;
  color: ${theme.color.text.blue};
  text-align: center;
`;

export const DummySpace = styled.div`
  width: 42px;
`;
