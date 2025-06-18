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
              state.nearestSubwayStation = value;
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
