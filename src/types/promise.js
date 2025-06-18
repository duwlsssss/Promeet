import PropTypes from 'prop-types';

export const positionShape = PropTypes.shape({
  La: PropTypes.number.isRequired,
  Ma: PropTypes.number.isRequired,
});

export const stationShape = PropTypes.shape({
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: positionShape.isRequired,
});

export const timeShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
});

export const memberShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  hasSubmittedData: PropTypes.bool.isRequired,
  hasLikedPlace: PropTypes.bool,
  nearestStation: stationShape,
  availableTimes: PropTypes.arrayOf(timeShape),
});

export const routeStationShape = PropTypes.shape({
  order: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['normal', 'transfer']).isRequired,
  name: PropTypes.string.isRequired,
  position: positionShape.isRequired,
});

export const routeShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  route: PropTypes.arrayOf(
    PropTypes.shape({
      station: routeStationShape.isRequired,
      duration: PropTypes.number.isRequired,
    }),
  ).isRequired,
});

export const placeShape = PropTypes.shape({
  placeId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['restaurant', 'cafe', 'studyCafe', 'activity']).isRequired,
  name: PropTypes.string.isRequired,
  position: positionShape.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string,
  link: PropTypes.string,
});

export const likedPlaceShape = PropTypes.shape({
  userIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  likesCount: PropTypes.number.isRequired,
  place: placeShape.isRequired,
});

export const promiseDataShape = PropTypes.shape({
  creatorId: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(memberShape).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isAllMemebersSubmit: PropTypes.bool.isRequired,
  fixedTime: PropTypes.arrayOf(timeShape),
  centerStation: stationShape,
  route: PropTypes.arrayOf(routeShape),
  likedPlaces: PropTypes.arrayOf(likedPlaceShape),
  fixedPlace: placeShape,
  canFix: PropTypes.bool.isRequired,
  isFixed: PropTypes.bool.isRequired,
});
