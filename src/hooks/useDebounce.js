import { useState, useEffect, useRef } from 'react';

/**
 * 입력값의 디바운스 처리를 위한 훅
 * @param {any} value - 디바운스 처리할 값
 * @param {number} delay - 디바운스 지연 시간 (ms)
 * @returns {any} 디바운스 처리된 값
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef(null);

  useEffect(() => {
    // 이전 타이머가 있다면 제거
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 새로운 타이머 설정
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
