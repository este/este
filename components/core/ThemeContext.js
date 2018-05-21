// @flow
import * as React from 'react';
import { lightTheme } from '../../themes/theme';

export type Theme = typeof lightTheme;

const ThemeContext = React.createContext(lightTheme);

export default ThemeContext;
