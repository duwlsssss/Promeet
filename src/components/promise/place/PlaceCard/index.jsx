import * as S from './style';
import PropTypes from 'prop-types';
import matchIcon from '@/utils/matchIcon.jsx';
import usePlaceCardHandlers from './hooks/usePlaceCardHandlers';
import { CATEGORY } from '@/constants/place';

const PlaceCard = ({
  placeId,
  type,
  name,
  position,
  address,
  phone,
  link,
  onClick,
  $isRetrieved,
}) => {
  const place = { placeId, type, name, position, address, phone, link };
  const {
    showHeart,
    isCreator,
    isLiked,
    likesCount,
    isSelected,
    isRetrieved,
    handleCardClick,
    handleLikeToggle,
    handleClickFixPlaceBtn,
  } = usePlaceCardHandlers(place, $isRetrieved);

  return (
    <S.PlaceCard
      $isSelected={isSelected}
      animate={{
        backgroundColor: isRetrieved ? 'rgba(64, 181, 159, 0.31)' : 'rgba(255, 255, 255, 1)',
      }}
      transition={{ duration: 1.5 }}
    >
      <S.CardBackground onClick={onClick ?? handleCardClick}>
        <S.CardLeft>
          <S.CardHeaderWrapper>
            {matchIcon(type)}
            <S.PlaceName>{name}</S.PlaceName>
          </S.CardHeaderWrapper>
          <S.CardInfoWrapper>
            {address ? <S.PlaceInfoText>{address}</S.PlaceInfoText> : null}
            {phone ? <S.PlaceInfoText>{phone}</S.PlaceInfoText> : phone}
            {link ? (
              <S.PlaceLink href={link} target="_blank" rel="noopener noreferrer">
                정보 보기
              </S.PlaceLink>
            ) : null}
          </S.CardInfoWrapper>
          {isCreator ? (
            <S.FixPlaceBtn
              onClick={(e) => {
                e.stopPropagation();
                handleClickFixPlaceBtn();
              }}
            >
              {isSelected ? '선택 취소' : '선택하기'}
            </S.FixPlaceBtn>
          ) : null}
        </S.CardLeft>

        {showHeart ? (
          <S.CardRight>
            <S.HeartWrapper
              onClick={(e) => {
                e.stopPropagation();
                handleLikeToggle();
              }}
            >
              {isLiked === undefined ? null : isLiked ? (
                <S.FilledHeartIcon />
              ) : (
                <S.EmptyHeartIcon />
              )}
            </S.HeartWrapper>
            <S.heartCnt>{likesCount}</S.heartCnt>
          </S.CardRight>
        ) : null}
      </S.CardBackground>
    </S.PlaceCard>
  );
};

PlaceCard.propTypes = {
  placeId: PropTypes.string.isRequired,
  position: PropTypes.shape({
    Ma: PropTypes.string.isRequired,
    La: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(CATEGORY)),
  phone: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  $isRetrieved: PropTypes.bool,
};

export default PlaceCard;
