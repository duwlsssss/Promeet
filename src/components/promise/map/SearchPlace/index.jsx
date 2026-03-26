import * as S from './style';
import PropTypes from 'prop-types';
import PlaceCardList from '@/components/promise/place/PlaceCardList';
import PlaceLikeToggle from '@/components/promise/place/PlaceLikeToggle';
import MarkerManager from '../MarkerManager';
import BottomSheet from '@/components/ui/BottomSheet';
import Button from '@/components/ui/Button';
import useSearchPlace from '../../../../hooks/queries/useSearchPlace';
import { CATEGORY } from '@/constants/place';
import { MAP_BS_ID } from '@/constants/map';

const SearchPlace = ({ category }) => {
  const {
    descText,
    btnText,
    btnDisabled,
    places,
    myLocation,
    isLoading,
    isLikeList,
    routes,
    handleNextBtnClick,
  } = useSearchPlace(category);

  return (
    <>
      <MarkerManager markers={[...places, ...(myLocation ? [myLocation] : [])]} routes={routes} />
      <BottomSheet id={MAP_BS_ID}>
        <S.ListContainer>
          <PlaceLikeToggle />
          <PlaceCardList
            places={places}
            isLoading={isLoading}
            emptyText={isLikeList ? '좋아요한 장소가 없어요' : '주변 장소가 없어요'}
          />
        </S.ListContainer>
      </BottomSheet>
      <S.NextBtnContainer>
        <S.Descriptrtion>{descText}</S.Descriptrtion>
        <Button onClick={handleNextBtnClick} disabled={btnDisabled}>
          {btnText}
        </Button>
      </S.NextBtnContainer>
    </>
  );
};

SearchPlace.propTypes = {
  category: PropTypes.oneOf(Object.values(CATEGORY)).isRequired,
};

export default SearchPlace;
