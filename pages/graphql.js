// @flow
import A from '../components/A';
import AllPosts from '../components/AllPosts';
// import Box from '../components/Box';
import Heading from '../components/Heading';
// import Loading from '../components/Loading';
import P from '../components/P';
import Page from '../components/Page';
// import Set from '../components/Set';
// import Text from '../components/Text';
import app from '../components/app';
import sitemap from '../lib/sitemap';
// import { FormattedRelative } from 'react-intl';
import { QueryRenderer, graphql } from 'react-relay';

import createRelayEnvironment from '../lib/createRelayEnvironment';

const environment = createRelayEnvironment();

const GraphQL = ({ intl }) =>
  <Page title={intl.formatMessage(sitemap.graphql.title)}>
    <Heading size={3}>
      {intl.formatMessage(sitemap.graphql.title)}
    </Heading>
    <P>
      GraphQL with auth demonstrated on{' '}
      <A href="https://facebook.github.io/relay/">Relay</A> and{' '}
      <A href="https://www.graph.cool/">graph.cool</A>.
    </P>
    {/* QueryRenderer can be placed everywhere. */}
    <QueryRenderer
      environment={environment}
      query={graphql`
        query graphqlQuery {
          # For some reason, Relay uses viewer prop for data.
          viewer {
            # Whole query is statically composed from fragments.
            ...AllPosts_viewer
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <div>Error, asi 500 page? Redirect?</div>;
        } else if (props) {
          return <AllPosts viewer={props.viewer} />;
        }
        return <div>Loading</div>;
      }}
    />
  </Page>;

export default app(GraphQL);
