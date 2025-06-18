import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMapInfo } from '@/hooks/stores/promise/map/useMapStore';
import { useBottomSheetActions } from '@/hooks/stores/ui/useBottomSheetStore';
import { useMarkerActions } from '@/hooks/stores/promise/map/useMarkerStore';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import {
  usePromiseDataInfo,
  usePromiseDataActions,
} from '@/hooks/stores/promise/usePromiseDataStore';
import { usePromiseDataFromServerInfo } from '@/hooks/stores/promise/usePromiseDataFromServerStore';
import useToggleLikePlace from '@/hooks/mutations/useToggleLikePlace';
import { ROUTES } from '@/constants/routes';

export default function usePlaceCardHandlers(place, $isRetrieved) {
  const { map } = useMapInfo();
  const { setActiveBottomSheet } = useBottomSheetActions();
  const { setActiveMarkerId } = useMarkerActions();
  const { userId, userType } = useUserInfo();
  const { selectedPlace } = usePromiseDataInfo();
  const { setSelectedPlace } = usePromiseDataActions();
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();
  const { promiseId } = useParams();
  const { pathname } = useLocation();
  const { mutate: toggleLike } = useToggleLikePlace();
  const [isRetrieved, setIsRetrieved] = useState(false); // 조회될때 색 표시

  // 선택한 장소 카드 잠시 강조
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

  if (!promiseDataFromServer) {
    return {
      showHeart,
      isCreator,
      // 지도에서 필요한 것들
      isLiked: false,
      likesCount: 0,
      isSelected: false,
      isRetrieved: false,
      handleCardClick: () => {},
      handleLikeToggle: () => {},
      handleClickFixPlaceBtn: () => {},
    };
  }

  const { likedPlaces } = promiseDataFromServer;
  const likedPlace = likedPlaces?.find((p) => p.place.placeId === place.placeId);
  const isLiked = likedPlace?.userIds?.includes(userId) ?? false;
  const likesCount = likedPlace?.likesCount ?? 0;

  const handleCardClick = () => {
    setActiveBottomSheet(null);
    map.panTo(new window.kakao.maps.LatLng(place.position.Ma, place.position.La));
    setActiveMarkerId(place.placeId);
  };

  const handleLikeToggle = () => {
    if (!promiseId) return;
    toggleLike({ place, promiseId, isLiked });
  };

  const handleClickFixPlaceBtn = () => {
    isSelected ? setSelectedPlace(null) : setSelectedPlace(place);
  };

  const isSelected = selectedPlace?.placeId === place.placeId;

  return {
    showHeart,
    isCreator,
    isLiked,
    likesCount,
    isSelected,
    isRetrieved,
    handleCardClick,
    handleLikeToggle,
    handleClickFixPlaceBtn,
  };
}
