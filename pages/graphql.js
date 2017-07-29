// @flow
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

const GraphQL = ({ intl, data, url: { query } }) =>
  <Page title={intl.formatMessage(sitemap.graphql.title)}>
    <Heading size={3}>
      {intl.formatMessage(sitemap.graphql.title)}
    </Heading>
    <P>
      GraphQL with auth demonstrated on{' '}
      <A href="https://facebook.github.io/relay/">Relay</A> and{' '}
      <A href="https://www.graph.cool/">graph.cool</A>.
    </P>
    <Box>
      <CreatePost viewer={data.viewer} />
      <Posts viewer={data.viewer} />
      <P size={-1}>
        Show first {prepareQuery(query).first} posts. Try{' '}
        <A size={-1} href={'/graphql?first=2'}>
          /graphql?first=2
        </A>
      </P>
    </Box>
  </Page>;

export default app(GraphQL, {
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
