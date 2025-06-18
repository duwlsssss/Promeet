import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Layout from '../layouts/Layout';
import ErrorFallback from '../components/ui/ErrorFallback';
import { ROUTES } from '../constants/routes';
import {
  ProtectedPageWrapper,
  CreateOnlyWrapper,
  JoinOnlyWrapper,
  PromiseMemberWrapper,
  PromiseCreateWrapper,
} from './PageWrappers';

//페이지
import SignInPage from '../pages/sign-in';

import HomePage from '../pages/index';

import InfoPage from '../pages/promise/create/info';
import DatePage from '../pages/promise/create/date';
import LocationPage from '../pages/promise/create/location';
import SchedulePage from '../pages/promise/create/schedule';

import FinalizePage from '../pages/promise/[id]/finalize';

import JoinPage from '../pages/promise/[id]/join';
import JoinLocationPage from '../pages/promise/[id]/location';
import JoinSchedulePage from '../pages/promise/[id]/schedule';
import JoinResultPage from '../pages/promise/[id]/result';

import SummaryPage from '../pages/promise/[id]/summary';

import UserPage from '../pages/user/index';
import EnterSchedulePage from '../pages/user/enter-schedule';

import NotFoundPage from '../pages/not-found';

const publicRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: ROUTES.SIGN_IN,
    element: <SignInPage />,
  },
  // 약속 참여 관련 (공유 링크)
  {
    path: ROUTES.PROMISE_JOIN,
    element: <JoinPage />,
  },
  // 404
  {
    path: '*',
    element: <NotFoundPage />, // 404는 라우트로 처리
  },
];

const privateRoutes = [
  // 약속 생성 관련
  // 이전 단계 확인 필요한 페이지
  {
    element: (
      <PromiseCreateWrapper>
        <Outlet />
      </PromiseCreateWrapper>
    ),
    children: [
      {
        path: ROUTES.PROMISE_CREATE_INFO,
        element: <InfoPage />,
      },
      {
        path: ROUTES.PROMISE_CREATE_DATE,
        element: <DatePage />,
      },
      {
        path: ROUTES.PROMISE_CREATE_LOCATION,
        element: <LocationPage />,
      },
      {
        path: ROUTES.PROMISE_CREATE_SCHEDULE,
        element: <SchedulePage />,
      },
    ],
  },
  {
    path: ROUTES.PROMISE_FINALIZE,
    element: (
      <CreateOnlyWrapper>
        <FinalizePage />
      </CreateOnlyWrapper>
    ),
  },
  // 약속 참여 관련 (공유 링크)
  {
    path: ROUTES.PROMISE_LOCATION,
    element: (
      <JoinOnlyWrapper>
        <JoinLocationPage />
      </JoinOnlyWrapper>
    ),
  },
  {
    path: ROUTES.PROMISE_SCHEDULE,
    element: (
      <JoinOnlyWrapper>
        <JoinSchedulePage />
      </JoinOnlyWrapper>
    ),
  },
  {
    path: ROUTES.PROMISE_RESULT,
    element: (
      <JoinOnlyWrapper>
        <JoinResultPage />
      </JoinOnlyWrapper>
    ),
  },
  // 공통
  {
    path: ROUTES.PROMISE_SUMMARY,
    element: (
      <PromiseMemberWrapper>
        <SummaryPage />
      </PromiseMemberWrapper>
    ),
  },
  // 유저
  {
    path: ROUTES.USER,
    element: <UserPage />,
  },
  {
    path: ROUTES.ENTER_SCHEDULE,
    element: <EnterSchedulePage />,
  },
  // 404
  {
    path: '*',
    element: <NotFoundPage />, // 404는 라우트로 처리
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorFallback />,
    children: [
      ...publicRoutes,
      {
        element: (
          <ProtectedPageWrapper>
            <Outlet />
          </ProtectedPageWrapper>
        ),
        children: privateRoutes,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
