import * as S from './style';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/promise/Header';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import SearchLocation from '@/components/promise/SearchLocation';
import { PROMISE_JOIN_HEADER_TEXT } from '@/constants/promise';
import { ROUTES, BUILD_ROUTES } from '@/constants/routes';
import { usePromiseDataInfo } from '@/hooks/stores/promise/usePromiseDataStore';

const slideVariants = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { type: 'tween', duration: 0.3 },
};

const JoinLocationPage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { promiseId } = useParams();
  const navigate = useNavigate();

  const { nearestSubwayStation } = usePromiseDataInfo();

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const handleNextBtn = () => {
    if (nearestSubwayStation.name) {
      navigate(BUILD_ROUTES.PROMISE_SCHEDULE(promiseId));
    }
  };

  return (
    <S.Container>
      <Header text={PROMISE_JOIN_HEADER_TEXT} navigateUrl={ROUTES.HOME} />
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
export default JoinLocationPage;
