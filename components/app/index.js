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
import MutationContext from '../core/MutationContext';
import ErrorContext from '../core/ErrorContext';
import RelayProvider from '../core/RelayProvider';
import type { Error } from '../../server/error';

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
  errorContext: {
    error: ?Error,
    dispatchError: Error => void,
  },
|};

type AppContext = {|
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
|};

// TODO: https://github.com/este/este/issues/1524
const app = (
  // The page is stateless because the state belongs to GraphQL or into another component.
  Page: React.StatelessFunctionalComponent<{| data: Object |}>,
  options?: {|
    query?: GraphQLTaggedNode,
  |},
) => {
  const { query } = options || {};

  class App extends React.PureComponent<AppProps, AppState> {
    static async getInitialProps(context: AppContext) {
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

    constructor(props: AppProps) {
      super(props);
      this.environment = createRelayEnvironment(props.token, props.records);
      this.localeContext = {
        current: props.locale,
        supported: props.supportedLocales,
      };
    }

    state = {
      errorContext: { error: null, dispatchError: this.dispatchError },
    };

    componentWillUnmount() {
      this.clearErrorShowTimeout();
    }

    clearErrorShowTimeout() {
      if (this.errorShowTimeoutID) clearTimeout(this.errorShowTimeoutID);
    }

    errorShowTimeoutID: ?TimeoutID;

    // https://reactjs.org/docs/context.html#updating-context-from-a-nested-component
    dispatchError = (error: Error) => {
      const { dispatchError } = this;
      this.setState({ errorContext: { error, dispatchError } }, () => {
        this.clearErrorShowTimeout();
        this.errorShowTimeoutID = setTimeout(() => {
          this.setState({ errorContext: { error: null, dispatchError } });
        }, 5000);
      });
    };

    environment: Environment;

    localeContext: { current: string, supported: Array<string> };

    render() {
      return (
        <IntlProvider
          locale={this.props.locale}
          messages={this.props.messages}
          initialNow={this.props.initialNow}
          // https://github.com/yahoo/react-intl/issues/999#issuecomment-335799491
          textComponent={React.Fragment}
        >
          {/* To keep context re-rendering fast, React needs to make each
              context consumer a separate node in the tree. */}
          <ErrorContext.Provider value={this.state.errorContext}>
            <LocaleContext.Provider value={this.localeContext}>
              <MutationContext.Provider value={this.environment}>
                <RelayProvider environment={this.environment}>
                  <Page data={this.props.data} />
                </RelayProvider>
              </MutationContext.Provider>
            </LocaleContext.Provider>
          </ErrorContext.Provider>
        </IntlProvider>
      );
    }
  }

  return App;
};

export default app;
