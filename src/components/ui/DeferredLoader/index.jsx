import * as S from './style';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Loader = ({ text = '' }) => {
  return (
    <S.Loader role="status" aria-live="polite" aria-busy="true" aria-label="로더">
      <S.LoaderTextWrapper>
        <S.LoaderText>로딩 중...</S.LoaderText>
        {text.length > 0 && <S.LoaderText>{text}</S.LoaderText>}
      </S.LoaderTextWrapper>
    </S.Loader>
  );
};

Loader.propTypes = {
  text: PropTypes.string,
};

/**
 * DeferredLoader 컴포넌트
 *
 * @param {string} [text=''] - 로딩 상세 메시지
 */
const DeferredLoader = ({ text = '' }) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 setIsDeferred 호출
    const timer = setTimeout(() => {
      setIsDeferred(true);
    }, 500);

    // 클린업 함수로 타이머 정리
    return () => clearTimeout(timer);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <Loader text={text} />;
};

DeferredLoader.propTypes = {
  text: PropTypes.string,
};

export default DeferredLoader;
