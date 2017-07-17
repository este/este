// @flow
import type { IntlShape } from 'react-intl';
import type { Store, ServerState, FunctionalComponent } from '../types';
import React from 'react';
// import cookie from 'cookie';
import createReduxStore from '../lib/createReduxStore';
import felaRenderer from '../lib/felaRenderer';
import localForage from 'localforage';
import persistStore from '../lib/persistStore';
import uuid from 'uuid';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import { Provider as FelaProvider } from 'react-fela';
import { Provider as ReduxProvider } from 'react-redux';

// App composition root.
// http://blog.ploeh.dk/2011/07/28/CompositionRoot
// TODO: Make it multi-platform probably via app.ios.js and app.android.js
// TODO: Add Flow types.

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('smoothscroll-polyfill').polyfill();

  // Register React Intl's locale data for the user's locale in the browser.
  // This locale data was added to the page by `pages/_document.js`. This only
  // happens once, on initial page load in the browser.
  if (window.ReactIntlLocaleData) {
    Object.keys(window.ReactIntlLocaleData).forEach(lang => {
      addLocaleData(window.ReactIntlLocaleData[lang]);
    });
  }
}

const singletonOnClient = (create: Function) => {
  let singleton;
  return (...args) => {
    if (!process.browser) return create(...args);
    if (!singleton) singleton = create(...args);
    return singleton;
  };
};

// const getApolloClient: (getToken: {
//   getToken: () => string,
// }) => ApolloClient = singletonOnClient(({ getToken }) =>
//   createApolloClient({ getToken }),
// );

const getReduxStore: (
  serverState: ServerState,
) => Store = singletonOnClient(initialState => {
  const platformDependencies = { createUuid: uuid.v4 };
  return createReduxStore(initialState, { platformDependencies });
});

const renderApp = (IntlPage, reduxStore, locale, messages, initialNow, props) =>
  <ReduxProvider store={reduxStore}>
    <FelaProvider renderer={felaRenderer}>
      <IntlProvider locale={locale} messages={messages} initialNow={initialNow}>
        <IntlPage {...props} />
      </IntlProvider>
    </FelaProvider>
  </ReduxProvider>;

type PageProps = {
  // TODO: Waiting for Next.js 3 type definitions.
  url: {
    pathname: string,
  },
  intl: IntlShape,
};

type Page = FunctionalComponent<PageProps>;

// const parseCookie = (context = {}) =>
//   cookie.parse(
//     process.browser
//       ? document.cookie // eslint-disable-line
//       : (context.req && context.req.headers.cookie) || '',
//   );

const app = (Page: Page) => {
  const IntlPage = injectIntl(Page);
  // We need Class because we need a componentDidMount.
  // We need a componentDidMount because client state must be rendered after
  // the initial render, to prevent client and server HTML mismatch.
  return class App extends React.Component {
    static async getInitialProps(context) {
      // Evaluate the composed component's getInitialProps().
      let composedInitialProps = {};
      if (Page.getInitialProps) {
        composedInitialProps = await Page.getInitialProps(context);
      }

      // Get props from the request object on the server.
      const { req } = context;
      const { locale, messages, supportedLocales } =
        req || window.__NEXT_DATA__.props;

      // Always update the current time on page load/transition because the
      // <IntlProvider> will be a new instance even with pushState routing.
      const initialNow = Date.now();

      const serverState = {
        app: {
          baselineShown: false,
          darkEnabled: false,
          errors: null,
          name: APP_NAME,
          version: APP_VERSION,
          locale,
          defaultLocale: DEFAULT_LOCALE,
          supportedLocales,
        },
      };

      // // Run all graphql queries in the component tree and extract the result.
      // // TODO: https://github.com/apollographql/react-apollo/issues/631#issuecomment-312451587
      // if (!process.browser) {
      //   // TODO: Verify.
      //   // https://github.com/zeit/next.js/blob/d7d4b7c332a30b13ddf78ef45772a46ec52ac4de/examples/with-apollo-auth/lib/with-data.js#L42
      //   // if (context.res && context.res.finished) {
      //   //   // When redirecting, the response is finished.
      //   //   // No point in continuing to render
      //   //   return;
      //   // }
      //   const apolloClient = getApolloClient({
      //     getToken: () => parseCookie(context).token,
      //   });
      //   const reduxStore = getReduxStore(apolloClient, serverState);
      //
      //   // Provide the `url` prop data in case a graphql query uses it.
      //   const url = { query: context.query, pathname: context.pathname };
      //
      //   // Run all graphql queries.
      //   const app = renderApp(
      //     IntlPage,
      //     apolloClient,
      //     reduxStore,
      //     locale,
      //     messages,
      //     initialNow,
      //     {
      //       url,
      //       ...composedInitialProps,
      //     },
      //   );
      //   await getDataFromTree(app);
      //
      //   // Clear felaRenderer after every render because it's stateful.
      //   felaRenderer.clear();
      //
      //   // Extract query data from the reduxStore.
      //   const state = reduxStore.getState();
      //
      //   // No need to include other initial Redux state because when it
      //   // initialises on the client-side it'll create it again anyway.
      //   serverState = {
      //     ...serverState,
      //     apollo: {
      //       // Make sure to only include Apollo's data state
      //       data: state.apollo.data,
      //     },
      //   };
      // }

      return {
        ...composedInitialProps,
        initialNow,
        locale,
        messages,
        serverState,
      };
    }

    reduxStore: Store;

    constructor(props: any) {
      super(props);
      this.reduxStore = getReduxStore(props.serverState);
    }

    componentDidMount() {
      // Remember, componentDidMount is called only on the client-side.
      persistStore(this.reduxStore, localForage);
    }

    render() {
      const {
        initialNow,
        locale,
        messages,
        serverState,
        ...props
      } = this.props;
      return renderApp(
        IntlPage,
        this.reduxStore,
        locale,
        messages,
        initialNow,
        props,
      );
    }
  };
};

export default app;
