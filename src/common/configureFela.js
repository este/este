/* @flow */
// import logger from 'fela-plugin-logger';
import webPreset from 'fela-preset-web';
import validator from 'fela-plugin-validator';
import { createRenderer } from 'fela';

const browserStaticStyles = `
  * {
    ${/* Because box-sizing is not inherited. */''}
    box-sizing: border-box;
  }
  html {
    ${/* Tap highlight to be completely transparent in iOS. */''}
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    ${/* Prevent adjustments of font size after orientation changes in IE and iOS. */''}
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  body {
    ${/* Remove the margin in all browsers. */''}
    margin: 0;
  }
`;

const devPreset = [
  // // It's pretty verbose, but sometimes also pretty useful.
  // logger({
  //   logMetaData: false,
  // }),
  validator({
    logInvalid: true,
    deleteInvalid: true,
  }),
];

const configureFela = () => {
  const renderer = createRenderer({
    plugins: [
      ...webPreset,
      ...(process.env.NODE_ENV !== 'production' ? devPreset : []),
    ],
  });
  renderer.renderStatic(browserStaticStyles);
  return renderer;
};

export default configureFela;
