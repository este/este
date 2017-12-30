// @flow
import * as React from 'react';
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';

// TODO: Try https://github.com/facebook/flow/issues/5382#issuecomment-354512813

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
