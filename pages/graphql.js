// @flow
import type { graphqlQueryResponse } from './__generated__/graphqlQuery.graphql';
import A from '../components/A';
import Posts from '../components/Posts';
import Box from '../components/Box';
import CreatePost from '../components/CreatePost';
import Heading from '../components/Heading';
import P from '../components/P';
import Page from '../components/Page';
import app from '../components/app';
import sitemap from '../lib/sitemap';
import { graphql } from 'react-relay';

const prepareQuery = ({ first }) => ({ first: Number(first) || 100 });

const GraphQL = ({ data, intl, url: { query } }) => {
  // Force type via any cast. Can we do it better?
  const { viewer } = ((data: any): graphqlQueryResponse);
  return (
    <Page title={intl.formatMessage(sitemap.graphql.title)}>
      <Heading size={3}>
        {intl.formatMessage(sitemap.graphql.title)}
      </Heading>
      <P>
        Implemented with <A href="https://facebook.github.io/relay/">
          Relay
        </A>{' '}
        and <A href="https://www.graph.cool/">graph.cool</A>.
      </P>
      <Box>
        <CreatePost viewer={viewer} />
        <Posts viewer={viewer} />
        <P size={-1}>
          First {prepareQuery(query).first} posts {' '}
          {query.first
            ? <A size={-1} href={'/graphql'}>
                /graphql
              </A>
            : <A size={-1} href={'/graphql?first=2'}>
                /graphql?first=2
              </A>}
        </P>
      </Box>
    </Page>
  );
};

export default app(GraphQL, {
  requireAuth: true,
  fetch: graphql`
    query graphqlQuery($first: Int) {
      viewer {
        ...CreatePost_viewer
        ...Posts_viewer
      }
    }
  `,
  prepareQuery,
});
