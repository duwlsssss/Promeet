import toastStore from '@/stores/ui/toastStore';

const toast = (message) => {
  const store = toastStore.getState();
  // 이미 토스트가 표시 중이라면 새로운 요청 무시
  if (store.isOpen) {
    return;
  }
  store.actions.show(message);
};

// 토스트를 강제 종료하는 함수
export const closeToast = () => {
  const store = toastStore.getState();
  store.actions.close();
};

export default toast;
