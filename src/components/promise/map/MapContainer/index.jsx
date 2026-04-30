import * as S from './style';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useMapActions } from '@/hooks/stores/promise/map/useMapStore';
import useKakaoMap from '@/hooks/kakao/useKakaoMap';
import DeferredLoader from '@/components/ui/DeferredLoader';

const MapContainer = ({ children, lat, lng }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null); // 같은 컨테이너에 map이 중복 생성되는 걸 방지
  const { setMap } = useMapActions();

  const { ready, error } = useKakaoMap();

  // 지도 생성 (최초 1회) 및 중심 좌표 업데이트
  useEffect(() => {
    if (error || !ready || !mapRef.current) {
      return;
    }

    try {
      if (mapInstanceRef.current) {
        // 이미 맵이 있으면 중심만 이동 (재생성하면 내부 DOM 충돌 발생)
        mapInstanceRef.current.setCenter(new window.kakao.maps.LatLng(lat, lng));
        return;
      }

      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      });
      mapInstanceRef.current = map;
      setMap(map);
    } catch (error) {
      console.error('지도 생성 실패:', error);
    }

    return () => {
      setMap(null);
      mapInstanceRef.current = null;
    };
  }, [error, ready, lat, lng, setMap]);

  // 에러가 있으면 Error Boundary가 잡을 수 있도록 에러를 던짐
  if (error) {
    throw error;
  }

  // 카카오 스크립트 준비 안됐으면 로딩 컴포넌트 표시
  if (!ready) {
    return <DeferredLoader />;
  }

  return (
    <S.MapDiv id="map" ref={mapRef}>
      {children}
    </S.MapDiv>
  );
};

MapContainer.propTypes = {
  children: PropTypes.node,
  lat: PropTypes.number,
  lng: PropTypes.number,
};

export default MapContainer;
