// @flow
import * as React from 'react';
import ThemeContext from './ThemeContext';
import type { Theme as ThemeType } from '../../themes/types';

export type Theme = ThemeType;

const withTheme = <Props: {}>(
  Component: React.ComponentType<Props>,
): React.ComponentType<$Diff<Props, { theme: Theme | void }>> => {
  return class WithTheme extends React.PureComponent<Props> {
    render() {
      return (
        <ThemeContext.Consumer>
          {theme => <Component {...this.props} theme={theme} />}
        </ThemeContext.Consumer>
      );
    }
  };
};

export default withTheme;
