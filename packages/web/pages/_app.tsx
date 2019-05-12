import { handleApiGraphQLError } from '@app/api/handleApiGraphQLError';
import fetch from 'isomorphic-unfetch';
import App, { Container, NextAppContext } from 'next/app';
import NextError from 'next/error';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { ReactRelayContext, graphql } from 'react-relay';
import {
  Environment,
  // @ts-ignore Missing type.
  fetchQuery,
  Network,
  RecordMap,
  RecordSource,
  Store,
} from 'relay-runtime';
import { AuthSyncProvider, maybeGetAuthToken } from '@app/hooks/useAuth';
import { AppHref } from '@app/hooks/useAppHref';
import { AppContext } from '@app/hooks/useAppContext';
import { IntlProviderFix } from '@app/components/IntlProviderFix';
import { RouterProviderFix } from '@app/components/RouterProviderFix';
import { ViewerTheme } from '@app/components/ViewerTheme';
import { AppQuery } from '@app/relay/generated/AppQuery.graphql';
import { getEndpoint } from '@app/serverless/getEndpoint';

const createRelayEnvironment = (
  apiEndpoint: string,
  token: string,
  records: RecordMap,
  rejectErrors: boolean,
) => {
  return new Environment({
    network: Network.create(async (operation, variables) => {
      const response = await fetch(apiEndpoint, {
        body: JSON.stringify({ query: operation.text, variables }),
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { authorization: `Bearer ${token}` } : null),
        },
        method: 'POST',
      });
      // Relay fetch ignores json.errors, so we have to handle it manually.
      // But only for queries. Mutations are ok.
      const json = await response.json();
      if (rejectErrors && json.errors) return Promise.reject(json.errors);
      return json;
    }),
    store: new Store(new RecordSource(records)),
  });
};

const appQuery = graphql`
  query AppQuery(
    $id: ID!
    $isIndexPage: Boolean!
    $isMePage: Boolean!
    $isSignInPage: Boolean!
    $isWebPage: Boolean!
  ) {
    ...ViewerTheme_data
    ...pages_data @include(if: $isIndexPage)
    ...me_data @include(if: $isMePage)
    ...signin_data @include(if: $isSignInPage)
    ...web_data @include(if: $isWebPage) @arguments(id: $id)
  }
`;

let host = '';

interface MyAppProps {
  host: string;
  initialNow: number;
  pageProps: { data: AppQuery['response'] | null };
  relayRecords: RecordMap;
  statusCode: number | undefined;
  token: string;
  variables: AppQuery['variables'];
}

// eslint-disable-next-line import/no-default-export
export default class MyApp extends App<MyAppProps> {
  static async getInitialProps({
    router,
    ctx,
  }: NextAppContext): Promise<MyAppProps> {
    // Types require fully defined URL query. Will not be used entirely ofc.
    const defaultQueryArgs = {
      id: '',
    };
    const isPageQueryArgs = {
      isIndexPage: ctx.pathname === '/',
      isMePage: ctx.pathname === '/me',
      isSignInPage: ctx.pathname === '/signin',
      isWebPage: ctx.pathname === '/web',
    };

    host = host || (ctx.req && ctx.req.headers.host) || '';

    const props = {
      host,
      initialNow: Date.now(),
      pageProps: { data: null },
      relayRecords: {},
      statusCode: ctx.res && ctx.res.statusCode,
      token: maybeGetAuthToken(ctx.req),
      variables: {
        ...defaultQueryArgs,
        ...ctx.query,
        ...isPageQueryArgs,
      },
    };

    if (props.statusCode != null && props.statusCode >= 400) {
      return props;
    }

    const relayEnvironment = createRelayEnvironment(
      getEndpoint(host).api,
      props.token,
      {},
      true,
    );
    try {
      props.pageProps.data = await fetchQuery(
        relayEnvironment,
        appQuery,
        props.variables,
      );
    } catch (error) {
      handleApiGraphQLError(error, {
        401() {
          props.statusCode = 401;
        },
        403() {
          props.statusCode = 403;
        },
        404() {
          props.statusCode = 404;
        },
        unknown() {
          props.statusCode = 500;
          // eslint-disable-next-line no-console
          console.log(error);
        },
      });
      if (ctx.res && props.statusCode) ctx.res.statusCode = props.statusCode;
    }

    props.relayRecords = relayEnvironment
      .getStore()
      .getSource()
      .toJSON();

    if (props.statusCode === 401) {
      const signInHref: AppHref = {
        pathname: '/signin',
        query: { redirectUrl: ctx.asPath },
      };
      if (ctx.res) {
        const Location = `${
          signInHref.pathname
        }?redirectUrl=${encodeURIComponent(ctx.asPath)}`;
        ctx.res.writeHead(302, { Location });
        ctx.res.end();
      } else {
        router.replace(signInHref);
      }
    }

    return props;
  }

  render() {
    const {
      Component: Page,
      initialNow,
      pageProps,
      relayRecords,
      statusCode,
      token,
      variables,
    } = this.props;

    host = host || this.props.host;

    // TODO: Add custom 404 and 500 pages.
    if (statusCode != null && statusCode >= 400)
      return <NextError statusCode={statusCode} />;

    const relayEnvironment = createRelayEnvironment(
      getEndpoint(host).api,
      token,
      relayRecords,
      false,
    );

    return (
      <Container>
        <ReactRelayContext.Provider
          value={{ environment: relayEnvironment, variables }}
        >
          <IntlProvider
            locale="en"
            initialNow={initialNow}
            textComponent={React.Fragment}
          >
            <ViewerTheme data={pageProps.data}>
              {theme => (
                <IntlProviderFix>
                  {intl => (
                    <RouterProviderFix>
                      {router => (
                        <AppContext.Provider
                          value={{ intl, relayEnvironment, theme, router }}
                        >
                          <AuthSyncProvider>
                            <Page {...pageProps} />
                          </AuthSyncProvider>
                        </AppContext.Provider>
                      )}
                    </RouterProviderFix>
                  )}
                </IntlProviderFix>
              )}
            </ViewerTheme>
          </IntlProvider>
        </ReactRelayContext.Provider>
      </Container>
    );
  }
}
