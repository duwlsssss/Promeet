import styled from 'styled-components';

export const ModalContent = styled.div`
  min-width: 220px;
  text-align: center;
`;

export const Title = styled.div`
  margin-bottom: 16px;
  font-size: 1.08rem;
  font-weight: 600;
`;

export const Info = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  color: #666666;
`;

export const ScheduleName = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #002055;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const DeleteButton = styled.button`
  cursor: pointer;

  flex: 1;

  padding: 6px 16px;
  border: none;
  border-radius: 4px;

  font-family: Pretendard, sans-serif;
  font-weight: 600;
  color: #ffffff;

  background: #ff5353;

  :hover {
    background: #ff0000;
  }
`;

export const CancelButton = styled.button`
  cursor: pointer;

  flex: 1;

  padding: 6px 16px;
  border: none;
  border-radius: 4px;

  font-weight: 600;
  color: #222222;

  background: #eeeeee;
`;
