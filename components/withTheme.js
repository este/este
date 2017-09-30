// @flow
import React, { type ComponentType } from 'react';
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';

// WithTheme is workaround for Flow 0.54.
// TODO: Rethink it after Flow 0.56 with improved $Diff type. Inference or not?
export type WithTheme<T> = ComponentType<T>;

const withTheme = <Props: {}>(
  Component: ComponentType<{ theme: Theme } & Props>,
): ComponentType<Props> => {
  const WrapperComponent = (props: Props, { theme }: { theme: Theme }) => (
    <Component {...props} theme={theme} />
  );
  WrapperComponent.contextTypes = {
    theme: PropTypes.object,
  };
  return WrapperComponent;
};

export default withTheme;
