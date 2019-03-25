import React from 'react';
import { FormattedRelative } from 'react-intl';
import { Text, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import useAppContext from '@app/hooks/useAppContext';
import usePageTitles from '@app/hooks/usePageTitles';
import CreateWeb from '@app/components/CreateWeb';
import Layout from '@app/components/Layout';
import Link from '@app/components/Link';
import { pagesQuery } from '@app/relay/generated/pagesQuery.graphql';

type Viewer = NonNullable<pagesQuery['viewer']>;

interface ViewerWebsProps {
  webs: Viewer['webs'];
}

const ViewerWebs: React.FunctionComponent<ViewerWebsProps> = ({ webs }) => {
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

const Authenticated: React.FunctionComponent<AuthenticatedProps> = ({
  viewer,
}) => {
  return (
    <>
      <ViewerWebs webs={viewer.webs} />
      <CreateWeb />
    </>
  );
};

const NotAuthenticated: React.FunctionComponent = () => {
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

const Index: React.FunctionComponent<{
  data: pagesQuery;
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

export default createFragmentContainer(
  Index,
  graphql`
    fragment pagesQuery on Query {
      ...LayoutQuery
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
);
