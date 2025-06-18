import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const placeLikeToggleStore = create()(
  devtools(
    immer((set) => ({
      selectedTab: 'place', // 'place' | 'like'
      actions: {
        setSelectedTab: (tab) =>
          set((state) => {
            state.selectedTab = tab;
          }),
      },
    })),
  ),
);

export default placeLikeToggleStore;
