import Document, {
  Head,
  Main,
  NextDocumentContext,
  NextScript,
} from 'next/document';
import React from 'react';
import { AppRegistry } from 'react-native';

// https://github.com/zeit/next.js/tree/canary/examples/with-react-native-web

// https://github.com/necolas/react-native-web/blob/master/docs/guides/web-recipes.md
// Disable input and textarea outline because blinking caret is good enough.
// Improve font smoothing.
const globalStyles = `
  html,body{height:100%}
  body{overflow:hidden}
  #__next{display:flex;flex-direction:column;height:100%}
  input,textarea{outline:none}
  body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
`;

// eslint-disable-next-line import/no-default-export
export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }: NextDocumentContext) {
    AppRegistry.registerComponent('Main', () => Main);
    // @ts-ignore getApplication is React Native Web addition for SSR.
    const { getStyleElement } = AppRegistry.getApplication('Main');
    const page = renderPage();
    const styles = [
      // eslint-disable-next-line react/no-danger
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} key="styles" />,
      getStyleElement(),
    ];
    return { ...page, styles: React.Children.toArray(styles) };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* https://favicon.io/favicon-generator/ */}
          {/* Lemonada, #228be6, transparent */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
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
