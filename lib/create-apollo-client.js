// @flow
import 'isomorphic-fetch'; // Apollo needs it.
import { ApolloClient, createNetworkInterface } from 'react-apollo';

// TODO: Handle errors. Probably pass Redux store to createApolloClient.
// https://github.com/apollographql/apollo-client/issues/657#issuecomment-311741541
const createApolloClient = ({ getToken }: { getToken: () => string }) => {
  const networkInterface = createNetworkInterface({
    uri: GRAPHQL_ENDPOINT,
  });
  networkInterface.use([
    {
      applyMiddleware(req, next) {
        // Create the header object if needed.
        if (!req.options.headers) req.options.headers = {};
        const token = getToken();
        req.options.headers.authorization = token ? `Bearer ${token}` : null;
        next();
      },
    },
  ]);
  return new ApolloClient({
    // $FlowFixMe property `browser` not found in Process
    ssrMode: !process.browser,
    networkInterface,
  });
};

export default createApolloClient;
