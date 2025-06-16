import styled from 'styled-components';
import { theme } from '@/styles/theme';
import LogoSvg from '@/assets/img/logo.svg?react';

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin: 0 auto;
  padding-bottom: 90px;

  font-family: Pretendard, sans-serif;
  color: #333333;
`;

export const Header = styled.h1`
  padding: 24px;
  font-size: 24px;
  font-weight: 700;
  white-space: pre-line;
`;

export const HeaderRow = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-top: 30px;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 17px;
  font-weight: 500;
  line-height: 18px;
  color: var(--text-blue, #002055);
  text-align: center;
`;

export const AlarmIcon = styled.img`
  cursor: pointer;

  position: absolute;
  right: 16px;

  width: 32px;
  height: 32px;
`;

export const Greeting = styled.div`
  margin-top: 24px;

  font-size: 25px;
  font-weight: 700;
  line-height: 36px;
  color: var(--text-black, rgb(41, 41, 41));
`;

export const SectionTitle = styled.div`
  margin: 24px 24px 12px;

  font-size: 19px;
  font-weight: 600;
  line-height: 18px;
  color: var(--text-blue, #002055);
`;

export const SectionTitle2 = styled.div`
  margin: 24px 24px 12px;

  font-size: 16px;
  font-weight: 600;
  line-height: 18px;
  color: var(--text-blue, #002055);
`;

export const TodayCardWrapper = styled.div`
  touch-action: pan-y;

  position: relative;

  overflow: hidden;

  width: 100%;
  height: 180px;
  margin: 0.5px;
`;

export const TodayCardScroller = styled.div`
  transform: ${({ $cardIdx }) => `translateX(-${$cardIdx * 316}px)`};

  display: flex;
  gap: 16px;

  height: 100%;

  transition: transform 0.3s;
`;

export const TodayCard = styled.div`
  position: relative;

  width: 300px;
  height: 150px;
  border-radius: 16px;

  background: #ffffff;
  box-shadow: ${({ $active }) => ($active ? '0 4px 24px rgba(0,0,0,0.10)' : 'none')};
`;

export const Appointment = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 24px 6px;
  padding: 8px 16px;
  border: 1.5px solid #eff4fe;
  border-radius: 16px;

  background-color: red;
  background-color: white;

  small {
    font-family: 'Pretendard Variable', sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    color: var(--text-grey, #848a94);
  }

  h4 {
    margin: 4px 0;

    font-family: 'Pretendard Variable', sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: var(--text-blue, #002055);
  }

  span {
    font-family: 'Pretendard Variable', sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    color: var(--text-grey, #848a94);
  }
`;

export const EnterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 400px;
  align-items: center;
  justify-content: center;

  /* 전체 화면 채우기 트릭 */
  width: 100vw;
  margin-left: calc(0px - var(--outlet-padding));
  padding: 0 var(--outlet-padding);

  background-color: #c6ebe5;
`;

export const LogoContainer = styled.header`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const Logo = styled(LogoSvg)`
  flex-shrink: 0;
`;

export const EnterText = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.color.point1};
`;

// 로그인 후
export const FixedCard = styled.div`
  position: relative;

  padding: 16px;
  border-radius: 20px;

  color: white;

  background: #40b59f; /* ← 여기! */
  h3 {
    margin-bottom: 4px;

    font-family: 'Pretendard Variable', sans-serif;
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
  }

  p {
    font-family: 'Pretendard Variable', sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    color: #feffff;
  }
`;

export const Avatars = styled.div`
  display: flex;
  margin-top: 12px;

  img {
    width: 32px;
    height: 32px;
    margin-right: -8px;
    border: 2px solid white;
    border-radius: 50%;
  }
`;

export const Dday = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;

  font-family: 'Jalnan 2 TTF', serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 12px;
  color: white;
`;

export const DdayCircle = styled.div`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  color: var(--text-blue, #002055);
`;

export const EmptyBox = styled.div`
  display: flex;

  width: 100%;
  height: 150px;
  padding: 20px;
  border-radius: 16px;

  background: #40b59f;
`;

export const EmptyText = styled.div`
  width: 100%;
  padding: 10px 0;

  font-family: 'Pretendard Variable', sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: white;
`;

export const EmptyPromiseBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 24px 6px;
  padding: 8px 16px;
  border: 1.5px solid #eff4fe;
  border-radius: 16px;

  background-color: white;
`;

export const EmptyPromiseText = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  color: var(--text-grey, #848a94);
`;
