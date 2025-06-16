import styled from 'styled-components';

export const BottomBar = styled.nav`
  position: fixed;
  z-index: 1000;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 70px;
  padding: 0 24px;

  background-color: white;
  box-shadow: 0 -1px 6px rgb(0, 0, 0, 10%);
`;

export const NavButton = styled.button`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;

  font-size: 24px;
  color: ${(props) => (props.$active ? '#6dbbae' : '#002055')};

  background: none;
  outline: none;
`;

export const AddButton = styled.button`
  cursor: pointer;

  transform: translateY(-20%);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 64px;
  border: none;
  border-radius: 50%;

  font-size: 32px;
  color: white;

  background-color: #6dbbae;
  outline: none;
  box-shadow: 0 4px 12px rgb(0, 0, 0, 20%);
`;
