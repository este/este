// @flow
import Document, { Head, Main, NextScript } from 'next/document';
import { getRenderer } from '../lib/fela';

// Only modern CSS subset with React Native emulation.
// https://github.com/zeit/next.js/wiki/Global-styles-and-layouts
// https://github.com/necolas/normalize.css
const globalStyle = `
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  * {
    box-sizing: border-box;
    ${/* Reset body and form fields margin in Firefox and Safari. */ ''}
    margin: 0;
    ${/* Reset padding just to be sure. */ ''}
    padding: 0;
    ${/* Enforce React Native default border width. */ ''}
    border-width: 0;
  }
  button {
    ${/* Reset default background color. */ ''}
    background-color: transparent;
    ${/* Should be default. */ ''}
    cursor: pointer;
    ${/* Not supported in React Native. */ ''}
    outline: none;
  }
  button[disabled] {
    cursor: default;
  }
`;

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
        {/* yarn run favicon */}
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/manifest.json" />
          <link
            rel="mask-icon"
            href="/static/favicons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/static/favicons/favicon.ico" />
          <meta
            name="msapplication-config"
            content="/static/favicons/browserconfig.xml"
          />
          <meta
            name="viewport"
            // kihlstrom.com/2015/shrink-to-fit-no-fixes-zoom-problem-in-ios-9
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <style dangerouslySetInnerHTML={{ __html: globalStyle }} />
          <style dangerouslySetInnerHTML={{ __html: css }} id="fela-style" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
