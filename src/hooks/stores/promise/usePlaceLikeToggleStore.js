import { useShallow } from 'zustand/shallow';
import placeLikeToggleStore from '@/stores/promise/placeLikeToggleStore';

export const usePlaceLikeToggleInfo = () =>
  placeLikeToggleStore(
    useShallow((state) => ({
      selectedTab: state.selectedTab,
    })),
  );

export const usePlaceLikeToggleActions = () => placeLikeToggleStore((state) => state.actions);
