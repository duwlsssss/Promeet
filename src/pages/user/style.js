import styled from 'styled-components';

// 전체를 감싸는 모바일 프레임
export const Container = styled.section`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #ffffff;
`;

export const Frame = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 100%;
  padding-bottom: 90px; /* 네비바에 가리지 않도록 하단 여백 추가 */

  background: #ffffff;
`;

// 헤더
export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;
  width: 100%;
  padding: 36px 26px 0;
`;

export const UserName = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #000000;
`;

export const LogoutButton = styled.button`
  cursor: pointer;
  padding: 0;
  border: none;
  background: transparent;

  img {
    width: 24px;
    height: 24px;
  }
`;

// 섹션 타이틀
export const SectionTitle = styled.h4`
  width: 100%;
  margin: 32px 0 12px;
  padding-left: 26px;

  font-size: 18px;
  font-weight: 600;
  color: #002055;
`;

// 카드 리스트를 감싸는 래퍼
export const CardList = styled.div`
  overflow-x: auto;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;

  box-sizing: border-box;
  width: 100%;
  min-height: 120px;
  margin-bottom: 5px;
  padding-left: 26px;
`;

// 카드 하나를 감싸는 래퍼
export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 지난 약속 카드 색상(연회색) 적용
export const PastCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
