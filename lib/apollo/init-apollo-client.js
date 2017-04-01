// @flow
import { ApolloClient, createNetworkInterface } from 'react-apollo';

let apolloClient = null;

const newApolloClient = (headers, initialState) =>
  new ApolloClient({
    initialState,
    // ssrMode: !process.browser,
    dataIdFromObject: result => result.id || null,
    networkInterface: createNetworkInterface({
      uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn',
      opts: {
        credentials: 'same-origin',
        // Pass headers here if your graphql server requires them
      },
    }),
  });

const initApolloClient = (headers: any, initialState: any = {}) => {
  if (!process.browser) {
    return newApolloClient(headers, initialState);
  }
  if (!apolloClient) {
    apolloClient = newApolloClient(headers, initialState);
  }
  return apolloClient;
};

export default initApolloClient;
