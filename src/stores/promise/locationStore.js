import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const locationStore = create()(
  devtools(
    immer((set) => ({
      allowMyLocation: false,
      myLocation: null,
      actions: {
        setAllowMyLocation: (allow) =>
          set((state) => {
            state.allowMyLocation = allow;
          }),
        setMyLocation: (location) =>
          set((state) => {
            state.myLocation = location;
          }),
      },
    })),
  ),
);

export default locationStore;
