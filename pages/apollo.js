// @flow
import Heading from '../components/heading';
import Page from '../components/page';
import Text from '../components/text';
import app from '../components/app';
import sitemap from '../lib/sitemap';
// $FlowFixMe gql should be fixed soon
import { gql, graphql } from 'react-apollo';

const allPosts = gql`
  query allPosts {
    allPosts {
      createdAt
      id
      text
    }
  }
`;

const PostList = ({ data: { allPosts } }: any) =>
  <Text>
    {JSON.stringify(allPosts, null, 2)}
  </Text>;

const PostList2 = graphql(allPosts)(PostList);

const Apollo = ({ intl }) =>
  <Page title={intl.formatMessage(sitemap.apollo.title)}>
    <Heading size={3}>
      {intl.formatMessage(sitemap.apollo.title)}
    </Heading>
    <PostList2 />
  </Page>;

export default app(Apollo);
