import WaitingSubmit from '@/components/promise/WaitingSubmit';
import PlaceCategoryMap from '@/components/promise/map/PlaceCategoryMap';
import { usePromiseDataFromServerInfo } from '@/hooks/stores/promise/usePromiseDataFromServerStore';

const JoinResultPage = () => {
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();

  if (!promiseDataFromServer.isAllMembersSubmit) {
    return <WaitingSubmit />;
  }

  return <PlaceCategoryMap />;
};
export default JoinResultPage;
