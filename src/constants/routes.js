export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',

  // 약속 생성 관련
  PROMISE_CREATE_INFO: '/promise/create/info', // 기본 정보 입력
  PROMISE_CREATE_DATE: '/promise/create/date', // 날짜 선택
  PROMISE_CREATE_LOCATION: '/promise/create/location', // 주최자의 위치 입력
  PROMISE_CREATE_SCHEDULE: '/promise/create/schedule', // 주최자의 시간대 입력
  PROMISE_FINALIZE: '/promise/:promiseId/finalize', // 약속 확정

  // 공유 링크를 통해 접근하는 약속 참여 관련
  PROMISE_JOIN: '/promise/:promiseId/join', // 참여자 회원가입/이름 등록
  PROMISE_LOCATION: '/promise/:promiseId/location', // 참여자의 위치 입력
  PROMISE_SCHEDULE: '/promise/:promiseId/schedule', // 참여자의 시간대 입력
  PROMISE_RESULT: '/promise/:promiseId/result', // 모든 참여자 입력 후 추천 장소, 좋아요

  // 공통
  PROMISE_SUMMARY: '/promise/:promiseId/summary', // 약속 확정 후 요약 정보

  // 유저
  USER: '/user',
  ENTER_SCHEDULE: '/user/enter-schedule',
  NOT_FOUND: '*',
};

export const BUILD_ROUTES = {
  PROMISE_CREATE: (step) => `/promise/create/${step}`,
  PROMISE_JOIN: (id) => `/promise/${id}/join`,
  PROMISE_LOCATION: (id) => `/promise/${id}/location`,
  PROMISE_SCHEDULE: (id) => `/promise/${id}/schedule`,
  PROMISE_RESULT: (id) => `/promise/${id}/result`,
  PROMISE_FINALIZE: (id) => `/promise/${id}/finalize`,
  PROMISE_SUMMARY: (id) => `/promise/${id}/summary`,
};
