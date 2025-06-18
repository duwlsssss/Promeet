import * as S from './style';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../PlaceCard';
import PlaceCardSkeleton from '../PlaceCard/PlaceCardSkeleton';
import { useMarkerInfo } from '@/hooks/stores/promise/map/useMarkerStore';
import { CATEGORY } from '@/constants/place';

const PlaceCardList = ({ places, isLoading, emptyText, onCardClick }) => {
  const { selectedOverlayId } = useMarkerInfo();
  const selectedOverlayRef = useRef(null);

  useEffect(() => {
    if (selectedOverlayId && selectedOverlayRef.current) {
      selectedOverlayRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedOverlayId]);

  if (isLoading) {
    return (
      <S.Container>
        {[...Array(6)].map((_, i) => (
          <PlaceCardSkeleton key={i} />
        ))}
      </S.Container>
    );
  }

  return (
    <S.Container>
      {places.length > 0 ? (
        places.map((place, i) => (
          <div key={i} ref={place.placeId === selectedOverlayId ? selectedOverlayRef : null}>
            <PlaceCard
              placeId={place.placeId}
              position={place.position}
              type={place.type}
              name={place.name}
              address={place.address}
              phone={place.phone}
              link={place.link}
              isLiked={place.isLiked}
              likesCount={place.likesCount}
              $isRetrieved={place.placeId === selectedOverlayId}
              {...(onCardClick && { onClick: () => onCardClick(place) })}
            />
          </div>
        ))
      ) : (
        <S.EmptyText>{emptyText}</S.EmptyText>
      )}
    </S.Container>
  );
};

PlaceCardList.propTypes = {
  places: PropTypes.arrayOf(
    PropTypes.shape({
      placeId: PropTypes.string.isRequired,
      position: PropTypes.shape({
        Ma: PropTypes.string.isRequired,
        La: PropTypes.string.isRequired,
      }).isRequired,
      type: PropTypes.oneOf(Object.values(CATEGORY)).isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      phone: PropTypes.string,
      link: PropTypes.string,
      isLiked: PropTypes.bool.isRequired,
      likesCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  emptyText: PropTypes.string.isRequired,
  onCardClick: PropTypes.func,
};

export default PlaceCardList;
