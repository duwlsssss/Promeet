import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// 약속 생성시 사용할 데이터
const initialState = {
  name: '',
  description: '',
  memberCnt: 2,
  availableTimes: [],
  nearestSubwayStation: {
    address: '',
    name: '',
    position: {
      Ma: 0,
      La: 0,
    },
  },
  selectedPlace: null,
};

const promiseDataStore = create()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,
        actions: {
          // 약속 정보 입력시 저장할 것들
          setName: (name) =>
            set((state) => {
              state.name = name;
            }),
          setDescription: (description) =>
            set((state) => {
              state.description = description;
            }),
          setMemberCnt: (memberCnt) =>
            set((state) => {
              state.memberCnt = memberCnt;
            }),
          setAvailableTimes: (availableTimes) =>
            set((state) => {
              state.availableTimes = availableTimes;
            }),
          setNearestSubwayStation: (value) =>
            set((state) => {
              let backendId = value.name;

              if (value.name) {
                // "역"이라는 글자를 먼저 제거하고 공백을 기준으로 나눔
                const cleanName = value.name.replace(/역/g, '').trim();
                const parts = cleanName.split(' ');

                if (parts.length >= 2) {
                  const name = parts[0]; // "신림" 또는 "서울대벤처타운"

                  // 뒤에 붙은 "호선" 또는 "선"을 제거합니다.
                  // "2호선" -> "2", "신림선" -> "신림", "경의중앙선" -> "경의중앙"
                  const line = parts[1].replace(/(호선|선)$/, '');

                  backendId = `${name}_${line}`; // "신림_2", "서울대벤처타운_신림"

                  // 상태 업데이트
                  state.nearestSubwayStation = {
                    ...value,
                    originName: value.name,
                    name: name,
                    line: line,
                    id: backendId,
                  };
                }
              }
            }),
          // 생성자가 선택하는 약속 장소
          setSelectedPlace: (place) =>
            set((state) => {
              state.selectedPlace = place;
            }),
          // 특정 단계까지의 데이터가 있는지 체크
          hasDataUntil: (step) => {
            const state = get();
            const InfoState = !!state.name && !!state.description;
            switch (step) {
              case 'date':
                return InfoState;
              case 'location':
                return InfoState && !!state.availableTimes.length;
              case 'schedule':
                return (
                  InfoState && !!state.availableTimes.length && !!state.nearestSubwayStation.name
                );
              default:
                return false;
            }
          },
          hasNearestSubwayStationData: () => !!get().nearestSubwayStation.name,

          // 모든 데이터 초기화
          resetPromiseData: () => set(initialState),
        },
      })),
      {
        name: 'promise-form-data',
        partialize: (state) => ({
          name: state.name,
          description: state.description,
          memberCnt: state.memberCnt,
          availableTimes: state.availableTimes,
          nearestSubwayStation: state.nearestSubwayStation,
          selectedPlace: state.selectedPlace,
        }),
      },
    ),
  ),
);

export default promiseDataStore;
