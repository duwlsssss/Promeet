import * as S from './style';
import PropTypes from 'prop-types';
import PlaceCardList from '@/components/promise/place/PlaceCardList';
import PlaceLikeToggle from '@/components/promise/place/PlaceLikeToggle';
import MarkerManager from '../MarkerManager';
import BottomSheet from '@/components/ui/BottomSheet';
import Button from '@/components/ui/Button';
import useSearchPlace from './hooks/useSearchPlace';
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
    handleNextBtnClick,
  } = useSearchPlace(category);

  const routes = [
    {
      name: '김여진',
      userId: 'user01',
      route: [
        {
          station: {
            order: 1,
            type: 'normal',
            name: '강남역 2호선',
            position: { Ma: 37.49808633653005, La: 127.02800140627488 },
          },
          duration: 5,
        },
        {
          station: {
            order: 2,
            type: 'transfer',
            name: '고속터미널역 7호선',
            position: { Ma: 37.50305602040624, La: 127.00475171542158 },
          },
          duration: 13,
        },
        {
          station: {
            order: 3,
            type: 'normal',
            name: '숭실대입구역 7호선',
            position: { Ma: 37.496740225112, La: 126.953775818841 },
          },
          duration: 12,
        },
      ],
    },
    {
      name: '장태빈',
      userId: 'user02',
      route: [
        {
          station: {
            order: 1,
            type: 'normal',
            name: '홍대입구역 2호선',
            position: { Ma: 37.5571922937515, La: 126.92538116153932 },
          },
          duration: 6,
        },
        {
          station: {
            order: 2,
            type: 'transfer',
            name: '대림역 7호선',
            position: { Ma: 37.4926259375097, La: 126.8955376612483 },
          },
          duration: 16,
        },
        {
          station: {
            order: 3,
            type: 'normal',
            name: '숭실대입구역 7호선',
            position: { Ma: 37.496740225112, La: 126.953775818841 },
          },
          duration: 11,
        },
      ],
    },
    {
      name: '홍준우',
      userId: 'user03',
      route: [
        {
          station: {
            order: 1,
            type: 'normal',
            name: '서울역 1호선',
            position: { Ma: 37.5546701222641, La: 126.970606925739 },
          },
          duration: 7,
        },
        {
          station: {
            order: 2,
            type: 'transfer',
            name: '노량진역 9호선',
            position: { Ma: 37.5132702665582, La: 126.942454734689 },
          },
          duration: 9,
        },
        {
          station: {
            order: 3,
            type: 'transfer',
            name: '고속터미널역 7호선',
            position: { Ma: 37.50305602040624, La: 127.00475171542158 },
          },
          duration: 8,
        },
        {
          station: {
            order: 4,
            type: 'normal',
            name: '숭실대입구역 7호선',
            position: { Ma: 37.496740225112, La: 126.953775818841 },
          },
          duration: 12,
        },
      ],
    },
  ];

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
