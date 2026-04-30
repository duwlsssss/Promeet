import { useState, useCallback, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import { useLocationInfo } from '@/hooks/stores/promise/useLocationStore';
import { usePromiseDataInfo } from '@/hooks/stores/promise/usePromiseDataStore';
import { usePromiseDataFromServerInfo } from '@/hooks/stores/promise/usePromiseDataFromServerStore';
import { usePlaceLikeToggleInfo } from '@/hooks/stores/promise/usePlaceLikeToggleStore';
import { CATEGORY_LABEL } from '@/constants/place';
import { DEFAULT_SUBWAY_STATION } from '@/constants/promise';

import useGetUserData from '@/hooks/queries/useGetUserData';
import useFinalizePromise from '@/hooks/mutations/useFinalizePromise';
import { BUILD_ROUTES } from '@/constants/routes';

const getDescText = (userType, btnDisabled, hasSelectedPlace, isFinalizePending, canFix) => {
  const descTexts = {
    create: {
      true: canFix ? '최종 약속 장소를 선택해주세요' : '모든 사용자가 좋아요를 눌러야 해요',
      false: isFinalizePending ? '약속 확정 중' : '약속 장소를 선택해주세요',
    },
    join: {
      true: '하나 이상의 장소를 좋아요하세요',
      false: '하나 이상의 장소를 좋아요하세요',
    },
  };
  return descTexts[userType][btnDisabled];
};

const getBtnText = (userType, selectedPlace) => {
  const btnTexts = {
    create: selectedPlace?.placeId ? '이 장소를 선택' : '장소 카드를 선택해주세요',
    join: '약속 결과 보기',
  };
  return btnTexts[userType];
};

const useSearchPlace = (category) => {
  const { promiseId } = useParams();
  const navigate = useNavigate();

  const { myLocation } = useLocationInfo();
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  // 카카오 장소 검색 로딩 상태
  const [isSearching, setIsSearching] = useState(false);
  const { selectedTab } = usePlaceLikeToggleInfo();
  const isLikeList = selectedTab === 'like';

  const { userId, promises } = useUserInfo();
  const { selectedPlace } = usePromiseDataInfo();
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();
  const { mutate: finalizePromise, isPending: isFinalizePending } = useFinalizePromise();

  // 서버 데이터 구조 분해 할당 (기본값 설정으로 에러 방지)
  const {
    centerStation = DEFAULT_SUBWAY_STATION,
    likedPlaces = [],
    routes = [],
    isAllMembersSubmit,
    canFix,
  } = promiseDataFromServer ?? {};

  const { isPending: isUserDataPending } = useGetUserData(userId);
  const isInvitedMember = promises.join.includes(promiseId);
  const userType = isInvitedMember ? 'join' : 'create';

  // 버튼 비활성화 조건
  const btnDisabled = useMemo(() => {
    if (userType === 'create') {
      // 생성자는 모든 멤버가 좋아요를 눌렀을 때만 버튼 활성화
      return !selectedPlace || !canFix;
    }
    // 참여자는 자신이 좋아요를 눌렀을 때만 버튼 활성화
    return !likedPlaces?.some((place) => place.userIds.includes(userId));
  }, [userType, selectedPlace, canFix, likedPlaces, userId]);

  // Places 서비스 초기화
  const ps = useMemo(() => {
    return new window.kakao.maps.services.Places();
  }, []);

  // 검색 결과 처리
  const handleSearchResults = useCallback(
    (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const places = data.map((place) => ({
          placeId: place.id,
          type: category,
          name: place.place_name,
          phone: place.phone,
          address: place.road_address_name ?? place.address_name,
          link: place.place_url,
          position: new window.kakao.maps.LatLng(place.y, place.x),
        }));

        setNearbyPlaces(places);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        setNearbyPlaces([]);
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        throw new Error('장소 검색 중 에러 발생');
      }
      setIsSearching(false);
    },
    [category],
  );

  // 서버 리패치 시 centerStation 객체 참조가 바뀌어도 값이 같으면 동일 참조 유지
  // → 검색 effect가 불필요하게 재실행되지 않도록 방지
  const stableCenterStation = useMemo(
    () => centerStation,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [centerStation?.name, centerStation?.position?.Ma, centerStation?.position?.La],
  );

  // 장소 검색
  useEffect(() => {
    if (!ps || isSearching || !stableCenterStation?.name) return;

    setIsSearching(true); // 검색 시작 시 로딩 활성화
    setNearbyPlaces([]);

    const keyword = `${stableCenterStation.name} ${CATEGORY_LABEL[category]}`.trim();

    ps.keywordSearch(keyword, handleSearchResults, {
      location: new window.kakao.maps.LatLng(
        stableCenterStation.position.Ma,
        stableCenterStation.position.La,
      ),
      radius: 1000, // 중심점으로부터 1km 반경 내 검색
      sort: window.kakao.maps.services.SortBy.DISTANCE, // 거리순 정렬
    });
    // isSearching은 실행 여부를 가드하는 용도, 의존성에서 제외
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, stableCenterStation, ps, handleSearchResults]);

  // 좋아요 장소를 카카오 맵 형식으로 변환 (좋아요 추가/제거 시에만 바뀜)
  const likedPlacesList = useMemo(() => {
    return likedPlaces.map((likedPlace) => ({
      placeId: likedPlace.place.placeId,
      type: likedPlace.place.type,
      name: likedPlace.place.name,
      address: likedPlace.place.address,
      phone: likedPlace.place.phone,
      link: likedPlace.place.link,
      position: new window.kakao.maps.LatLng(
        likedPlace.place.position.Ma,
        likedPlace.place.position.La,
      ),
    }));
  }, [likedPlaces]);

  // 근처 탭: nearbyPlaces 그대로 사용 (좋아요 변경에 영향 없음)
  // 좋아요 탭: likedPlacesList 사용
  const places = useMemo(() => {
    if (isSearching) return [];
    return isLikeList ? likedPlacesList : nearbyPlaces;
  }, [isLikeList, likedPlacesList, nearbyPlaces, isSearching]);

  const handleNextBtnClick = () => {
    if (userType === 'create' && selectedPlace && canFix) {
      const place = {
        placeId: selectedPlace.placeId,
        type: selectedPlace.type,
        name: selectedPlace.name,
        position: {
          Ma: selectedPlace.position.Ma,
          La: selectedPlace.position.La,
        },
        address: selectedPlace.address,
        phone: selectedPlace.phone,
        link: selectedPlace.link,
      };
      finalizePromise({ promiseId, place });
    } else if (userType === 'join') {
      navigate(BUILD_ROUTES.PROMISE_SUMMARY(promiseId));
    }
  };

  // markers는 places와 myLocation이 실제로 바뀔 때만 재생성 (좋아요 변경 시 근처 탭은 불변)
  const markers = useMemo(() => {
    return myLocation ? [...places, myLocation] : places;
  }, [places, myLocation]);

  // [] 리터럴을 매 렌더마다 새로 만들면 MarkerManager useEffect가 계속 재실행됨
  const finalRoutes = useMemo(() => {
    return isAllMembersSubmit ? routes : [];
  }, [isAllMembersSubmit, routes]);

  return {
    descText: getDescText(userType, btnDisabled, !!selectedPlace, isFinalizePending, canFix),
    btnText: getBtnText(userType, selectedPlace),
    btnDisabled,
    places,
    markers,
    isLoading: isSearching,
    isLikeList,
    routes: finalRoutes,
    handleNextBtnClick,
    isUserDataPending,
  };
};

export default useSearchPlace;
