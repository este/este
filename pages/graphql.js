// @flow
import A from '../components/A';
import AllPosts from '../components/AllPosts';
import Box from '../components/Box';
import CreatePost from '../components/CreatePost';
import Heading from '../components/Heading';
import P from '../components/P';
import Page from '../components/Page';
import app from '../components/app';
import sitemap from '../lib/sitemap';
import { graphql } from 'react-relay';

const GraphQL = ({ intl, queryProps }) =>
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
      <CreatePost viewer={queryProps.viewer} />
      <AllPosts viewer={queryProps.viewer} />
    </Box>
  </Page>;

export default app(GraphQL, {
  query: graphql`
    query graphqlQuery {
      viewer {
        ...CreatePost_viewer
        ...AllPosts_viewer
      }
    }
  `,
});
