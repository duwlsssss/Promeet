import styled from 'styled-components';

export const Title = styled.h2`
  margin-bottom: 12px;

  font-size: 1.4rem;
  font-weight: 700;
  color: #222222;
  text-align: center;
`;

export const Description = styled.p`
  margin-bottom: 20px;
  font-size: 1rem;
  color: #555555;
  text-align: center;
`;

export const Error = styled.div`
  margin-bottom: 16px;
  padding: 8px 12px;
  border-radius: 6px;

  font-size: 0.95rem;
  color: #e74c3c;
  text-align: center;

  background: #fff0f0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 18px;
`;

export const AgreeButton = styled.button`
  cursor: pointer;

  padding: 10px 28px;
  border: none;
  border-radius: 8px;

  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;

  background: #40b59f;

  transition: background 0.2s;

  &:hover {
    background: #369885;
  }
`;

export const DisagreeButton = styled.button`
  cursor: pointer;

  padding: 10px 28px;
  border: none;
  border-radius: 8px;

  font-size: 1rem;
  font-weight: 600;
  color: #888888;

  background: #f5f5f5;

  transition: background 0.2s;

  &:hover {
    background: #e0e0e0;
  }
`;

export const LocationInfo = styled.div`
  margin-top: 18px;

  font-size: 0.98rem;
  color: #40b59f;
  text-align: center;
  word-break: break-all;
`;
