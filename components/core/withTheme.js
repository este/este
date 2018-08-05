// @flow
import * as React from 'react';
import ThemeContext from './ThemeContext';
import type { Theme as ThemeType } from '../../themes/types';

export type Theme = ThemeType;

const withTheme = <Props: {}>(
  Component: React.ComponentType<Props>,
): React.ComponentType<$Diff<Props, { theme: Theme | void }>> => {
  class WithTheme extends React.PureComponent<Props> {
    render() {
      // $FlowFixMe Should be added?
      const { forwardedRef, ...rest } = this.props;
      return (
        <ThemeContext.Consumer>
          {theme => <Component {...rest} theme={theme} ref={forwardedRef} />}
        </ThemeContext.Consumer>
      );
    }
  }
  // $FlowFixMe Missing React.forwardRef definition in Flow.
  return React.forwardRef((props, ref) => {
    return <WithTheme {...props} forwardedRef={ref} />;
  });
};

export default withTheme;
