// @flow
import * as React from 'react';
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';

// TODO: https://twitter.com/estejs/status/943304119388950528

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
