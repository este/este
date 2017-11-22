// @flow
import * as React from 'react';
import Head from 'next/head';

// - Emulate React Native
// - https://github.com/twbs/bootstrap/blob/v4-dev/scss/_reboot.scss

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
        -webkit-text-size-adjust: 100%;
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
