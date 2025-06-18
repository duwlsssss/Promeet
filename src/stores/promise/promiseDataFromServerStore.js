import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// 서버에서 가져오는 약속 정보
const promiseDataFromServerStore = create()(
  devtools(
    immer((set) => ({
      promiseDataFromServer: null,
      actions: {
        // 약속 정보 가져와서 저장
        setPromiseDataFromServer: (promiseData) =>
          set((state) => {
            state.promiseDataFromServer = promiseData;
          }),
        // likedPlaces만 업데이트
        setLikedPlaces: (likedPlaces) =>
          set((state) => {
            if (state.promiseDataFromServer) {
              state.promiseDataFromServer.likedPlaces = likedPlaces;
            }
          }),
      },
    })),
  ),
);

export default promiseDataFromServerStore;
