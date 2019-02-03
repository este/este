import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Text, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import Button from '../components/Button';
import Gravatar from '../components/Gravatar';
import Layout from '../components/Layout';
import SetUserTheme from '../components/SetUserTheme';
import { meQuery } from '../generated/meQuery.graphql';
import useAppContext from '../hooks/useAppContext';
import useAuth from '../hooks/useAuth';
import { pageTitles } from './_app';

interface MeProps {
  data: meQuery;
}

const Me: React.FunctionComponent<MeProps> = ({ data }) => {
  const { requiredViewer } = data;
  const { intl, theme } = useAppContext();
  const auth = useAuth();
  return (
    <Layout title={intl.formatMessage(pageTitles.me)} data={data}>
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
