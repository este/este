// @flow
/* eslint-env browser */
import * as React from 'react';
import App, { Container } from 'next/app';
import { IntlProvider, addLocaleData } from 'react-intl';
import { type GraphQLTaggedNode } from 'react-relay';

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

type NextContext = {|
  req: ?Object,
|};

type AppContext<GraphQLQuery, URLQuery> = {|
  ...NextContext,
  fetch: (
    query: GraphQLTaggedNode,
    ?(urlQuery: URLQuery) => $ElementType<GraphQLQuery, 'variables'>,
  ) => Promise<$ElementType<GraphQLQuery, 'response'>>,
|};

// Because state belongs to own component or Relay.
// https://flow.org/en/docs/react/types/#toc-react-statelessfunctionalcomponent
export type PageWithQuery<GraphQLQuery, URLQuery: ?Object = {}> = {
  <Props: {| data: $ElementType<GraphQLQuery, 'response'> |}>(
    props: Props,
  ): React.Node,
  getInitialProps?: (
    AppContext<GraphQLQuery, URLQuery>,
  ) => Promise<{| data: $ElementType<GraphQLQuery, 'response'> |}>,
};

type InitialProps = {|
  Component: React.ComponentType<Object>,
  router: Object,
  ctx: AppContext<Object, Object>,
|};

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }: InitialProps) {
    let pageProps = {};

    // $FlowFixMe Idk how to type component static method.
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx;
    const { locale, messages } =
      // eslint-disable-next-line no-underscore-dangle
      req || window.__NEXT_DATA__.props;

    return { pageProps, locale, messages };
  }

  // componentDidCatch(error, errorInfo) {
  //   console.log('CUSTOM ERROR HANDLING', error);
  //   // This is needed to render errors correctly in development / production
  //   super.componentDidCatch(error, errorInfo);
  // }

  render() {
    const { Component, pageProps, locale, messages } = this.props;
    const now = Date.now();

    return (
      <Container>
        <IntlProvider
          locale={locale}
          messages={messages}
          initialNow={now}
          // https://github.com/yahoo/react-intl/issues/999#issuecomment-335799491
          textComponent={React.Fragment}
        >
          {/* <Co> */}
          <Component {...pageProps} />
          {/* </Co> */}
        </IntlProvider>
      </Container>
    );
  }
}

export default MyApp;
