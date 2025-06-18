import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const tabsStore = create()(
  devtools(
    immer((set) => ({
      selectedValue: '',
      option: '',
      actions: {
        setSelectedValue: (value) =>
          set((state) => {
            state.selectedValue = value;
          }),
        setOption: (value) =>
          set((state) => {
            state.option = value;
          }),
      },
    })),
  ),
);

export default tabsStore;
