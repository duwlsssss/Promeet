import React from 'react';
import { Home, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomBar, AddButton, NavButton } from './style';
import { ROUTES } from '../../constants/routes';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // signin 화면일 때는 null 리턴해서 안보이게
  if (location.pathname.startsWith(ROUTES.SIGN_IN)) {
    return null;
  }

  return (
    <BottomBar>
      <NavButton $active={location.pathname === ROUTES.HOME} onClick={() => navigate(ROUTES.HOME)}>
        <Home />
      </NavButton>

      <AddButton onClick={() => navigate(ROUTES.PROMISE_CREATE_INFO)}>+</AddButton>

      <NavButton $active={location.pathname === ROUTES.USER} onClick={() => navigate(ROUTES.USER)}>
        <User />
      </NavButton>
    </BottomBar>
  );
};

export default Navbar;
