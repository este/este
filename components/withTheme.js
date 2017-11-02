// @flow
import * as React from 'react';
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';

// Example usage:
// const FooWithTheme: React.ComponentType<FooProps> = withTheme(Foo);
// Note Foo component has to be typed before withTheme(Foo).

type ThemeProps = {
  theme: Theme,
};

const withTheme = <Props: {}>(
  Component: React.ComponentType<ThemeProps & Props>,
): React.ComponentType<Props> => {
  const WithTheme = (props: Props, { theme }: ThemeProps) => (
    <Component {...props} theme={theme} />
  );
  WithTheme.contextTypes = {
    theme: PropTypes.object,
  };
  return WithTheme;
};

export default withTheme;
