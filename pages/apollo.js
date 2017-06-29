// @flow
import Heading from '../components/heading';
import Page from '../components/page';
import Text from '../components/text';
import app from '../components/app';
import sitemap from '../lib/sitemap';
import { gql, graphql } from 'react-apollo';

const PostList = ({ data: { allPosts } }: any) =>
  <Text>
    {JSON.stringify(allPosts, null, 2)}
  </Text>;

const PostListWithData = graphql(gql`
  query allPosts {
    allPosts {
      createdAt
      id
      text
    }
  }
`)(PostList);

const Apollo = ({ intl }) =>
  <Page title={intl.formatMessage(sitemap.apollo.title)}>
    <Heading size={3}>
      {intl.formatMessage(sitemap.apollo.title)}
    </Heading>
    <PostListWithData />
  </Page>;

export default app(Apollo);
