import { useEffect, useState } from 'react';
import { useLocationInfo } from '@/hooks/stores/promise/useLocationStore';
import { usePromiseDataActions } from '@/hooks/stores/promise/usePromiseDataStore';

const SubwayCategoryCode = 'SW8';

const useNearestSubwayStation = (lat, lng) => {
  const [useMyLocToSearchNearStation, setUseMyLocToSearchNearStation] = useState(false);
  const { setNearestSubwayStation } = usePromiseDataActions();
  const { myLocation } = useLocationInfo();

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    // 내 위치 기반 검색이면 lat, lng 체크 스킵
    if (!useMyLocToSearchNearStation && (!lat || !lng)) return;

    const ps = new window.kakao.maps.services.Places();

    // 내 위치 기반 검색이면 myLocation 사용, 아니면 전달받은 좌표 사용
    const targetLat = useMyLocToSearchNearStation ? myLocation?.position?.Ma : lat;
    const targetLng = useMyLocToSearchNearStation ? myLocation?.position?.La : lng;

    if (!targetLat || !targetLng) return;

    const location = new window.kakao.maps.LatLng(targetLat, targetLng);

    ps.categorySearch(
      SubwayCategoryCode,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
          // 가장 가까운 역
          const nearestStation = data[0];
          setNearestSubwayStation({
            id: nearestStation.id,
            name: nearestStation.place_name,
            position: {
              Ma: nearestStation.y,
              La: nearestStation.x,
            },
            address: nearestStation.address,
            distance: nearestStation.distance,
          });
        }
      },
      {
        location,
        radius: 2000, // 반경 2km 안에서 검색
        sort: window.kakao.maps.services.SortBy.DISTANCE, // 거리순 정렬
      },
    );
  }, [lat, lng, myLocation, useMyLocToSearchNearStation, setNearestSubwayStation]);

  return { useMyLocToSearchNearStation, setUseMyLocToSearchNearStation };
};

export default useNearestSubwayStation;
