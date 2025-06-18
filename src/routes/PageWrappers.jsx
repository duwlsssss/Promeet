import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BUILD_ROUTES, ROUTES } from '../constants/routes';
import { useUserInfo, useUserActions } from '@/hooks/stores/auth/useUserStore';
import { usePromiseDataActions } from '@/hooks/stores/promise/usePromiseDataStore';
import { usePromiseDataFromServerInfo } from '@/hooks/stores/promise/usePromiseDataFromServerStore';
import useGetPromiseData from '@/hooks/queries/useGetPromiseData';
import useGetUserData from '@/hooks/queries/useGetUserData';
import DeferredLoader from '@/components/ui/DeferredLoader';

// 로그인 안됐을 때 페이지 보호
export const ProtectedPageWrapper = ({ children }) => {
  const { userId } = useUserInfo();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate(ROUTES.SIGN_IN);
      return;
    }
  }, [userId, navigate]);

  return children;
};

ProtectedPageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

// 약속 생성자만 접근 가능
export const CreateOnlyWrapper = ({ children }) => {
  const { userId } = useUserInfo();
  const navigate = useNavigate();
  const { promiseId } = useParams();
  const { isPending } = useGetPromiseData(promiseId, userId);
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();
  const { setUserType } = useUserActions();

  useEffect(() => {
    // console.log('CreateOnlyWrapper', isPending, promiseDataFromServer);
    if (!isPending && promiseDataFromServer) {
      const isCreator = promiseDataFromServer.creatorId === userId;
      if (!isCreator) {
        navigate(ROUTES.HOME);
        return;
      }
      setUserType('create');
    }
  }, [isPending, promiseDataFromServer, userId, navigate, setUserType]);

  if (isPending) {
    return <DeferredLoader />;
  }

  return children;
};

CreateOnlyWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

// 참여 요청 받은 사람만 접근 가능
export const JoinOnlyWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { promiseId } = useParams();
  const { pathname } = useLocation();
  const { userId, promises } = useUserInfo();

  const { isPending: isUserDataPending } = useGetUserData(userId);
  const { isPending: isPromiseDataPending } = useGetPromiseData(promiseId, userId);
  const { setUserType } = useUserActions();
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();
  const { hasNearestSubwayStationData } = usePromiseDataActions();

  useEffect(() => {
    if (!isUserDataPending && !isPromiseDataPending) {
      // 초대받은 사람 체크
      const isInvitedMember = promises.join.includes(promiseId);

      // 참여 권한 없음 → 홈으로 이동
      if (!isInvitedMember) {
        navigate(ROUTES.HOME);
        return;
      }

      // 참여자 유형 저장
      setUserType('join');

      // schedule 페이지에서 위치 정보 체크
      if (pathname === ROUTES.PROMISE_SCHEDULE) {
        // 위치 정보 (가까운 지하철 정보) 미제출시 위치 입력 페이지로 이동
        const hasNS = hasNearestSubwayStationData();
        if (!hasNS) {
          navigate(BUILD_ROUTES.PROMISE_LOCATION(promiseId));
          return;
        }
      }

      // result 페이지에서 데이터 제출 체크
      if (pathname === ROUTES.PROMISE_RESULT) {
        const currentMember = promiseDataFromServer.members.find(
          (member) => member.userId === userId,
        );
        // 정보 입력 안된 사용자면 위치 입력부터 하게 함
        if (!currentMember?.hasSubmittedData) {
          navigate(BUILD_ROUTES.PROMISE_LOCATION(promiseId));
          return;
        }
      }
    }
  }, [
    promiseDataFromServer,
    promises,
    isPromiseDataPending,
    isUserDataPending,
    userId,
    pathname,
    promiseId,
    navigate,
    setUserType,
    hasNearestSubwayStationData,
  ]);

  if (isPromiseDataPending) {
    return <DeferredLoader />;
  }

  return children;
};

JoinOnlyWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

// 약속에 포함된 사람, 약속 확정 가능이면 접근 가능
export const PromiseMemberWrapper = ({ children }) => {
  const { userId } = useUserInfo();
  const navigate = useNavigate();
  const { promiseId } = useParams();
  const { isPending } = useGetPromiseData(promiseId, userId);
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();

  useEffect(() => {
    if (!isPending && promiseDataFromServer) {
      // 약속 멤버 체크
      const isMember =
        promiseDataFromServer.members.some((member) => member.userId === userId) ||
        userId === promiseDataFromServer.creatorId;

      // 멤버가 아니거나 확정 불가능한 경우 홈으로 이동
      if (!isMember) {
        navigate(ROUTES.HOME);
      }
    }
  }, [promiseDataFromServer, isPending, userId, promiseId, navigate]);

  if (isPending) {
    return <DeferredLoader />;
  }

  return children;
};

PromiseMemberWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

// 약속 생성 플로우 래퍼
export const PromiseCreateWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { hasDataUntil } = usePromiseDataActions();

  useEffect(() => {
    // 약속 생성 플로우 경로인지 확인
    const isPromiseCreatePath = Object.values(ROUTES).some(
      (path) => path === pathname && path.startsWith('/promise/create'),
    );

    if (!isPromiseCreatePath) return;

    // info 페이지는 체크하지 않음
    if (pathname === ROUTES.PROMISE_CREATE_INFO) return;

    // 이전 단계 데이터 체크
    const step = pathname.split('/').pop(); // 'date', 'location', 'schedule'
    const hasRequiredData = hasDataUntil(step);

    if (!hasRequiredData) {
      // 이전 단계로 리다이렉트
      const steps = ['info', 'date', 'location', 'schedule'];
      const currentStepIndex = steps.indexOf(step);
      const prevStep = steps[currentStepIndex - 1] ?? 'info';

      navigate(BUILD_ROUTES.PROMISE_CREATE(prevStep));
    }
  }, [pathname, hasDataUntil, navigate]);

  return children;
};
