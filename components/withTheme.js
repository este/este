// @flow
import * as React from 'react';
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';

// Explicit type enables Atom Nuclide autocomplete.
export type WithTheme<T> = React.ComponentType<T>;

const withTheme = <Props: {}>(
  Component: React.ComponentType<{ theme: Theme } & Props>,
): React.ComponentType<Props> => {
  const WrapperComponent = (props: Props, { theme }: { theme: Theme }) => (
    <Component {...props} theme={theme} />
  );
  WrapperComponent.contextTypes = {
    theme: PropTypes.object,
  };
  return WrapperComponent;
};

export default withTheme;
