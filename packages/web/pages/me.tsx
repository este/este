import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Text, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import useAppContext from '@app/hooks/useAppContext';
import useAuth from '@app/hooks/useAuth';
import usePageTitles from '@app/hooks/usePageTitles';
import Button from '@app/components/Button';
import Gravatar from '@app/components/Gravatar';
import Layout from '@app/components/Layout';
import SetUserTheme from '@app/components/SetUserTheme';
import { meQuery } from '@app/relay/generated/meQuery.graphql';

interface MeProps {
  data: meQuery;
}

const Me: React.FunctionComponent<MeProps> = ({ data }) => {
  const { requiredViewer } = data;
  const { theme } = useAppContext();
  const pageTitles = usePageTitles();
  const auth = useAuth();
  return (
    <Layout title={pageTitles.me} data={data}>
      <Text style={theme.heading1}>{requiredViewer.email}</Text>
      <Text style={theme.paragraph}>
        <Gravatar email={requiredViewer.email} />
      </Text>
      <View style={theme.buttons}>
        <SetUserTheme data={data} />
        <Button type="danger" onPress={auth.signOut}>
          <FormattedMessage defaultMessage="Sign Out" id="signOut" />
        </Button>
      </View>
    </Layout>
  );
};

export default createFragmentContainer(
  Me,
  graphql`
    fragment meQuery on Query {
      ...LayoutQuery
      ...SetUserThemeQuery
      requiredViewer {
        email
      }
    }
  `,
);
