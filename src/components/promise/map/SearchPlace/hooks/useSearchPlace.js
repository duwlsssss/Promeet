import { useState, useCallback, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMapInfo } from '@/hooks/stores/promise/map/useMapStore';
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

const getDescText = (userType, btnDisabled, isFinalizePending) => {
  const descTexts = {
    create: {
      true: '모든 사용자가 좋아요를 입력해야해요',
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

/**
 * 역 이름으로 역 정보 검색
 * @param {Object} ps - 카카오맵 Places 서비스
 * @param {string} stationName - 역 이름
 * @returns {Promise<Object>} 역 정보
 */
const getStationInfo = (ps, stationName) => {
  return new Promise((resolve, reject) => {
    ps.keywordSearch(stationName, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 정확한 역 이름과 일치하는 역 찾기
        const station = data.find((s) => s.place_name === stationName);
        if (station) {
          resolve({
            name: station.place_name,
            position: {
              lat: parseFloat(station.y),
              lng: parseFloat(station.x),
            },
          });
        } else {
          resolve(null);
        }
      } else {
        reject(new Error('역 정보 검색 실패'));
      }
    });
  });
};

/**
 * midpoint 데이터를 routes 구조로 변환
 * @param {Object} ps - 카카오맵 Places 서비스
 * @param {Object} midpoint - 중간지점 데이터
 * @param {Object} members - 멤버 정보
 * @returns {Promise<Array>} routes - 변환된 경로 배열
 */
const convertMidpointToRoutes = async (ps, midpoint, members) => {
  if (!midpoint?.results || !midpoint?.byTotal?.station) return [];

  // 모든 역 정보를 한번에 가져오기
  const stationNames = new Set();
  midpoint.results.forEach((result) => {
    const path = result.getPath(midpoint.byTotal.station);
    path.forEach((stationName) => stationNames.add(stationName));
  });

  // 역 정보 매핑
  const stationInfoMap = new Map();
  await Promise.all(
    Array.from(stationNames).map(async (stationName) => {
      try {
        const stationInfo = await getStationInfo(ps, stationName);
        if (stationInfo) {
          stationInfoMap.set(stationName, stationInfo);
        }
      } catch (error) {
        console.error('역 정보 검색 실패:', error);
      }
    }),
  );

  return midpoint.results.map((result) => {
    const path = result.getPath(midpoint.byTotal.station);
    // 모든 역까지의 시간 합산
    const totalTime = Object.values(result.times).reduce((sum, time) => sum + time, 0);

    const route = path.map((stationName, index) => {
      const isMidpoint = stationName === midpoint.byTotal.station;
      const stationInfo = stationInfoMap.get(stationName);

      return {
        station: {
          order: index + 1,
          type: isMidpoint ? 'midpoint' : 'normal',
          name: stationName,
          position: stationInfo
            ? {
                La: stationInfo.position.lat,
                Ma: stationInfo.position.lng,
              }
            : { La: 0, Ma: 0 },
        },
      };
    });

    const name = members.find((m) => m.userId === result.userId);

    return {
      name,
      userId: result.userId,
      time: totalTime,
      route,
    };
  });
};

const useSearchPlace = (category) => {
  const { isKakaoLoaded } = useMapInfo();
  const { myLocation } = useLocationInfo();
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [routes, setRoutes] = useState([]);
  const { selectedTab } = usePlaceLikeToggleInfo();
  const isLikeList = selectedTab === 'like';
  const navigate = useNavigate();

  const { userId, promises } = useUserInfo();
  const { selectedPlace } = usePromiseDataInfo();
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();
  const { likedPlaces, midpoint, members, memberCnt } = promiseDataFromServer;
  const { mutate: finalizePromise, isPending: isFinalizePending } = useFinalizePromise();

  const { promiseId } = useParams();

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
    if (!isKakaoLoaded) return null;
    return new window.kakao.maps.services.Places();
  }, [isKakaoLoaded]);

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
      setIsLoading(false);
    },
    [category],
  );

  // 장소 검색
  useEffect(() => {
    if (!ps) return;
    setIsLoading(true);
    setNearbyPlaces([]);

    // 실제로는 중간역 사용 해야함
    const keyword = DEFAULT_SUBWAY_STATION + CATEGORY_LABEL[category];
    ps.keywordSearch(keyword, handleSearchResults);
  }, [category, ps, handleSearchResults]);

  // routes 업데이트
  useEffect(() => {
    if (!ps || !midpoint || !members) return;
    const updateRoutes = async () => {
      const newRoutes = await convertMidpointToRoutes(ps, midpoint, members);
      setRoutes(newRoutes);
    };
    updateRoutes();
  }, [ps, midpoint, members]);

  // 주변 장소에 좋아요 정보 추가
  const mergedNearbyPlaces = useMemo(() => {
    if (isLoading) return [];

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
  }, [nearbyPlaces, likedPlaces, userId, isLoading]);

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
    if (isLoading) return [];
    return isLikeList ? mergedLikedPlaces : mergedNearbyPlaces;
  }, [isLikeList, mergedLikedPlaces, mergedNearbyPlaces, isLoading]);

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
    descText: getDescText(userType, btnDisabled, isFinalizePending),
    btnText: getBtnText(userType, selectedPlace),
    btnDisabled,
    places,
    routes,
    myLocation,
    isLoading,
    isLikeList,
    handleNextBtnClick,
    isUserDataPending,
  };
};

export default useSearchPlace;
