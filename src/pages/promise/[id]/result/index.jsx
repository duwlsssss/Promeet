import WaitingSubmit from '@/components/promise/WaitingSubmit';
import PlaceCategoryMap from '@/components/promise/map/PlaceCategoryMap';
import { useShallow } from 'zustand/shallow';
import promiseDataFromServerStore from '@/stores/promise/promiseDataFromServerStore';

const JoinResultPage = () => {
  // likedPlaces 변경에 반응하지 않도록 필요한 필드만 선택
  const { isAllMembersSubmit } = promiseDataFromServerStore(
    useShallow((state) => ({
      isAllMembersSubmit: state.promiseDataFromServer?.isAllMembersSubmit,
    })),
  );

  if (!isAllMembersSubmit) {
    return <WaitingSubmit />;
  }

  return <PlaceCategoryMap />;
};
export default JoinResultPage;
