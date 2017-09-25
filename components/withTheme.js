// @flow
import React, { type ComponentType } from 'react';
import type { Theme } from '../themes/types';
import { withTheme as felaWithTheme } from 'react-fela';

// WithTheme is workaround for Flow 0.54.
// TODO: Rethink it after Flow 0.56 with improved $Diff type. Inference or not?
export type WithTheme<T> = ComponentType<T>;

const withTheme = <Props: {}>(
  Component: ComponentType<{ theme: Theme } & Props>,
): ComponentType<Props> => {
  const ComponentWithTheme = felaWithTheme(Component);
  return (props: Props) => <ComponentWithTheme {...props} />;
};

export default withTheme;
