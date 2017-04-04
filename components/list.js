// @flow
import { gql, graphql } from 'react-apollo';

const PostList = ({ data: { allPosts } }: any) => (
  <pre>
    {JSON.stringify(allPosts, null, 2)}
  </pre>
);

const allPosts = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(allPosts, {
  options: {
    variables: {
      skip: 0,
      first: 10,
    },
  },
})(PostList);
