import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgb(0, 0, 0, 50%);
`;

export const Modal = styled.div`
  position: relative;

  min-width: 300px;
  min-height: 150px;
  padding: 2rem;
  border-radius: 8px;

  background: #ffffff;
`;

export const CloseButton = styled.button`
  cursor: pointer;

  position: absolute;
  top: 1rem;
  right: 1rem;

  border: none;

  font-size: 1.5rem;

  background: none;
`;

export const Content = styled.div`
  margin-top: 1.5rem;
`;
