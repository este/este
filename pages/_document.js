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
