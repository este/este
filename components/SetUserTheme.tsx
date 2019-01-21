import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createFragmentContainer, graphql } from 'react-relay';
import { SetUserThemeMutation } from '../generated/SetUserThemeMutation.graphql';
import { SetUserThemeQuery } from '../generated/SetUserThemeQuery.graphql';
import useMutation from '../hooks/useMutation';
import { name as darkThemeName } from '../themes/dark';
import Button from './Button';

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

interface SetUserThemeProps {
  data: SetUserThemeQuery;
}

const SetUserTheme: React.FunctionComponent<SetUserThemeProps> = ({
  data: { viewer },
}) => {
  const { commit, pending, state } = useMutation<SetUserThemeMutation>(
    mutation,
    { name: (viewer && viewer.themeName) || '' },
  );
  const darkIsEnabled = state.name === darkThemeName;

  const toggleLightDarkTheme = () => {
    commit({ merge: { name: darkIsEnabled ? '' : darkThemeName } });
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

export default createFragmentContainer(
  SetUserTheme,
  graphql`
    fragment SetUserThemeQuery on Query {
      viewer {
        themeName
      }
    }
  `,
);
