import markerStore from '@/stores/promise/map/markerStore';
import { useShallow } from 'zustand/shallow';

export const useMarkerInfo = () =>
  markerStore(
    useShallow((state) => ({
      activeMarkerId: state.activeMarkerId,
      selectedOverlayId: state.selectedOverlayId,
    })),
  );

export const useMarkerActions = () => markerStore((state) => state.actions);
