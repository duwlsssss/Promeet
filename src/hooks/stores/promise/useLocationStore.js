import { useShallow } from 'zustand/shallow';
import locationStore from '@/stores/promise/locationStore';

export const useLocationInfo = () =>
  locationStore(
    useShallow((state) => ({
      allowMyLocation: state.allowMyLocation,
      myLocation: state.myLocation,
    })),
  );

export const useLocationActions = () => locationStore((state) => state.actions);
