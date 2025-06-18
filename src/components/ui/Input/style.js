import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import PlusIconSvg from '@/assets/img/icon/plus.svg?react';
import MinusIconSvg from '@/assets/img/icon/minus.svg?react';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  height: ${({ $height }) => $height};

  label {
    margin-left: 4px;
    font-size: 14px;
    color: ${theme.color.text.grey};
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  border: 1px solid ${({ $hasError }) => ($hasError ? theme.color.error : theme.color.skyBlue)};
  border-radius: 15px;

  line-height: 24px;
  color: ${theme.color.black};

  &::placeholder {
    color: ${theme.color.text.grey};
  }

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? theme.color.error : theme.color.main)};
    outline: none;
  }
`;

export const ErrorMessage = styled.p`
  margin: -5px 0 0 6px;
  font-size: 12px;
  color: ${theme.color.error};
`;

export const NumberInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const NumberInputButton = styled.button`
  cursor: pointer;
  user-select: none;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 100%;
  border: none;

  color: ${theme.color.text.blue};

  background: none;

  &:disabled {
    cursor: not-allowed;
    color: ${theme.color.disabled};
  }

  &.decrease {
    left: 2px;
    border-right: 1px solid ${theme.color.skyBlue};
  }

  &.increase {
    right: 2px;
    border-left: 1px solid ${theme.color.skyBlue};
  }
`;

const iconStyle = css`
  width: 15px;
  height: 15px;
`;
export const MinusIcon = styled(MinusIconSvg)`
  ${iconStyle}
`;
export const PlusIcon = styled(PlusIconSvg)`
  ${iconStyle}
`;

export const NumberInput = styled(Input)`
  cursor: default;
  text-align: center;

  /* 숫자 조절 버튼 숨기기 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    appearance: none;
  }

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? theme.color.error : theme.color.skyBlue)};
    outline: none;
  }
`;
