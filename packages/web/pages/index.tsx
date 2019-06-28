import React, { FunctionComponent } from 'react';
import { FormattedRelative } from 'react-intl';
import { Text, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { useAppContext } from '@app/hooks/useAppContext';
import { usePageTitles } from '@app/hooks/usePageTitles';
import { CreateWeb } from '@app/components/CreateWeb';
import { Layout } from '@app/components/Layout';
import { KeyboardNavigableView } from '@app/components/KeyboardNavigableView';
import { Link } from '@app/components/Link';
import { pages_data } from '@app/relay/generated/pages_data.graphql';

type Viewer = NonNullable<pages_data['viewer']>;

interface ViewerWebsProps {
  webs: Viewer['webs'];
}

const ViewerWebs: FunctionComponent<ViewerWebsProps> = ({ webs }) => {
  const { theme } = useAppContext();
  if (webs == null) return null;
  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051#issuecomment-449628575
    <>
      {webs.map(web => {
        if (web == null) return null;
        return (
          <View style={theme.marginBottom} key={web.id}>
            <Text style={theme.text}>
              <Link href={{ pathname: '/web', query: { id: web.id } }}>
                {web.name}
              </Link>
            </Text>
            <Text style={theme.textSmallGray}>
              <FormattedRelative value={web.createdAt} />
            </Text>
          </View>
        );
      })}
    </>
  );
};

interface AuthenticatedProps {
  viewer: Viewer;
}

const Authenticated: FunctionComponent<AuthenticatedProps> = ({ viewer }) => {
  return (
    <>
      <KeyboardNavigableView>
        <ViewerWebs webs={viewer.webs} />
      </KeyboardNavigableView>
      <CreateWeb />
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
        <Link href={{ pathname: '/signin' }}>Create Web</Link>
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
        webs {
          id
          name
          createdAt
        }
      }
    }
  `,
});
