// @flow
import Head from 'next/head';
import Header from './header';
import LoadingBar from '../components/loading-bar';

type PageProps = {|
  children?: any,
  title: string,
|};

const Page = ({ children, title }: PageProps) => (
  <div className="page">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <style jsx global>
      {
        `
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
          background: #eee;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        `
      }
    </style>
    <LoadingBar />
    <Header />
    {children}
  </div>
);

export default Page;
