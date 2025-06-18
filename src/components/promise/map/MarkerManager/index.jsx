import './style.css';
import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMapInfo } from '@/hooks/stores/promise/map/useMapStore';
import { useMarkerInfo, useMarkerActions } from '@/hooks/stores/promise/map/useMarkerStore';
import { useBottomSheetActions } from '@/hooks/stores/ui/useBottomSheetStore';
import { CATEGORY, CATEGORY_MARKER_IMAGE, STATION_MARKER_IMAGE } from '@/constants/place';
import { MY_LOC_MARKER_IMG, MY_LOC_MARKER_ID, MAP_BS_ID, ROUTE_COLORS } from '@/constants/map';

const MarkerManager = ({ markers, routes }) => {
  const { pathname } = useLocation();
  const isSummaryPage = pathname.endsWith('/summary');

  const { map } = useMapInfo();
  const { activeMarkerId } = useMarkerInfo(); // 장소 오버레이 표시 위해 저장
  const { setActiveMarkerId, setSelectedOverlayId } = useMarkerActions(); // selectedOverlayId는 바텀 시트 열고 잠시 포커스 주는 역할
  const { setActiveBottomSheet } = useBottomSheetActions();

  // 마커 관리 refs
  const markersRef = useRef([]); // 모든 마커/polyline
  const markerMapRef = useRef(new Map()); // placeId(마커 id)와 마커 매핑
  const currentPlaceOverlayRef = useRef(null); // 모든 오버레이
  const myLocationMarkerRef = useRef(null); // 내 위치 마커는 변했을때만 바꾸기 위해 ref로 관리

  //  마커/polyline 정리 함수 ( 내 위치 마커 제외 )
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker?.setMap(null));
    markersRef.current = [];
    markerMapRef.current.clear();
  }, []);

  // 지도 영역 변경시 마커 표시/숨김
  const handleBoundsChanged = useCallback(() => {
    if (!map) return;
    const bounds = map.getBounds();

    markersRef.current.forEach((marker) => {
      if (!marker) return;

      const position = marker.getPosition();
      if (position) {
        markersRef.current.forEach((marker) => {
          marker.setVisible(bounds.contain(position));
        });
      }
    });
  }, [map]);

  // 마커 생성 및 관리
  useEffect(() => {
    if (!map || !markers) return;

    clearMarkers(); // 이전 마커/오버레이 삭제

    // 1. 장소 마커 생성
    markers.forEach((markerData) => {
      if (markerData.placeId === MY_LOC_MARKER_ID) return; // 내 위치 마커는 별도 처리

      const position = new window.kakao.maps.LatLng(markerData.position.Ma, markerData.position.La);
      const imageSrc = CATEGORY_MARKER_IMAGE[markerData.type];
      if (!imageSrc) return;

      const marker = new window.kakao.maps.Marker({
        position,
        image: new window.kakao.maps.MarkerImage(imageSrc, new window.kakao.maps.Size(32, 34), {
          offset: new window.kakao.maps.Point(15, 40),
        }),
        map,
      });

      if (markerData.placeId) {
        markerMapRef.current.set(markerData.placeId, marker);
        window.kakao.maps.event.addListener(marker, 'click', () =>
          setActiveMarkerId(markerData.placeId),
        );
      }

      marker.setMap(map);
      markersRef.current.push(marker);
    });

    // 2. 경로 마커 생성
    if (routes) {
      // 도착역 (중간역)
      const routeLength = routes[0].route.length;
      const lastStation = routes[0].route[routeLength - 1].station;

      routes.forEach((userRoute, index) => {
        // polyline
        const path = userRoute.route.map(
          (station) =>
            new window.kakao.maps.LatLng(station.station.position.Ma, station.station.position.La),
        );

        const polyline = new window.kakao.maps.Polyline({
          path,
          strokeWeight: 5,
          strokeColor: ROUTE_COLORS[index % ROUTE_COLORS.length],
          strokeOpacity: 0.7,
          map,
        });
        polyline.setMap(map);
        markersRef.current.push(polyline);

        // 사용자 정보 오버레이
        const firstStation = userRoute.route[0].station;
        const totalDuration = userRoute.route.reduce((acc, r) => acc + r.duration, 0);

        const userOverlay = new window.kakao.maps.CustomOverlay({
          content: `
            <div class="userInfoOverlay">
              <div class="durationContainer">
                <div class="bold">${firstStation.name}</div> 
                에서
                <div class="bold"> ${totalDuration}분</div>
              </div>
              <div class="userName">${userRoute.name}</div>
            </div>
          `,
          position: new window.kakao.maps.LatLng(
            firstStation.position.Ma,
            firstStation.position.La,
          ),
          yAnchor: 1.05,
          map,
        });
        userOverlay.setMap(map);
        markersRef.current.push(userOverlay);

        // 도착역 (중간역)
        const stationPosition = new window.kakao.maps.LatLng(
          lastStation.position.Ma,
          lastStation.position.La,
        );

        // 마커
        const stationImageSize = new window.kakao.maps.Size(20, 20);
        const stationImageOption = { offset: new window.kakao.maps.Point(8, 12) };

        const stationMarkerImage = new window.kakao.maps.MarkerImage(
          STATION_MARKER_IMAGE,
          stationImageSize,
          stationImageOption,
        );

        const stationMarker = new window.kakao.maps.Marker({
          position: stationPosition,
          image: stationMarkerImage,
          map,
        });
        stationMarker.setMap(map);
        markersRef.current.push(stationMarker);

        // 오버레이
        const stationOverlay = new window.kakao.maps.CustomOverlay({
          content: `
            <div class="stationInfoOverlay">
              <div class="stationName">${lastStation.name}</div>
            </div>
          `,
          position: stationPosition,
          yAnchor: 1.6,
          map,
        });
        stationOverlay.setMap(map);
        markersRef.current.push(stationOverlay);
      });
    }

    // 3. 내 위치 마커 생성
    const myLocationMarker = markers.find((m) => m.placeId === MY_LOC_MARKER_ID);

    // 내 위치 마커 안 표시한다하면 제거
    if (!myLocationMarker) {
      if (myLocationMarkerRef.current) {
        myLocationMarkerRef.current.setMap(null);
        myLocationMarkerRef.current = null;
      }
      return;
    }

    // 기존 내위치 마커랑 새 내 위치 마커 비교해 다르면 위치 업데이트
    if (myLocationMarkerRef.current) {
      const currentPos = myLocationMarkerRef.current.getPosition();
      const newPos = new window.kakao.maps.LatLng(
        myLocationMarker.position.Ma,
        myLocationMarker.position.La,
      );

      if (currentPos.getLat() !== newPos.getLat() || currentPos.getLng() !== newPos.getLng()) {
        myLocationMarkerRef.current.setPosition(newPos);
      }
    } else {
      // 기존 내위치 마커 없다면 -> 새로 생성
      const myLocImageSize = new window.kakao.maps.Size(30, 30);
      const myLocImageOption = { offset: new window.kakao.maps.Point(20, 20) };
      const myLocMarkerImage = new window.kakao.maps.MarkerImage(
        MY_LOC_MARKER_IMG,
        myLocImageSize,
        myLocImageOption,
      );

      const myLocPosition = new window.kakao.maps.LatLng(
        myLocationMarker.position.Ma,
        myLocationMarker.position.La,
      );

      const myLocMarker = new window.kakao.maps.Marker({
        position: myLocPosition,
        image: myLocMarkerImage,
        map,
      });

      myLocMarker.setMap(map);
      myLocationMarkerRef.current = myLocMarker;
    }

    // 지도 영역 변경 이벤트 리스너 등록
    window.kakao.maps.event.addListener(map, 'bounds_changed', handleBoundsChanged);

    return () => {
      // 컴포넌트가 언마운트될 때는 모든 리소스를 정리
      window.kakao.maps.event.removeListener(map, 'bounds_changed', handleBoundsChanged);
      clearMarkers();
      // 내 위치 마커도 정리
      myLocationMarkerRef.current?.setMap(null);
      myLocationMarkerRef.current = null;
    };
  }, [map, markers, pathname, routes, clearMarkers, handleBoundsChanged, setActiveMarkerId]);

  // activeMarkerId 변경시 장소 오버레이 처리
  useEffect(() => {
    if (!map || !activeMarkerId) {
      currentPlaceOverlayRef.current?.setMap(null);
      currentPlaceOverlayRef.current = null;
      return;
    }

    const marker = markerMapRef.current.get(activeMarkerId);
    const markerData = markers.find((m) => m.placeId === activeMarkerId);
    if (!marker || !markerData) return;

    // 이전 오버레이 닫고
    if (currentPlaceOverlayRef.current) {
      currentPlaceOverlayRef.current.setMap(null);
    }

    // 생성해 추가
    const container = document.createElement('div');
    container.className = `infoContainer ${isSummaryPage ? 'isSummaryPage' : ''}`;
    container.onclick = () => {
      setSelectedOverlayId(markerData.placeId);
      setActiveBottomSheet(MAP_BS_ID);
    };

    const header = document.createElement('header');
    header.className = 'header';

    const title = document.createElement('h2');
    title.className = 'title ellipsis';
    title.textContent = markerData.name;

    const closeBtn = document.createElement('div');
    closeBtn.className = 'close';
    closeBtn.title = '닫기';
    closeBtn.textContent = '닫기';
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      setActiveMarkerId(null);
      container.remove();
    };

    header.appendChild(title);
    header.appendChild(closeBtn);
    container.appendChild(header);

    const body = document.createElement('div');
    body.className = 'body';

    if (markerData.address) {
      const address = document.createElement('div');
      address.className = 'ellipsis';
      address.textContent = markerData.address;
      body.appendChild(address);
    }

    // 요약 페이지에선 전번, 링크 추가
    if (isSummaryPage) {
      if (markerData.phone) {
        const phone = document.createElement('div');
        phone.className = 'ellipsis';
        phone.textContent = markerData.phone;
        body.appendChild(phone);
      }

      if (markerData.link) {
        const link = document.createElement('a');
        link.className = 'link ellipsis';
        link.href = markerData.link;
        link.target = '_blank';
        link.textContent = markerData.link;
        body.appendChild(link);
      }
    }

    container.appendChild(body);

    const overlay = new window.kakao.maps.CustomOverlay({
      content: container,
      position: marker.getPosition(),
      yAnchor: isSummaryPage ? 1 : 1.65,
    });

    overlay.setMap(map);
    currentPlaceOverlayRef.current = overlay;
  }, [
    map,
    markers,
    activeMarkerId,
    isSummaryPage,
    setActiveMarkerId,
    setSelectedOverlayId,
    setActiveBottomSheet,
  ]);

  return null;
};

MarkerManager.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.shape({
        La: PropTypes.number.isRequired,
        Ma: PropTypes.number.isRequired,
      }).isRequired,
      placeId: PropTypes.string,
      type: PropTypes.oneOf(Object.values(CATEGORY)),
      name: PropTypes.string,
      phone: PropTypes.string,
      address: PropTypes.string,
      link: PropTypes.string,
      isLiked: PropTypes.bool,
      likesCount: PropTypes.number,
    }),
  ).isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      route: PropTypes.arrayOf(
        PropTypes.shape({
          station: PropTypes.shape({
            order: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            position: PropTypes.shape({
              Ma: PropTypes.number.isRequired,
              La: PropTypes.number.isRequired,
            }).isRequired,
          }).isRequired,
          duration: PropTypes.number.isRequired,
        }),
      ),
    }),
  ),
};

export default MarkerManager;
