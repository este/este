// @flow
import * as React from 'react';
import Button from './Button';
import { lightTheme } from '../../themes/theme';
import ThemeContext from './ThemeContext';
import { graphql } from 'react-relay';
import withMutation, { type Commit } from './withMutation';
import * as generated from './__generated__/SetThemeMutation.graphql';

type SetThemeProps = {|
  commit: Commit<generated.SetThemeInput, generated.SetThemeMutationResponse>,
  pending: boolean,
|};

class SetTheme extends React.PureComponent<SetThemeProps> {
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
  SetTheme,
  graphql`
    mutation SetThemeMutation($input: SetThemeInput!) {
      setTheme(input: $input) {
        user {
          themeName
        }
      }
    }
  `,
);
