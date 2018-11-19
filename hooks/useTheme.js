// @flow
import { useContext } from 'react';
import ThemeContext from '../components/core/ThemeContext';

export default function useTheme() {
  return useContext(ThemeContext);
}
