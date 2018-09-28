// @flow
import * as React from 'react';
import { graphql } from 'react-relay';
import AppPage from '../components/app/AppPage';
import WebComponent from '../components/Web';
import type { PageWithQuery } from './_app';
import type { webQuery } from './__generated__/webQuery.graphql';

type URLQuery = { id: string };

const Web: PageWithQuery<webQuery, URLQuery> = props => {
  return (
    // $FlowFixMe https://github.com/facebook/relay/issues/2316
    <AppPage requireAuth data={props.data}>
      {/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
      <WebComponent data={props.data} />
    </AppPage>
  );
};

Web.getInitialProps = async context => {
  const data = await context.fetch(
    graphql`
      query webQuery($id: ID!, $isWeb: Boolean!) {
        ...AppPage @arguments(isWeb: $isWeb)
        ...Web @arguments(id: $id)
      }
    `,
    urlQuery => ({ id: urlQuery.id, isWeb: true }),
  );
  return { data };
};

export default Web;
