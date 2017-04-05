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
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta
        name="viewport"
        // kihlstrom.com/2015/shrink-to-fit-no-fixes-zoom-problem-in-ios-9
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Head>
    <LoadingBar />
    <Header />
    {children}
  </div>
);

export default Page;
