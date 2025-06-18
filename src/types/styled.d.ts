import 'styled-components';
import { Theme } from './theme';
import { FlattenSimpleInterpolation } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    color: {
      main: string,
      point1: string,
      point2: string,
      disabled: string,
      white: string,
      text: {
        blue: string,
        black: string,
        grey: string,
      },
    },
  }
}
