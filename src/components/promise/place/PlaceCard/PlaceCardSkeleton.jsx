import * as S from './style';
import { AnimatePresence } from 'framer-motion';

const skeletonVariants = {
  pulse: {
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const PlaceCardSkeleton = () => {
  return (
    <AnimatePresence mode="wait">
      <S.PlaceCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <S.CardLeft>
          <S.CardHeaderWrapper>
            <S.SkeletonName variants={skeletonVariants} animate="pulse" />
          </S.CardHeaderWrapper>
          <S.SkeletonAddress variants={skeletonVariants} animate="pulse" />
        </S.CardLeft>
      </S.PlaceCard>
    </AnimatePresence>
  );
};

export default PlaceCardSkeleton;
