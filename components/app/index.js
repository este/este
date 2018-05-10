// @flow
/* eslint-env browser */
import * as React from 'react';
import createRelayEnvironment from './createRelayEnvironment';
import { IntlProvider, addLocaleData } from 'react-intl';
import {
  // $FlowFixMe Wrong libdef.
  fetchQuery,
  type GraphQLTaggedNode,
  type Environment,
} from 'react-relay';
import { getCookie } from './cookie';
import LocaleContext from '../core/LocaleContext';
import SupportedLocalesContext from '../core/SupportedLocalesContext';
import { MutationProvider } from '../core/Mutation';
import ErrorContext from '../core/ErrorContext';
import RelayProvider from '../core/RelayProvider';

// https://github.com/facebook/relay/issues/2347
// const { installRelayDevTools } = require('relay-devtools');
// installRelayDevTools();

// Polyfill browser stuff.
// $FlowFixMe It's fine.
if (process.browser === true) {
  // Add locale data injected in pages/_document.js
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

type PageProps = {|
  data: Object,
|};

type AppProps = {|
  token: ?string,
  data: Object,
  initialNow: number,
  locale: string,
  messages: Object,
  records: Object,
  supportedLocales: Array<string>,
|};

type AppState = {|
  environment: Environment,
|};

// TODO: https://github.com/este/este/issues/1524
const app = (
  // The page is stateless because the state belongs to GraphQL or into another component.
  Page: React.StatelessFunctionalComponent<PageProps>,
  options?: {|
    query?: GraphQLTaggedNode,
  |},
) => {
  const { query } = options || {};

  class App extends React.PureComponent<AppProps, AppState> {
    static async getInitialProps(context: {
      pathname: string,
      query: Object,
      asPath: string,
      req: ?{
        ...http$IncomingMessage,
        locale: string,
        localeDataScript: string,
        messages: Object,
        supportedLocales: Array<string>,
      },
      res: ?http$ServerResponse,
      jsonPageRes: Object,
      err: Object,
    }) {
      const cookie = getCookie(context.req);
      const token = cookie && cookie.token;
      const initialNow = Date.now();

      let data = {};
      let records = {};

      if (query) {
        const environment = createRelayEnvironment(token);
        data = await fetchQuery(environment, query, context.query);
        records = environment
          .getStore()
          .getSource()
          .toJSON();
      }

      const { locale, messages, supportedLocales } =
        // eslint-disable-next-line no-underscore-dangle
        context.req || window.__NEXT_DATA__.props.pageProps;

      return ({
        token,
        data,
        initialNow,
        locale,
        messages,
        records,
        supportedLocales,
      }: AppProps);
    }

    state = {
      environment: createRelayEnvironment(this.props.token, this.props.records),
    };

    static getDerivedStateFromProps(nextProps: AppProps, prevState: AppState) {
      return ({
        environment: createRelayEnvironment(nextProps.token, nextProps.records),
      }: AppState);
    }

    render() {
      const {
        token,
        data,
        initialNow,
        locale,
        messages,
        records,
        supportedLocales,
      } = this.props;

      return (
        <IntlProvider
          locale={locale}
          messages={messages}
          initialNow={initialNow}
          // https://github.com/yahoo/react-intl/issues/999#issuecomment-335799491
          textComponent={React.Fragment}
        >
          {/* <ErrorContext.Provider value={this.state.error}> */}
          <LocaleContext.Provider value={locale}>
            <SupportedLocalesContext.Provider value={supportedLocales}>
              <MutationProvider value={this.state.environment}>
                <RelayProvider environment={this.state.environment}>
                  <Page data={data} />
                </RelayProvider>
              </MutationProvider>
            </SupportedLocalesContext.Provider>
          </LocaleContext.Provider>
          {/* </ErrorContext.Provider> */}
        </IntlProvider>
      );
    }
  }

  return App;
};

export default app;
