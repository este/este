// @flow
import 'isomorphic-fetch'; // Apollo needs it.
import { ApolloClient, createNetworkInterface } from 'react-apollo';

let apolloClient = null;

const createClient = (headers, initialState) =>
  new ApolloClient({
    initialState,
    // $FlowFixMe
    ssrMode: !process.browser,
    dataIdFromObject: result => result.id || null,
    networkInterface: createNetworkInterface({
      uri: BACKEND_URL,
      opts: {
        credentials: 'same-origin',
        // Pass headers here if your graphql server requires them
      },
    }),
  });

const initClient = (headers: Object, initialState: Object) => {
  if (!process.browser) {
    return createClient(headers, initialState);
  }
  if (!apolloClient) {
    apolloClient = createClient(headers, initialState);
  }
  return apolloClient;
};

export default initClient;
