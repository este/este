// @flow
// $FlowFixMe
import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';
import type { Theme } from '../../themes/types';

export default function useTheme(): Theme {
  return useContext(ThemeContext);
}
