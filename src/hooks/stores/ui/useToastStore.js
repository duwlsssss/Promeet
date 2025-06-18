import { useShallow } from 'zustand/shallow';
import toastStore from '@/stores/ui/toastStore';

export const useToastInfo = () =>
  toastStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      message: state.message,
      isFadingOut: state.isFadingOut,
    })),
  );

export const useToastActions = () => toastStore((state) => state.actions);
