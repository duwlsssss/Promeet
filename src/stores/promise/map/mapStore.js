import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const mapStore = create()(
  devtools(
    immer((set) => ({
      map: null,
      actions: {
        setMap: (map) =>
          set((state) => {
            state.map = map;
          }),
      },
    })),
  ),
);

export default mapStore;
