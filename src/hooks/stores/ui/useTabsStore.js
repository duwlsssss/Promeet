import { useShallow } from 'zustand/shallow';
import tabsStore from '@/stores/ui/tabsStore';

export const useTabsInfo = () =>
  tabsStore(
    useShallow((state) => ({
      selectedValue: state.selectedValue,
      option: state.option,
    })),
  );

export const useTabsActions = () => tabsStore((state) => state.actions);
