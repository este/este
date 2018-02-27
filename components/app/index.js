// @flow
import * as React from 'react';
import createRelayEnvironment from './createRelayEnvironment';
import type { IntlShape } from 'react-intl';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import { fetchQuery } from 'react-relay';
import type { GraphQLTaggedNode } from 'react-relay';
import { getCookie } from './cookie';
import { LocaleProvider } from '../Locale';
import { MutationProvider } from '../Mutation';
import { ErrorPopupProvider } from '../ErrorPopup';
import RelayProvider from '../RelayProvider';

// https://github.com/facebook/relay/issues/2347
// const { installRelayDevTools } = require('relay-devtools');
// installRelayDevTools();

// Polyfill browser stuff.
if (process.browser === true) {
  // eslint-disable-next-line global-require
  require('smoothscroll-polyfill').polyfill();

  // Add locale data injected in pages/_document.js
  // eslint-disable-next-line no-undef
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    // eslint-disable-next-line no-undef
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

type UrlQuery = Object;

type NextProps = {|
  url: {
    pathname: string,
    query: UrlQuery,
  },
|};

type InitialAppProps = {|
  token: ?string,
  data: Object,
  initialNow: number,
  locale: string,
  messages: Object,
  records: Object,
  supportedLocales: Array<string>,
|};

type PageProps = {
  ...NextProps,
  data: Object,
  intl: IntlShape,
};

type AppProps = {
  ...NextProps,
  ...InitialAppProps,
};

const app = (
  // Stateless, because state belongs elsewhere.
  Page: React.StatelessFunctionalComponent<PageProps>,
  options?: {|
    query?: GraphQLTaggedNode,
  |},
) => {
  const { query } = options || {};
  const PageWithHigherOrderComponents = injectIntl(Page);

  const App = (props: AppProps) => {
    const {
      token,
      data,
      initialNow,
      locale,
      messages,
      records,
      supportedLocales,
      url,
    } = props;

    const environment = createRelayEnvironment(token, records);

    return (
      <IntlProvider
        locale={locale}
        messages={messages}
        initialNow={initialNow}
        // https://github.com/yahoo/react-intl/issues/999#issuecomment-335799491
        textComponent={({ children }) => children}
      >
        <LocaleProvider value={{ locale, supportedLocales }}>
          <MutationProvider value={{ environment }}>
            <ErrorPopupProvider>
              <RelayProvider environment={environment} variables={url.query}>
                <PageWithHigherOrderComponents data={data} url={url} />
              </RelayProvider>
            </ErrorPopupProvider>
          </MutationProvider>
        </LocaleProvider>
      </IntlProvider>
    );
  };

  App.getInitialProps = async (context: {
    pathname: string,
    query: UrlQuery,
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
  }) => {
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
      // eslint-disable-next-line no-undef
      context.req || window.__NEXT_DATA__.props;

    return ({
      token,
      data,
      initialNow,
      locale,
      messages,
      records,
      supportedLocales,
    }: InitialAppProps);
  };

  return App;
};

export default app;
