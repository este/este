// @flow
import * as React from 'react';
import Button from './Button';
import { lightTheme } from '../../themes/theme';
import ThemeContext from './ThemeContext';
import { graphql } from 'react-relay';
import withMutation, { type Commit } from './withMutation';
import * as generated from './__generated__/ToggleThemeMutation.graphql';

type ToggleThemeProps = {|
  commit: Commit<
    generated.UpdateUserInput,
    generated.ToggleThemeMutationResponse,
  >,
  pending: boolean,
|};

// TODO: We should have UpdateUser component imho.

class ToggleTheme extends React.PureComponent<ToggleThemeProps> {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          const themeName = theme === lightTheme ? 'dark' : 'light';
          return (
            <Button
              color="primary"
              onPress={() => {
                this.props.commit({ themeName });
              }}
              disabled={this.props.pending}
            >
              {`${themeName} theme`}
            </Button>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default withMutation(
  ToggleTheme,
  graphql`
    mutation ToggleThemeMutation($input: UpdateUserInput!) {
      updateUser(input: $input) {
        user {
          themeName
        }
      }
    }
  `,
);
