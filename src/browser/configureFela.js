// @flow
import placeholderPrefixer from 'fela-plugin-placeholder-prefixer';
import validator from 'fela-plugin-validator';
import webPreset from 'fela-preset-web';
import { createRenderer } from 'fela';

const staticStyles = `
  ${/*
    Selected rules from necolas.github.io/normalize.css/5.0.0/normalize.css
    I removed obsolete and normalizing stuff because we need only fixes.
  */ ''}
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
  }
  a {
    -webkit-text-decoration-skip: objects;
  }
  button,
  input {
    overflow: visible;
  }
  button,
  html [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }
  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  textarea {
    overflow: auto;
  }
  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }
  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  [type="search"]::-webkit-search-cancel-button,
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  ${/*
    Selected rules from github.com/twbs/bootstrap/blob/v4-dev/scss/_reboot.scss
  */ ''}
  html {
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  html {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  [tabindex="-1"]:focus {
    outline: none !important;
  }
  [role="button"] {
    cursor: pointer;
  }
  a,
  area,
  button,
  [role="button"],
  input,
  label,
  select,
  summary,
  textarea {
    touch-action: manipulation;
  }
  input[type="date"],
  input[type="time"],
  input[type="datetime-local"],
  input[type="month"] {
    -webkit-appearance: listbox;
  }
  textarea {
    resize: none;
  }
  input[type="search"] {
    -webkit-appearance: none;
  }
`;

const devPreset = [
  validator({
    logInvalid: true,
    deleteInvalid: true,
  }),
];

const configureFela = () => {
  const renderer = createRenderer({
    plugins: [
      placeholderPrefixer(),
      ...webPreset,
      ...(process.env.NODE_ENV !== 'production' ? devPreset : []),
    ],
  });
  renderer.renderStatic(staticStyles);
  return renderer;
};

export default configureFela;
