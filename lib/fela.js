// @flow
import placeholderPrefixer from 'fela-plugin-placeholder-prefixer';
import webPreset from 'fela-preset-web';
import { createRenderer } from 'fela';

const renderer = createRenderer({
  plugins: [placeholderPrefixer(), ...webPreset],
});

export const getRenderer = () => renderer;

export const getMountNode = () => {
  if (typeof window !== 'undefined') {
    return window.document.getElementById('fela-stylesheet');
  }
  return undefined;
};
