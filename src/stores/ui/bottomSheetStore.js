import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const bottomSheetStore = create()(
  devtools(
    immer((set) => ({
      activeBottomSheet: null,
      bottomSheetHeight: 'auto',
      actions: {
        setActiveBottomSheet: (sheet) =>
          set((state) => {
            state.activeBottomSheet = sheet;
          }),
        setBottomSheetHeight: (height) =>
          set((state) => {
            state.bottomSheetHeight = height;
          }),
      },
    })),
  ),
);

export default bottomSheetStore;
