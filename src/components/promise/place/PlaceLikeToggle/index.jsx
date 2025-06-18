import * as S from './style';
import {
  usePlaceLikeToggleInfo,
  usePlaceLikeToggleActions,
} from '@/hooks/stores/promise/usePlaceLikeToggleStore';

const PlaceLikeToggle = () => {
  const { selectedTab } = usePlaceLikeToggleInfo();
  const { setSelectedTab } = usePlaceLikeToggleActions();
  const isLikeTab = selectedTab === 'like';

  const handleToggle = () => {
    setSelectedTab(isLikeTab ? 'place' : 'like');
  };

  return (
    <S.ToggleContainer onClick={handleToggle}>
      <S.Slide
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ left: isLikeTab ? '50%' : '0', right: isLikeTab ? '0' : '50%' }}
      ></S.Slide>
      <S.ToggleOption>
        <S.ToggleItem>
          <S.LocationIcon />
          <span>장소</span>
        </S.ToggleItem>
      </S.ToggleOption>
      <S.ToggleOption>
        <S.ToggleItem>
          <S.HeartIcon />
          <span>좋아요</span>
        </S.ToggleItem>
      </S.ToggleOption>
    </S.ToggleContainer>
  );
};

export default PlaceLikeToggle;
