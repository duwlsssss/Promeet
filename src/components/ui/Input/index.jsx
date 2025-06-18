import * as S from './style';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

const FormInput = ({ label, id, name, height, control, showError, ...props }) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    ...props,
  });

  return (
    <S.InputWrapper $height={height}>
      {label && <label htmlFor={id}>{label}</label>}
      <S.Input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        $hasError={showError && error}
        autoComplete="off"
        spellCheck="false"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {showError && error?.message && (
        <S.ErrorMessage id={`${id}-error`} role="alert" aria-live="polite">
          {error.message}
        </S.ErrorMessage>
      )}
    </S.InputWrapper>
  );
};

const BasicInput = ({ label, id, height, error, showError, ...props }) => {
  return (
    <S.InputWrapper $height={height}>
      {label && <label htmlFor={id}>{label}</label>}
      <S.Input
        id={id}
        name={name}
        $hasError={showError && error}
        autoComplete="off"
        spellCheck="false"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {showError && error && (
        <S.ErrorMessage id={`${id}-error`} role="alert" aria-live="polite">
          {error}
        </S.ErrorMessage>
      )}
    </S.InputWrapper>
  );
};

const NumberFormInput = ({ label, id, name, height, control, min = 2, max = 10, ...props }) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    ...props,
  });

  const handleDecrease = () => {
    const newValue = Number(value) - 1;
    if (newValue >= min) onChange(newValue); // 범위 안에서만 업데이트
  };

  const handleIncrease = () => {
    const newValue = Number(value) + 1;
    if (newValue <= max) onChange(newValue);
  };

  return (
    <S.InputWrapper $height={height}>
      {label && <label htmlFor={id}>{label}</label>}
      <S.NumberInputWrapper>
        <S.NumberInputButton
          type="button"
          className="decrease"
          onClick={handleDecrease}
          disabled={Number(value) <= min}
          aria-label="감소"
        >
          <S.MinusIcon />
        </S.NumberInputButton>
        <S.NumberInput
          id={id}
          name={name}
          type="number"
          value={value}
          $hasError={error}
          min={min}
          max={max}
          readOnly
          tabIndex={-1}
          autoComplete="off"
          spellCheck="false"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        <S.NumberInputButton
          type="button"
          className="increase"
          onClick={handleIncrease}
          disabled={Number(value) >= max}
          aria-label="증가"
        >
          <S.PlusIcon />
        </S.NumberInputButton>
      </S.NumberInputWrapper>
      {error?.message && (
        <S.ErrorMessage id={`${id}-error`} role="alert" aria-live="polite">
          {error.message}
        </S.ErrorMessage>
      )}
    </S.InputWrapper>
  );
};

/**
 * Input 컴포넌트
 * @param {string} [label] - input 설명 라벨 (선택)
 * @param {string} [id] - input id (label이 있을 때만 필수)
 * @param {boolean} [useForm=false] - react-hook-form 사용 여부
 * @param {string} [height='100px'] - lable, input, errorMessage 포함 높이 지정
 * @param {boolean} [isNumber=false] - 숫자 입력 필드 여부
 * @param {number} [min=2] - 최소값 (isNumber=true일 때)
 * @param {number} [max=10] - 최대값 (isNumber=true일 때)
 * @param {string} [showError] - 에러 표시 여부 (사용자가 입력 시작했을때만)
 * @param {string} [error] - 에러 메시지 (useForm=false일 때)
 */
const Input = ({
  useForm = false,
  height = '100px',
  error,
  showError,
  isNumber = false,
  min,
  max,
  ...props
}) => {
  if (useForm) {
    if (isNumber) {
      return (
        <NumberFormInput height={height} min={min} max={max} showError={showError} {...props} />
      );
    }
    return <FormInput height={height} showError={showError} {...props} />;
  }

  return <BasicInput error={error} showError={showError} height={height} {...props} />;
};

FormInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  height: PropTypes.string,
  control: PropTypes.object.isRequired,
  showError: PropTypes.bool,
};

NumberFormInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  height: PropTypes.string,
  control: PropTypes.object.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  showError: PropTypes.bool,
};

BasicInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  height: PropTypes.string,
  error: PropTypes.string.isRequired,
  showError: PropTypes.bool,
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  useForm: PropTypes.bool,
  height: PropTypes.string,
  error: PropTypes.string,
  showError: PropTypes.bool,
  isNumber: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default Input;
