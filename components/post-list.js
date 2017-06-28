// @flow
import Text from './text';
// $FlowFixMe gql should be fixed soon
import { gql, graphql } from 'react-apollo';

const PostList = ({ data: { allPosts } }: any) =>
  <Text>
    {JSON.stringify(allPosts, null, 2)}
  </Text>;

// query allPosts($first: Int!, $skip: Int!) {
const allPosts = gql`
  query allPosts {
    allPosts {
      createdAt
      id
      text
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(allPosts)(PostList);

// export default graphql(allPosts, {
//   options: {
//     variables: {
//       skip: 0,
//       first: 10,
//     },
//   },
// })(PostList);
