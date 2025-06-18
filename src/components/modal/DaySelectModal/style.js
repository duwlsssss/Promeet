import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  z-index: 1200;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgb(0, 0, 0, 30%);
`;

export const Modal = styled.div`
  min-width: 228px;
  min-height: 120px;
  padding: 24px 0;
  border-radius: 8px;

  background: #ffffff;
  box-shadow: 0 2px 16px rgb(0, 0, 0, 12%);
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;

  width: 100%;
  margin: 0;
  padding: 0;

  list-style: none;
`;

export const Item = styled.li`
  width: auto;
`;

export const Button = styled.button`
  cursor: pointer;

  width: 180px;
  padding: 12px 0;
  border: none;
  border-radius: 6px;

  font-family: Pretendard, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  font-style: normal;
  color: #222222;

  background: #f5f6fa;

  transition:
    background 0.2s,
    color 0.2s;

  &:hover,
  &:focus {
    color: #ffffff;
    background: #40b59f;
    outline: none;
  }
`;
