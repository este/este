import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { createFragmentContainer, graphql } from 'react-relay';
import { useMutation } from '@app/hooks/useMutation';
import { SetUserThemeMutation } from '@app/relay/generated/SetUserThemeMutation.graphql';
import { SetUserTheme_data } from '@app/relay/generated/SetUserTheme_data.graphql';
import { Button } from './Button';

const mutation = graphql`
  mutation SetUserThemeMutation($input: SetUserThemeInput!) {
    setUserTheme(input: $input) {
      user {
        # Just return affected field to update Relay store.
        themeName
      }
    }
  }
`;

interface SetUserThemeWithDataProps {
  data: SetUserTheme_data;
}

const SetUserThemeWithData: FunctionComponent<SetUserThemeWithDataProps> = ({
  data: { viewer },
}) => {
  const { commit, pending, state } = useMutation<SetUserThemeMutation>(
    mutation,
    { name: (viewer && viewer.themeName) || '' },
  );
  // Magic string constant is good enough for now.
  const darkIsEnabled = state.name === 'dark';
  const toggleLightDarkTheme = () => {
    commit({ merge: { name: darkIsEnabled ? '' : 'dark' } });
  };

  return (
    <Button type="primary" onPress={toggleLightDarkTheme} disabled={pending}>
      {darkIsEnabled ? (
        <FormattedMessage defaultMessage="Light Theme" id="lightTheme" />
      ) : (
        <FormattedMessage defaultMessage="Dark Theme" id="darkTheme" />
      )}
    </Button>
  );
};

export const SetUserTheme = createFragmentContainer(SetUserThemeWithData, {
  data: graphql`
    fragment SetUserTheme_data on Query {
      viewer {
        themeName
      }
    }
  `,
});
