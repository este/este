// @flow
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import felaRenderer from '../lib/felaRenderer';
import { renderToSheetList } from 'fela-dom';

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
    ${/* Reset user agent default style. */ ''}
    text-decoration: none;
  }
  ${/*
    https://stackoverflow.com/questions/2781549/removing-input-background-colour-for-chrome-autocomplete/32505530#32505530
  */ ''}
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
      -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
      -webkit-transition-delay: 9999s;
  }
`;

export default class MyDocument extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { req: { locale, localeDataScript, supportedLocales } } = context;
    const sheetList = renderToSheetList(felaRenderer);
    felaRenderer.clear();
    return {
      ...props,
      locale,
      localeDataScript,
      supportedLocales,
      sheetList,
    };
  }

  render() {
    const {
      locale,
      localeDataScript,
      supportedLocales,
      sheetList,
    } = this.props;

    const styleNodes = sheetList.map(({ type, media, css }) => (
      <style
        dangerouslySetInnerHTML={{ __html: css }}
        data-fela-type={type}
        key={`${type}-${media}`}
        media={media}
      />
    ));
    const alternateHreflangLinks = supportedLocales.map(locale => (
      <link
        href={`https://${locale}.${HOSTNAME}`}
        hrefLang={locale}
        key={locale}
        rel="alternate"
      />
    ));

    return (
      <html lang={locale}>
        <Head>
          {/* yarn run favicon */}
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
            // http://kihlstrom.com/2015/shrink-to-fit-no-fixes-zoom-problem-in-ios-9/
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {alternateHreflangLinks}
          <style dangerouslySetInnerHTML={{ __html: globalStyle }} />
          {styleNodes}
        </Head>
        <body>
          <Main />
          {/* Polyfill Intl API for older browsers. Only for old Safari end Android. */}
          {/* <script
            src={`https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${locale}`}
          /> */}
          <script dangerouslySetInnerHTML={{ __html: localeDataScript }} />
          <NextScript />
        </body>
      </html>
    );
  }
}
