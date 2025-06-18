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
  width: 100%;
  max-width: 400px;
  padding: 32px 24px 24px;
  border-radius: 16px;

  background: #ffffff;
  box-shadow: 0 2px 16px rgb(0, 0, 0, 12%);
`;

export const Title = styled.h2`
  margin: 0 0 24px;

  font-family: Pretendard, sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
`;

export const ScrollPickerWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;

  margin-bottom: 32px;
`;

export const PickerCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
`;

export const PrevNext = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 24px;
  margin: 2px 0;

  font-size: 1rem;
  color: #aaaaaa;
`;

export const Selected = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 36px;
  margin: 2px 0;

  font-size: 2rem;
  font-weight: bold;
  color: #222222;
`;

export const Colon = styled.div`
  margin: 0 8px;
  font-size: 2rem;
  font-weight: bold;
  color: #222222;
`;

export const ConfirmButton = styled.button`
  cursor: pointer;

  width: 100%;
  padding: 12px 0;
  border: none;
  border-radius: 6px;

  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;

  background: #40b59f;

  transition: background 0.2s;

  &:hover,
  &:focus {
    background: #497e64;
    outline: none;
  }
`;
