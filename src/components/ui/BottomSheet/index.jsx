import * as S from './style';
import PropTypes from 'prop-types';
import { AnimatePresence, useDragControls, useMotionValue } from 'framer-motion';
import { useBottomSheetInfo, useBottomSheetActions } from '@/hooks/stores/ui/useBottomSheetStore';
import { MAP_BS_ID } from '@/constants/map';

/**
 * BottomSheet 컴포넌트
 *
 * @param {string} id - 바텀시트 종류 구분 id
 * @param {node} children - 구성 요소
 */
const BottomSheet = ({ id, children }) => {
  const isMapBS = id === MAP_BS_ID;
  const bottomSheetVariants = {
    opened: { top: 'var(--place-category-tab-height)' },
    closed: {
      top: isMapBS
        ? `calc(100% - var(--bs-header-height) - var(--next-btn-container-height))`
        : `calc(100% - var(--bs-header-height)`,
    },
  };

  const offsetThreshold = 100;
  const deltaThreshold = 5;

  const { activeBottomSheet } = useBottomSheetInfo();
  const { setActiveBottomSheet } = useBottomSheetActions();

  // 드래그 상태 관리
  const dragY = useMotionValue(0);
  const animateState = activeBottomSheet === id ? 'opened' : 'closed';

  const dragControls = useDragControls();

  const handleDragEnd = (_, info) => {
    const isOverOffsetThreshold = Math.abs(info.offset.y) > offsetThreshold;
    const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold;

    const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold;
    if (!isOverThreshold) return;

    setActiveBottomSheet(info.offset.y < 0 ? id : null);
  };

  return (
    <AnimatePresence initial={false}>
      <S.BottomSheet
        drag="y"
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        style={{ y: dragY }}
        animate={animateState}
        variants={bottomSheetVariants}
        onDragEnd={handleDragEnd}
        dragControls={dragControls}
        dragListener={false}
      >
        <S.BottomSheetHeader onPointerDown={(e) => dragControls.start(e)}>
          <S.lineIcon />
        </S.BottomSheetHeader>
        <S.BottomSheetContent>{children}</S.BottomSheetContent>
      </S.BottomSheet>
    </AnimatePresence>
  );
};

BottomSheet.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

export default BottomSheet;

/**
 * 사용 예시
 * import { BottomSheet, Button } from '@/components'
 *
 * <Button onClick={() => setActiveBottomSheet('sheet1')}>Open Sheet 1</Button>
 *
 * <BottomSheet id="sheet1" >
 *  <S.Content>
 *    blabla
 *  </S.Content>
 * </BottomSheet>
 */
