// @flow
import createReactContext, { type Context } from 'create-react-context';
import type { Theme } from '../themes/types';
import { browserThemeDark } from '../themes/browserTheme';

type Value = Theme;

const value = browserThemeDark;

const ThemeContext: Context<Value> = createReactContext(value);

export const ThemeProvider = ThemeContext.Provider;

export default ThemeContext.Consumer;
