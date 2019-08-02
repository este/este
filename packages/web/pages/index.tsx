import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { useAppContext } from '@app/hooks/useAppContext';
import { usePageTitles } from '@app/hooks/usePageTitles';
import { useViewerAccessibleTadaUpdatedSubscription } from '@app/hooks/useViewerAccessibleTadaUpdatedSubscription';
import { CreateTada } from '@app/components/CreateTada';
import { Layout } from '@app/components/Layout';
import { KeyboardNavigableView } from '@app/components/KeyboardNavigableView';
import UserTadas from '@app/components/UserTadas';
import UserTeammates from '@app/components/UserTeammates';
import { Link } from '@app/components/Link';
import { pages_data } from '@app/relay/generated/pages_data.graphql';

type Viewer = NonNullable<pages_data['viewer']>;

interface AuthenticatedProps {
  viewer: Viewer;
}

const Authenticated: FunctionComponent<AuthenticatedProps> = ({ viewer }) => {
  useViewerAccessibleTadaUpdatedSubscription();

  return (
    <>
      <KeyboardNavigableView>
        <UserTadas user={viewer || null} />
        <CreateTada />
      </KeyboardNavigableView>
      <View
        style={{
          backgroundColor: '#cecece',
          bottom: 0,
          left: 0,
          position: 'fixed',
          width: '300px',
          top: 0,
        }}
      >
        <UserTeammates user={viewer || null} />
      </View>
    </>
  );
};

const NotAuthenticated: FunctionComponent = () => {
  const { theme } = useAppContext();
  const pageTitles = usePageTitles();

  return (
    <>
      <Text style={theme.heading1}>{pageTitles.index}</Text>
      <Text style={theme.paragraph}>
        <Link href={{ pathname: '/signin' }}>Create Tada</Link>
      </Text>
    </>
  );
};

const Index: FunctionComponent<{
  data: pages_data;
}> = ({ data }) => {
  const pageTitles = usePageTitles();

  return (
    <Layout title={pageTitles.index} data={data}>
      {data.viewer ? (
        <Authenticated viewer={data.viewer} />
      ) : (
        <NotAuthenticated />
      )}
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default createFragmentContainer(Index, {
  data: graphql`
    fragment pages_data on Query {
      ...Layout_data
      viewer {
        id
        ...UserTadas_user @arguments(first: 5)
        ...UserTeammates_user @arguments(tadasFirst: 3)
      }
    }
  `,
});
