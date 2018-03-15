// @flow
import * as React from 'react';
import Head from 'next/head';

type Props = {|
  color: string,
|};

class PageBackgroundColor extends React.PureComponent<Props> {
  render() {
    const { color } = this.props;
    return (
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
  }
}

export default PageBackgroundColor;
