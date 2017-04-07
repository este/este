// @flow
import Document, { Head, Main, NextScript } from 'next/document';
import { getRenderer } from '../lib/fela';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const renderer = getRenderer();
    const css = renderer.renderToString();
    renderer.clear();
    // TODO: Use next/example with-react-intl.
    const currentLocale = 'en';
    return { ...page, css, currentLocale };
  }

  render() {
    const { css, currentLocale } = this.props;

    return (
      <html lang={currentLocale}>
        <Head>
          <style>
            {//
            // Remove the margin in all browsers.
            // Set box-sizing to border-box so width is not affected by padding or border.
            // Prevent adjustments of font size after orientation changes.
            // Change the default tap highlight to be completely transparent in iOS.
            // github.com/zeit/next.js/wiki/Global-styles-and-layouts
            // github.com/twbs/bootstrap/blob/v4-dev/scss/_reboot.scss
            `
              body {
                margin: 0;
              }
              html {
                box-sizing: border-box;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
              }
              *,
              *::before,
              *::after {
                box-sizing: inherit;
              }
            `.replace(/\s/g, '')}
          </style>
          <style id="fela-stylesheet">{css}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
