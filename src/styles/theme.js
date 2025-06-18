import mediaQuery from './mediaQuery';

export const theme = {
  color: {
    main: '#40B59F',
    point1: '#164B4C',
    point2: '#497E64',
    white: '#ffffff',
    skyBlue: '#E9F1FF',
    disabled: '#949494',
    error: '#FF4646',
    text: {
      blue: '#002055',
      black: '#555555',
      grey: '#848A94',
    },
  },
  ...mediaQuery,
};
