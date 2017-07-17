// @flow
import placeholderPrefixer from 'fela-plugin-placeholder-prefixer';
import webPreset from 'fela-preset-web';
import { createRenderer } from 'fela';

const felaRenderer = createRenderer({
  plugins: [placeholderPrefixer(), ...webPreset],
});

export default felaRenderer;
