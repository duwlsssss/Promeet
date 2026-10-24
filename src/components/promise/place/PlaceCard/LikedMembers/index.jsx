import PropTypes from 'prop-types';
import { usePromiseDataFromServerInfo } from '@/hooks/stores/promise/usePromiseDataFromServerStore';
import * as S from '../style';

// 해당 장소에 좋아요를 누른 멤버 이름 표시
const LikedMembers = ({ placeId }) => {
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();

  const likedPlace = promiseDataFromServer?.likedPlaces?.find((p) => p.place.placeId === placeId);
  if (!likedPlace?.userIds?.length) return null;

  // 서버 likedPlaces에는 userId만 있으므로 members에서 이름을 찾아 매핑
  const nameById = new Map(promiseDataFromServer.members.map((m) => [m.userId, m.name]));
  const names = likedPlace.userIds.map((id) => nameById.get(id)).filter(Boolean);
  if (names.length === 0) return null;

  return <S.LikedMembersText>♥ {names.join(', ')}</S.LikedMembersText>;
};

LikedMembers.propTypes = {
  placeId: PropTypes.string.isRequired,
};

export default LikedMembers;
