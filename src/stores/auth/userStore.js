import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const userStore = create()(
  devtools(
    persist(
      immer((set) => ({
        userId: null,
        userName: '',
        fixedSchedules: [],
        promises: {
          create: [],
          join: [],
        },
        userType: '', // 'create' | 'join'
        actions: {
          setUserId: (userId) =>
            set((state) => {
              state.userId = userId;
            }),
          setUserName: (name) =>
            set((state) => {
              state.userName = name;
            }),
          setFixedSchedules: (schedules) =>
            set((state) => {
              // "09:00" -> { hour: "09", minute: "00" } 형식으로 변환
              state.fixedSchedules = schedules.map((schedule) => ({
                ...schedule,
                startTime: {
                  hour: schedule.startTime.split(':')[0],
                  minute: schedule.startTime.split(':')[1],
                },
                endTime: {
                  hour: schedule.endTime.split(':')[0],
                  minute: schedule.endTime.split(':')[1],
                },
              }));
            }),
          setPromises: (promises) =>
            set((state) => {
              state.promises = promises;
            }),
          setUserType: (userType) =>
            set((state) => {
              state.userType = userType;
            }),
          clearUser: () =>
            set((state) => {
              state.userId = null;
              state.userName = null;
              state.fixedSchedules = [];
              state.promises = { create: [], join: [] };
            }),
        },
      })),
      {
        name: 'user-storage', // localStorage에 저장될 키 이름
        partialize: (state) => ({
          userId: state.userId,
          userName: state.userName,
          promises: state.promises,
        }),
      },
    ),
  ),
);

export default userStore;
