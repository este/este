import Document, {
  Head,
  Main,
  NextDocumentContext,
  NextScript,
} from 'next/document';
import React from 'react';
import { AppRegistry } from 'react-native';

// Force Next-generated DOM elements to fill their parent's height.
// Disable input and textarea outline because blinking caret is enough.
// https://github.com/necolas/react-native-web/blob/master/docs/guides/client-side-rendering.md
const globalStyles = `
  #__next{display:flex;flex-direction:column;height:100%}
  input,textarea{outline:none}
  body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
`;

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }: NextDocumentContext) {
    AppRegistry.registerComponent('Main', () => Main);
    // @ts-ignore getApplication is React Native Web addition for SSR.
    const { getStyleElement } = AppRegistry.getApplication('Main');
    const page = renderPage();
    const styles = [
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} key="styles" />,
      getStyleElement(),
    ];
    return { ...page, styles: React.Children.toArray(styles) };
  }

  render() {
    return (
      <html style={{ height: '100%' }}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body
          style={{
            height: '100%',
            // overflow hidden disables browser scroll momentum, which is not
            // supported in ScrollView yet.
            // overflow: 'hidden',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
