import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const toastStore = create()(
  devtools(
    immer((set) => ({
      isOpen: false,
      message: '',
      isFadingOut: false,
      actions: {
        show: (message) => {
          set((state) => {
            state.isOpen = true;
            state.message = message;
            state.isFadingOut = false;
          });
          setTimeout(() => {
            set((state) => {
              state.isFadingOut = true;
            });
          }, 2500);
          setTimeout(() => {
            set((state) => {
              state.isOpen = false;
              state.message = '';
              state.isFadingOut = false;
            });
          }, 3000);
        },
        close: () =>
          set((state) => {
            state.isOpen = false;
            state.message = '';
            state.isFadingOut = false;
          }),
      },
    })),
  ),
);

export default toastStore;
