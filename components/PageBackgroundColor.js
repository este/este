// @flow
import * as React from 'react';
import Head from 'next/head';

type PageBackgroundColorProps = {|
  color: string,
|};

const PageBackgroundColor = ({ color }: PageBackgroundColorProps) => (
  <div>
    <Head>
      <meta name="theme-color" content={color} />
    </Head>
    <style jsx global>{`
      html {
        background-color: ${color};
      }
    `}</style>
  </div>
);

export default PageBackgroundColor;
