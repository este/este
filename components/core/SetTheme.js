// @flow
import * as React from 'react';
import Button from './Button';
import { lightTheme } from '../../themes/theme';
import withTheme, { type Theme } from './withTheme';
import withMutation from './withMutation';
import SetThemeMutation, {
  type SetThemeCommit,
} from '../../mutations/SetThemeMutation';
import { pipe } from 'ramda';

type SetThemeProps = {|
  commit: SetThemeCommit,
  pending: boolean,
  theme: Theme,
|};

class SetTheme extends React.PureComponent<SetThemeProps> {
  getThemeToogleName() {
    return this.props.theme === lightTheme ? 'Dark' : 'Light';
  }

  handleButtonPress = () => {
    const themeName = this.getThemeToogleName().toLowerCase();
    this.props.commit({ themeName });
  };

  render() {
    const themeName = this.getThemeToogleName();
    return (
      <Button
        color="primary"
        onPress={this.handleButtonPress}
        disabled={this.props.pending}
      >
        {`${themeName} Theme`}
      </Button>
    );
  }
}

export default pipe(
  withTheme,
  withMutation(SetThemeMutation),
)(SetTheme);
