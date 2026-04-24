import { useMemo } from 'react';
import * as S from './style';
import PropTypes from 'prop-types';
import matchIcon from '@/utils/matchIcon.jsx';
import usePlaceCardHandlers from './hooks/usePlaceCardHandlers';
import LikeButton from './LikeButton';
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
  const { showHeart, isCreator, isSelected, isRetrieved, handleCardClick, handleClickFixPlaceBtn } =
    usePlaceCardHandlers(place, $isRetrieved);

  // 값이 같으면 같은 객체 참조 유지 → framer-motion이 불필요한 애니메이션 실행 안 함
  const animateConfig = useMemo(
    () => ({
      backgroundColor: isRetrieved ? 'rgba(64, 181, 159, 0.31)' : 'rgba(255, 255, 255, 1)',
    }),
    [isRetrieved],
  );

  return (
    <S.PlaceCard
      $isSelected={isSelected}
      initial={false}
      animate={animateConfig}
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

        {showHeart ? <LikeButton place={place} /> : null}
      </S.CardBackground>
    </S.PlaceCard>
  );
};

// isLiked, likesCount는 PlaceCard에서 직접 관리하지 않고 PlaceLikeToggle에서 관리
// → PlaceCardList에서 PlaceCard로 props로 넘겨줄 필요 없음
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
