import { useParams } from 'react-router-dom';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import { usePromiseDataFromServerInfo } from '@/hooks/stores/promise/usePromiseDataFromServerStore';
import useToggleLikePlace from '@/hooks/mutations/useToggleLikePlace';
import * as S from '../style';
import PropTypes from 'prop-types';
import { CATEGORY } from '@/constants/place';

const LikeButton = ({ place }) => {
  const { promiseId } = useParams();
  const { userId } = useUserInfo();
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();
  const { mutate: toggleLike } = useToggleLikePlace();

  const likedPlace = promiseDataFromServer?.likedPlaces?.find(
    (p) => p.place.placeId === place.placeId,
  );
  const isLiked = likedPlace?.userIds?.includes(userId) ?? false;
  const likesCount = likedPlace?.likesCount ?? 0;

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    if (!promiseId) return;
    toggleLike({ promiseId, place, isLiked });
  };

  return (
    <S.CardRight>
      <S.HeartWrapper onClick={handleLikeToggle}>
        {isLiked ? <S.FilledHeartIcon /> : <S.EmptyHeartIcon />}
      </S.HeartWrapper>
      <S.heartCnt>{likesCount}</S.heartCnt>
    </S.CardRight>
  );
};

LikeButton.propTypes = {
  place: PropTypes.shape({
    placeId: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(CATEGORY)),
    name: PropTypes.string.isRequired,

    position: PropTypes.shape({
      Ma: PropTypes.string.isRequired,
      La: PropTypes.string.isRequired,
    }).isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string,
    link: PropTypes.string,
  }),
};

export default LikeButton;
