import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Text, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { useAppContext } from '@app/hooks/useAppContext';
import { useAuth } from '@app/hooks/useAuth';
import { usePageTitles } from '@app/hooks/usePageTitles';
import { Button } from '@app/components/Button';
import { Gravatar } from '@app/components/Gravatar';
import { Layout } from '@app/components/Layout';
import { SetUserTheme } from '@app/components/SetUserTheme';
import { me_data } from '@app/relay/generated/me_data.graphql';

interface MeProps {
  data: me_data;
}

const Me: FunctionComponent<MeProps> = ({ data }) => {
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
  // return null;
};

// eslint-disable-next-line import/no-default-export
export default createFragmentContainer(Me, {
  data: graphql`
    fragment me_data on Query {
      ...Layout_data
      ...SetUserTheme_data
      requiredViewer {
        email
      }
    }
  `,
});
