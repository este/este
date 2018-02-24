// @flow
import * as React from 'react';
import createReactContext, { type Context } from 'create-react-context';
import type { Theme } from '../themes/types';
import { browserThemeDark } from '../themes/browserTheme';
import Button from './Button';

type Value = Theme;

const value = browserThemeDark;

const ThemeContext: Context<Value> = createReactContext(value);

export const ThemeProvider = ThemeContext.Provider;

export const ToggleTheme = () => (
  <Button primary outline size={-1} disabled>
    Dark theme
  </Button>
);

export default ThemeContext.Consumer;
