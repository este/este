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
          <meta
            name="viewport"
            // kihlstrom.com/2015/shrink-to-fit-no-fixes-zoom-problem-in-ios-9
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <style>
            {/*
              - github.com/zeit/next.js/wiki/Global-styles-and-layouts
              - github.com/twbs/bootstrap/blob/v4-dev/scss/_reboot.scss
            */}
            {`
              html {
                box-sizing: border-box;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
              }
              body {
                margin: 0;
              }
              *,
              *::before,
              *::after {
                box-sizing: inherit;
              }`}
          </style>
          <style
            dangerouslySetInnerHTML={{ __html: css }}
            id="fela-stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
