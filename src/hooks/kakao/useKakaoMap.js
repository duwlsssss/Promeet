import { useState, useEffect } from 'react';

// 카카오맵 스크립트 로드 함수
const loadKakaoMapScript = () => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps && typeof window.kakao.maps.load === 'function') {
      resolve(window.kakao);
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JS_KEY}&autoload=false&libraries=services,clusterer,drawing`;
    script.async = true;
    script.onload = () => resolve(window.kakao);
    script.onerror = () => reject(new Error('[카카오맵 스크립트 로드 실패]'));
    document.head.appendChild(script);
  });
};

const useKakaoMap = () => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadKakaoMapScript()
      .then((kakao) => {
        kakao.maps.load(() => {
          setReady(true);
        });
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return { ready, error };
};

export default useKakaoMap;
