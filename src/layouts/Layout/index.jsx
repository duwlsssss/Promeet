import { Outlet } from 'react-router-dom';
import * as S from './style';

const Layout = () => {
  return (
    <S.MainContainer>
      <Outlet />
    </S.MainContainer>
  );
};

export default Layout;
