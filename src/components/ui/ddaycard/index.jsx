import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';

const getProgress = (dday, max = 10) => {
  const n = Number(String(dday).replace(/D-/, ''));
  return Math.max(0, Math.min(1, (max - n + 1) / max));
};

const AppointmentCard = ({ dday, label, left, top, size = 80 }) => {
  const isInviteOrProposal = dday === '초대됨' || dday === '제안함' || dday === '제안';
  const isPast = dday === '완료';
  const centerText = dday === '초대됨' ? '수락' : dday;
  const progress = isInviteOrProposal ? 0 : getProgress(dday, 10);

  // 위치 스타일 적용
  const style = {};
  if (left !== undefined) style.left = left;
  if (top !== undefined) style.top = top;
  if (left !== undefined || top !== undefined) style.position = 'absolute';

  // 지난 약속이면 회색 계열로 색상 변경
  const circleBg = isPast ? '#f2f3f5' : '#eaf1ff';
  const circleStroke = isPast ? '#b0b0b0' : isInviteOrProposal ? '#D1E2FE' : '#40b59f';
  const textColor = isPast ? '#b0b0b0' : undefined;
  const labelColor = isPast ? '#b0b0b0' : undefined;

  return (
    <S.CircleCard style={style}>
      <S.CircleProgressWrapper $size={size}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          style={{ marginTop: '10px', rotate: '-90deg' }}
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke={circleBg} strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={circleStroke}
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={isInviteOrProposal ? 0 : 2 * Math.PI * 45 * (1 - progress)}
            strokeLinecap="round"
          />
        </svg>
        <S.CircleCenterText $size={size} $color={textColor}>
          {centerText}
        </S.CircleCenterText>
      </S.CircleProgressWrapper>
      <S.CircleCardLabel $color={labelColor}>{label}</S.CircleCardLabel>
    </S.CircleCard>
  );
};

AppointmentCard.propTypes = {
  dday: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  left: PropTypes.number,
  top: PropTypes.number,
  size: PropTypes.number,
};

export default AppointmentCard;
