import * as S from './style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/promise/Header';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import SearchLocation from '@/components/promise/SearchLocation';
import { usePromiseDataInfo } from '@/hooks/stores/promise/usePromiseDataStore';
import { PROMISE_CREATE_HEADER_TEXT } from '@/constants/promise';
import { ROUTES } from '@/constants/routes';

const slideVariants = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { type: 'tween', duration: 0.3 },
};

const LocationPage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const { nearestSubwayStation } = usePromiseDataInfo();

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const handleNextBtn = () => {
    if (!nearestSubwayStation?.name) return;
    navigate(ROUTES.PROMISE_CREATE_SCHEDULE);
  };

  return (
    <S.Container>
      <Header text={PROMISE_CREATE_HEADER_TEXT} navigateUrl={ROUTES.PROMISE_CREATE_DATE} />
      <Input
        label="내 출발 위치 (가까운 역이 입력돼요)"
        placeholder="출발 위치를 입력해주세요"
        onClick={openSearch}
        readOnly
        style={{ cursor: 'pointer' }}
        value={nearestSubwayStation?.name ?? ''}
      />

      <AnimatePresence>
        {isSearchOpen && (
          <S.Slide
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={slideVariants.transition}
          >
            <SearchLocation onBack={closeSearch} />
          </S.Slide>
        )}
      </AnimatePresence>
      <S.BtnWrapper>
        <Button onClick={handleNextBtn} disabled={!nearestSubwayStation?.name}>
          다음
        </Button>
      </S.BtnWrapper>
    </S.Container>
  );
};
export default LocationPage;
