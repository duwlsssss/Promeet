import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMapInfo } from '@/hooks/stores/promise/map/useMapStore';
import { useBottomSheetActions } from '@/hooks/stores/ui/useBottomSheetStore';
import { useMarkerActions } from '@/hooks/stores/promise/map/useMarkerStore';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import {
  usePromiseDataInfo,
  usePromiseDataActions,
} from '@/hooks/stores/promise/usePromiseDataStore';
import promiseDataFromServerStore from '@/stores/promise/promiseDataFromServerStore';
import { ROUTES } from '@/constants/routes';

export default function usePlaceCardHandlers(place, $isRetrieved) {
  const { map } = useMapInfo();
  const { setActiveBottomSheet } = useBottomSheetActions();
  const { setActiveMarkerId } = useMarkerActions();
  const { userType } = useUserInfo();
  const { selectedPlace } = usePromiseDataInfo();
  const { setSelectedPlace } = usePromiseDataActions();
  const { pathname } = useLocation();
  const [isRetrieved, setIsRetrieved] = useState(false);

  useEffect(() => {
    if ($isRetrieved) {
      setIsRetrieved(true);
      setTimeout(() => setIsRetrieved(false), 1500);
    }
  }, [$isRetrieved]);

  const isCreator = userType === 'create';

  // 위치 입력 컴포넌트에선 하트 안 보여주기
  const showHeart =
    pathname === ROUTES.PROMISE_RESULT ||
    (pathname.includes('/promise/') && !pathname.includes('/location'));

  const isSelected = selectedPlace?.placeId === place.placeId;

  // canFix만 구독해 다른 서버 데이터 변경 시 카드가 리렌더링되지 않게 함
  const canFix = promiseDataFromServerStore((state) => !!state.promiseDataFromServer?.canFix);
  // 확정 조건(모든 멤버 좋아요 등) 미충족 시 선택 불가, 이미 선택한 카드의 취소는 허용
  const isFixBtnDisabled = !canFix && !isSelected;

  const handleCardClick = () => {
    setActiveBottomSheet(null);
    map.panTo(new window.kakao.maps.LatLng(place.position.Ma, place.position.La));
    setActiveMarkerId(place.placeId);
  };

  const handleClickFixPlaceBtn = () => {
    isSelected ? setSelectedPlace(null) : setSelectedPlace(place);
  };

  return {
    showHeart,
    isCreator,
    isSelected,
    isFixBtnDisabled,
    isRetrieved,
    handleCardClick,
    handleClickFixPlaceBtn,
  };
}
