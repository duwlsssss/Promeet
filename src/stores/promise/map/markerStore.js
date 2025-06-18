import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const markerStore = create()(
  devtools(
    immer((set) => ({
      activeMarkerId: null,
      selectedOverlayId: null,
      actions: {
        setActiveMarkerId: (markerId) =>
          set((state) => {
            state.activeMarkerId = markerId;
          }),
        // 오버레이 id랑 marker id랑 같긴 함
        setSelectedOverlayId: (overlayId) =>
          set((state) => {
            state.selectedOverlayId = overlayId;
          }),
      },
    })),
  ),
);

export default markerStore;
