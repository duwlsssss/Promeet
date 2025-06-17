import mapStore from '@/stores/promise/map/mapStore';
import { useShallow } from 'zustand/shallow';

export const useMapInfo = () =>
  mapStore(
    useShallow((state) => ({
      map: state.map,
    })),
  );

export const useMapActions = () => mapStore((state) => state.actions);
