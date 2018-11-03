// @flow
/* eslint-env browser */
import * as React from 'react';
import App, { Container } from 'next/app';
import { IntlProvider, addLocaleData } from 'react-intl';
import { type GraphQLTaggedNode } from 'react-relay';
import type { ServerProps, AppReq } from '../server/web';
import { getCookie } from '../browser/cookie';
import createRelayEnvironment from '../client/createRelayEnvironment';
import { fetchQuery } from 'relay-runtime';
import LocaleContext from '../components/core/LocaleContext';
import EnvironmentContext from '../components/core/EnvironmentContext';
import ErrorContext, {
  type ContextError,
} from '../components/core/ErrorContext';
import RelayProvider from '../components/core/RelayProvider';
// $FlowFixMe Wrong libdef.
import Error from 'next/error';

type RelayRecords = Object;

type InitialProps = {|
  ...ServerProps,
  initialNow: number,
  token: ?string,
  // Optional and mixed because componentGetInitialProps can fail.
  pageProps: { data?: mixed },
  records: RelayRecords,
  // That's all we support for now. It's good enough.
  statusCode: null | 404,
|};

type Props = {|
  ...InitialProps,
  Component: React.StatelessFunctionalComponent<
    $ElementType<InitialProps, 'pageProps'>,
  >,
|};

type State = {|
  errorContext: {
    error: ?ContextError,
    dispatchError: ContextError => void,
  },
|};

// req and res are optional because they are server only
type NextContext = {|
  req: ?AppReq,
  res: ?http$ServerResponse,
  query: Object,
|};

type Fetch<GraphQLQuery, URLQuery> = (
  query: GraphQLTaggedNode,
  ?(urlQuery: URLQuery) => $ElementType<GraphQLQuery, 'variables'>,
) => Promise<$ElementType<GraphQLQuery, 'response'>>;

type AppContext<GraphQLQuery, URLQuery> = {|
  ...NextContext,
  fetch: Fetch<GraphQLQuery, URLQuery>,
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

// Workaround to Flow type window.
const typedWindow: ?{
  ReactIntlLocaleData: { [string]: Object },
  // eslint-disable-next-line no-underscore-dangle
  __NEXT_DATA__: {
    props: InitialProps,
  },
} = typeof window !== 'undefined' ? window : null;

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typedWindow != null && typedWindow.ReactIntlLocaleData) {
  Object.keys(typedWindow.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(typedWindow.ReactIntlLocaleData[lang]);
  });
}

class MyApp extends App {
  static getIntlProps(req: ?AppReq) {
    // eslint-disable-next-line no-underscore-dangle
    const serverProps = typedWindow?.__NEXT_DATA__.props ?? req;
    if (serverProps == null) throw Error('missing serverProps');
    const { locale, supportedLocales, messages } = serverProps;
    // localeDataScript is empty because it's used only in _document.js
    return { locale, supportedLocales, messages, localeDataScript: '' };
  }

  static async getDataProps(
    ctx: NextContext,
    pageGetInitialProps: $ElementType<PageWithQuery<Object>, 'getInitialProps'>,
  ) {
    const token = getCookie(ctx.req)?.token;
    let pageProps = {};
    let records = {};
    let statusCode = null;

    if (pageGetInitialProps) {
      const fetch = async (graphQLQuery, mapUrlQueryToGraphQLVariables) => {
        // TODO: Should be persisted across pages, but let's wait for better
        // Relay implementation which is already in master.
        const environment = createRelayEnvironment({
          token,
          rejectErrors: true,
        });
        const graphQLVariables = mapUrlQueryToGraphQLVariables
          ? mapUrlQueryToGraphQLVariables(ctx.query)
          : ctx.query;
        let data = null;
        try {
          data = await fetchQuery(environment, graphQLQuery, graphQLVariables);
        } catch (errors) {
          // We don't care about errors yet, just render Next.js Error 404 and
          // set response status code. It's good enough for now.
          statusCode = 404;
          if (ctx.res) {
            // eslint-disable-next-line no-param-reassign
            ctx.res.statusCode = statusCode;
          }
        }
        records = environment
          .getStore()
          .getSource()
          .toJSON();
        return data;
      };

      pageProps = await pageGetInitialProps({ ...ctx, fetch });
    }

    return { token, pageProps, records, statusCode };
  }

  static async getInitialProps({
    Component,
    // router,
    ctx,
  }: {|
    Component: PageWithQuery<Object>,
    // router: Object,
    ctx: NextContext,
  |}): Promise<InitialProps> {
    const intlProps = MyApp.getIntlProps(ctx.req);
    const dataProps = await MyApp.getDataProps(ctx, Component.getInitialProps);

    return {
      ...intlProps,
      ...dataProps,
      initialNow: Date.now(),
    };
  }

  props: Props;
  state: State;

  state = {
    errorContext: {
      error: null,
      // https://reactjs.org/docs/context.html#updating-context-from-a-nested-component
      dispatchError: (error: ContextError) => {
        this.setState(state => {
          return { errorContext: { ...state.errorContext, error } };
        });
      },
    },
  };

  localeContext = {
    current: this.props.locale,
    supported: this.props.supportedLocales,
  };

  // componentDidCatch(error, errorInfo) {
  //   console.log('CUSTOM ERROR HANDLING', error);
  //   // This is needed to render errors correctly in development / production
  //   super.componentDidCatch(error, errorInfo);
  // }

  render() {
    if (this.props.statusCode != null) {
      // TODO: https://github.com/este/este/issues/1485
      return <Error statusCode={this.props.statusCode} />;
    }

    const {
      Component,
      token,
      records,
      pageProps,
      locale,
      messages,
      initialNow,
    } = this.props;

    // Must be created in render to get updated records from getInitialProps
    // on the same App instance. It happens when URL query is changed.
    // Probably remove once environment will be shared on the client after Relay
    // smarter fetch release.
    const environment = createRelayEnvironment({ token, records });

    return (
      <Container>
        {/* Still blocked by: FormattedRelative, RelayProvider, TouchableOpacity */}
        {/* <React.StrictMode> */}
        <IntlProvider
          locale={locale}
          messages={messages}
          initialNow={initialNow}
          // https://github.com/yahoo/react-intl/issues/999#issuecomment-335799491
          textComponent={React.Fragment}
        >
          <ErrorContext.Provider value={this.state.errorContext}>
            <LocaleContext.Provider value={this.localeContext}>
              <EnvironmentContext.Provider value={environment}>
                <RelayProvider environment={environment}>
                  <Component data={pageProps.data} />
                </RelayProvider>
              </EnvironmentContext.Provider>
            </LocaleContext.Provider>
          </ErrorContext.Provider>
        </IntlProvider>
        {/* </React.StrictMode> */}
      </Container>
    );
  }
}

export default MyApp;
