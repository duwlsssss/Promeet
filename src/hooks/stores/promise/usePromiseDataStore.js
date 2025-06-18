import { useShallow } from 'zustand/shallow';
import promiseDataStore from '@/stores/promise/promiseDataStore';

export const usePromiseDataInfo = () =>
  promiseDataStore(
    useShallow((state) => ({
      name: state.name,
      description: state.description,
      memberCnt: state.memberCnt,
      availableTimes: state.availableTimes,
      nearestSubwayStation: state.nearestSubwayStation,
      selectedPlace: state.selectedPlace,
    })),
  );

export const usePromiseDataActions = () => promiseDataStore((state) => state.actions);
