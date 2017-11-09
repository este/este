// @flow
import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(context: Object) {
    const props = await super.getInitialProps(context);
    const { req: { locale, localeDataScript, supportedLocales } } = context;
    return {
      ...props,
      locale,
      localeDataScript,
      supportedLocales,
    };
  }

  render() {
    const { locale, localeDataScript, supportedLocales } = this.props;

    return (
      <html lang={locale}>
        <Head>
          {supportedLocales.map(locale => (
            <link
              href={`https://${locale}.${HOSTNAME}`}
              hrefLang={locale}
              key={locale}
              rel="alternate"
            />
          ))}
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
