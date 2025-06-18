import { TriggerBtn } from '../style';
import PropTypes from 'prop-types';
import { useTabsInfo, useTabsActions } from '@/hooks/stores/ui/useTabsStore';
import matchIcon from '@/utils/matchIcon.jsx';

/**
 * Trigger 컴포넌트
 *
 * @param {string} value - 탭의 값
 * @param {string} label - 사용자에게 보여질 라벨 텍스트
 * @param {function} [onClick] - 탭 클릭 시 실행될 콜백 함수
 */
const Trigger = ({ value, label, onClick }) => {
  const { selectedValue, option } = useTabsInfo();
  const { setSelectedValue } = useTabsActions();
  const isActive = selectedValue === value;

  const onSelect = () => {
    setSelectedValue(value);
    if (onClick) onClick();
  };

  return (
    <TriggerBtn
      id={`${option}-trigger-${value}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`${option}-panel-${value}`}
      onClick={onSelect}
      $isActive={isActive}
    >
      {matchIcon(value)}
      {label}
    </TriggerBtn>
  );
};

Trigger.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Trigger;
