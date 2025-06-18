import { useShallow } from 'zustand/shallow';
import promiseDataFromServerStore from '@/stores/promise/promiseDataFromServerStore';

export const usePromiseDataFromServerInfo = () =>
  promiseDataFromServerStore(
    useShallow((state) => ({
      promiseDataFromServer: state.promiseDataFromServer,
    })),
  );

export const usePromiseDataFromServerActions = () =>
  promiseDataFromServerStore((state) => state.actions);
