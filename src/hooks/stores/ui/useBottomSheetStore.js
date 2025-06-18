import { useShallow } from 'zustand/shallow';
import bottomSheetStore from '@/stores/ui/bottomSheetStore';

export const useBottomSheetInfo = () =>
  bottomSheetStore(
    useShallow((state) => ({
      activeBottomSheet: state.activeBottomSheet,
      bottomSheetHeight: state.bottomSheetHeight,
    })),
  );

export const useBottomSheetActions = () => bottomSheetStore((state) => state.actions);
