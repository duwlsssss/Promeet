import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';

const Card = ({ title, subtitle, dday, avatars = [] }) => {
  return (
    <S.Container>
      <S.BgMain />
      <S.LightEffect />

      <S.Title>{title}</S.Title>
      <S.Subtitle>{subtitle}</S.Subtitle>
      <S.Dday>{dday}</S.Dday>

      {avatars.map((src, i) => (
        <S.Avatar key={i} $left={25 + i * 21} src={src} alt={`user${i + 1}`} />
      ))}
    </S.Container>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  dday: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  avatars: PropTypes.array,
};

export default Card;
