import { RestaurantIcon, CafeIcon, StudyCafeIcon, ActivityIcon } from '@/styles/IconStyles';

/**
 * value에 따라 아이콘 컴포넌트를 반환
 * @param {string} value - 탭의 값
 * @returns {JSX.Element|null}
 */
const iconMap = {
  restaurant: <RestaurantIcon />,
  cafe: <CafeIcon />,
  studyCafe: <StudyCafeIcon />,
  activity: <ActivityIcon />,
};

const matchIcon = (value) => iconMap[value] ?? null;

export default matchIcon;
