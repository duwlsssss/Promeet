import { Navigate, useParams } from 'react-router-dom';
import WaitingSubmit from '@/components/promise/WaitingSubmit';
import PlaceCategoryMap from '@/components/promise/map/PlaceCategoryMap';
import { usePromiseDataFromServerInfo } from '@/hooks/stores/promise/usePromiseDataFromServerStore';
import { BUILD_ROUTES } from '@/constants/routes';

const FinalizePage = () => {
  const { promiseId } = useParams();
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();

  // 이미 확정된 약속은 다시 확정할 수 없으므로 요약 페이지로
  if (promiseDataFromServer.isFixed) {
    return <Navigate to={BUILD_ROUTES.PROMISE_SUMMARY(promiseId)} replace />;
  }

  if (!promiseDataFromServer.isAllMembersSubmit) {
    return <WaitingSubmit />;
  }

  return <PlaceCategoryMap />;
};

export default FinalizePage;
