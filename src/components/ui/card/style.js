import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 500px;
  height: 150px;
`;

export const BgMain = styled.div`
  width: 60%;
  height: 100%;
  border-radius: 16px;
  background: #40b59f;
`;

export const LightEffect = styled.div`
  width: 432.92px;
  height: 100%;
  background: rgb(185, 232, 255, 10%);
`;

export const Title = styled.div`
  position: absolute;
  top: 26px;
  left: 23px;

  font-family: 'Pretendard Variable', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 18px;
  color: white;
`;

export const Subtitle = styled.div`
  position: absolute;
  top: 56px;
  left: 23px;

  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 12px;
  color: #feffff;
`;

export const Dday = styled.div`
  position: absolute;
  top: 106px;
  left: 200px;

  width: 84px;

  font-family: 'Jalnan2', serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 12px;
  color: white;
`;

export const Avatar = styled.img`
  position: absolute;
  top: 94px;
  left: ${({ $left }) => $left}px;

  width: 32px;
  height: 32px;
  border-radius: 9999px;

  outline: 1px solid white;
`;
