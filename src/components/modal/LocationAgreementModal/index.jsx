import { useState } from 'react';
import PropTypes from 'prop-types';
import CommonModal from '@/components/modal/CommonModal';
import * as S from './style';
import { useLocationActions } from '@/hooks/stores/promise/useLocationStore';
import useNearestSubwayStation from '@/hooks/kakao/useNearestSubwayStation';

const MY_LOC_MARKER_ID = 'MY_LOCATION_MARKER';

const LocationAgreementModal = ({ isOpen, onClose, onUse }) => {
  const { setAllowMyLocation, setMyLocation } = useLocationActions();
  const { setUseMyLocToSearchNearStation } = useNearestSubwayStation();
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleError = (_err) => {
    setError('위치 정보를 가져올 수 없습니다.');
    setAllowMyLocation(false);
  };

  const handleAgree = () => {
    setAllowMyLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const latlng = new window.kakao.maps.LatLng(latitude, longitude);
          // 내 위치 저장 - 마커에서 사용
          setMyLocation({
            position: { Ma: latitude, La: longitude },
            placeId: MY_LOC_MARKER_ID,
          });
          // 내 위치 기반으로 가까운 역 검색
          setUseMyLocToSearchNearStation(true);

          // 좌표 -> 주소
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0].road_address
                ? result[0].road_address.address_name
                : result[0].address.address_name;
              setLocation(address); // 주소 문자열 저장
            }
          });
          onClose();
          onUse?.(); // 위치 정보 가져온 후 슬라이드 닫기
        },
        (error) => handleError(error),
      );
    } else {
      setError('이 브라우저에서는 위치 정보가 지원되지 않습니다.');
      setAllowMyLocation(false);
    }
  };

  const handleDisagree = () => {
    setAllowMyLocation(false);
    onClose();
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <S.Title>위치 정보 수집 동의</S.Title>
      <S.Description>서비스 이용을 위해 위치 정보 수집에 동의해 주세요.</S.Description>
      {error && <S.Error>{error}</S.Error>}
      <S.ButtonWrapper>
        <S.AgreeButton onClick={handleAgree}>동의</S.AgreeButton>
        <S.DisagreeButton onClick={handleDisagree}>거부</S.DisagreeButton>
      </S.ButtonWrapper>
      {location && <S.LocationInfo>내 위치: {location}</S.LocationInfo>}
    </CommonModal>
  );
};

LocationAgreementModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUse: PropTypes.func,
};

export default LocationAgreementModal;
