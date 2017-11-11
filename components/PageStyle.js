// @flow
import * as React from 'react';
import Head from 'next/head';

// Set html background-color and emulate React Native styles. Margin 0 is needed
// for body and some form fields according to normalize.css.

type PageStyleProps = {
  backgroundColor: string,
};

const PageStyle = ({ backgroundColor }: PageStyleProps) => (
  <div>
    <Head>
      <meta name="theme-color" content={backgroundColor} />
    </Head>
    <style jsx global>{`
      html {
        background-color: ${backgroundColor};
      }
      * {
        border-width: 0;
        box-sizing: border-box;
        margin: 0;
        text-decoration: none;
      }
    `}</style>
  </div>
);

export default PageStyle;
