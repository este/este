import React from 'react';
import { FormattedRelative } from 'react-intl';
import { Text, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import CreateWeb from '../components/CreateWeb';
import Layout from '../components/Layout';
import Link from '../components/Link';
import { pagesQuery } from '../generated/pagesQuery.graphql';
import useAppContext from '../hooks/useAppContext';
import { pageTitles } from './_app';

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
  const { intl } = useAppContext();
  const title = intl.formatMessage(pageTitles.index);
  return (
    <>
      <Text style={theme.heading1}>{title}</Text>
      <Text style={theme.paragraph}>
        <Link href={{ pathname: '/signin' }}>Create Web</Link>
      </Text>
    </>
  );
};

const Index: React.FunctionComponent<{
  data: pagesQuery;
}> = ({ data }) => {
  const { intl } = useAppContext();
  const title = intl.formatMessage(pageTitles.index);

  return (
    <Layout title={title} data={data}>
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
