// @flow
import { useContext } from 'react';
import ThemeContext from '../components/core/ThemeContext';
import type { Theme } from '../themes/types';

export default function useTheme(): Theme {
  return useContext(ThemeContext);
}
