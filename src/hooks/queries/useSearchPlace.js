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

const getDescText = (userType, btnDisabled, hasSelectedPlace, isFinalizePending) => {
  const descTexts = {
    create: {
      true: hasSelectedPlace
        ? '최종 약속 장소를 선택해주세요'
        : '모든 사용자가 좋아요를 입력해야해요',
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
    join: '약속 정보 보기',
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
    members = [],
    memberCnt = 0,
    routes = [],
    isAllMembersSubmit,
  } = promiseDataFromServer ?? {};

  const { isPending: isUserDataPending } = useGetUserData(userId);
  const isInvitedMember = promises.join.includes(promiseId);
  const userType = isInvitedMember ? 'join' : 'create';

  // 모든 멤버가 좋아요를 눌렀는지 확인
  const allMembersLiked = useMemo(() => {
    if (members.length !== memberCnt) return false;
    return memberCnt - 1 === members.filter((m) => m.hasLikedPlace).length;
  }, [members, memberCnt]);

  // 버튼 비활성화 조건
  const btnDisabled = useMemo(() => {
    if (userType === 'create') {
      // 생성자는 모든 멤버가 좋아요를 눌렀을 때만 버튼 활성화
      return !selectedPlace || !allMembersLiked;
    }
    // 참여자는 자신이 좋아요를 눌렀을 때만 버튼 활성화
    return !likedPlaces?.some((place) => place.userIds.includes(userId));
  }, [userType, selectedPlace, allMembersLiked, likedPlaces, userId]);

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
          isLiked: false,
          likesCount: 0,
        }));

        const sortedPlaces = places.sort((p1, p2) => p2.likesCount - p1.likesCount);
        setNearbyPlaces(sortedPlaces);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        setNearbyPlaces([]);
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        throw new Error('장소 검색 중 에러 발생');
      }
      setIsSearching(false);
    },
    [category],
  );

  // 장소 검색
  useEffect(() => {
    if (!ps || isSearching || !centerStation?.name) return;

    setIsSearching(true); // 검색 시작 시 로딩 활성화
    setNearbyPlaces([]);

    const keyword = `${centerStation.name} ${CATEGORY_LABEL[category]}`.trim();

    ps.keywordSearch(keyword, handleSearchResults, {
      location: new window.kakao.maps.LatLng(centerStation.position.Ma, centerStation.position.La),
      radius: 1000, // 중심점으로부터 1km 반경 내 검색
      sort: window.kakao.maps.services.SortBy.DISTANCE, // 거리순 정렬
    });
  }, [category, centerStation, ps, handleSearchResults, isSearching]);

  // 주변 장소에 좋아요 정보 추가
  const mergedNearbyPlaces = useMemo(() => {
    if (isSearching) return [];

    return nearbyPlaces.map((place) => {
      const likedPlace = likedPlaces.find((p) => p.place.placeId === place.placeId);
      if (likedPlace) {
        const hasMyLike = likedPlace.userIds.includes(userId);
        return {
          ...place,
          isLiked: hasMyLike,
          likesCount: likedPlace.likesCount,
        };
      }
      return place;
    });
  }, [nearbyPlaces, likedPlaces, userId, isSearching]);

  // 좋아요 장소를 카카오 맵 형식으로 변환
  const mergedLikedPlaces = useMemo(() => {
    return likedPlaces.map((likedPlace) => ({
      placeId: likedPlace.place.placeId,
      type: likedPlace.place.type,
      name: likedPlace.place.name,
      address: likedPlace.place.address,
      position: new window.kakao.maps.LatLng(
        likedPlace.place.position.Ma,
        likedPlace.place.position.La,
      ),
      isLiked: likedPlace.userIds.includes(userId),
      likesCount: likedPlace.likesCount,
    }));
  }, [likedPlaces, userId]);

  // 마커용 장소 목록
  const places = useMemo(() => {
    if (isSearching) return [];
    return isLikeList ? mergedLikedPlaces : mergedNearbyPlaces;
  }, [isLikeList, mergedLikedPlaces, mergedNearbyPlaces, isSearching]);

  const handleNextBtnClick = () => {
    if (userType === 'create' && selectedPlace) {
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

  return {
    descText: getDescText(userType, btnDisabled, !!selectedPlace, isFinalizePending),
    btnText: getBtnText(userType, selectedPlace),
    btnDisabled,
    places,
    myLocation,
    isLoading: isSearching,
    isLikeList,
    routes: isAllMembersSubmit ? routes : [],
    handleNextBtnClick,
    isUserDataPending,
  };
};

export default useSearchPlace;
