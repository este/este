// @flow
import * as React from 'react';
import { graphql } from 'react-relay';
import PageComponent from '../components/Page';
import AppPage from '../components/AppPage';
import type { PageWithQuery } from './_app';
import type { pageQuery } from './__generated__/pageQuery.graphql';

type URLQuery = { id: string };

const Page: PageWithQuery<pageQuery, URLQuery> = props => {
  return (
    // $FlowFixMe https://github.com/facebook/relay/issues/2316
    <AppPage requireAuth data={props.data}>
      {/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
      <PageComponent data={props.data} />
    </AppPage>
  );
};

Page.getInitialProps = async context => {
  const data = await context.fetch(
    graphql`
      query pageQuery($id: ID!, $isPage: Boolean!) {
        ...AppPage @arguments(isPage: $isPage)
        ...Page @arguments(id: $id)
      }
    `,
    urlQuery => ({ id: urlQuery.id, isPage: true }),
  );
  return { data };
};

export default Page;
