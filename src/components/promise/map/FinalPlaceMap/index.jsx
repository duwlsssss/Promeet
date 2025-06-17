import PropTypes from 'prop-types';
import MapContainer from '../MapContainer';
import MarkerManager from '../MarkerManager';
import { CATEGORY } from '@/constants/place';

// 최종 약속 위치 표시하는 맵
const FinalPlaceMap = ({ place }) => {
  const lat = Number(place.position.Ma);
  const lng = Number(place.position.La);
  return (
    <MapContainer lat={lat} lng={lng}>
      <MarkerManager markers={[place]} />
    </MapContainer>
  );
};

FinalPlaceMap.propTypes = {
  place: PropTypes.shape({
    position: PropTypes.shape({
      Ma: PropTypes.number.isRequired,
      La: PropTypes.number.isRequired,
    }).isRequired,
    id: PropTypes.string,
    type: PropTypes.oneOf(Object.values(CATEGORY)),
    name: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  isSummaryPage: PropTypes.bool,
};

export default FinalPlaceMap;
