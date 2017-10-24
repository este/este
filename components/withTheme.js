// @flow
import * as React from 'react';
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';

// Explicit type enables autocomplete.
export type WithTheme<T> = React.ComponentType<T>;

const withTheme = <Props: {}>(
  Component: React.ComponentType<{ theme: Theme } & Props>,
): React.ComponentType<Props> => {
  const WithTheme = (props: Props, { theme }: { theme: Theme }) => (
    <Component {...props} theme={theme} />
  );
  WithTheme.contextTypes = {
    theme: PropTypes.object,
  };
  return WithTheme;
};

export default withTheme;
