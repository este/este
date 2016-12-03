/* @flow */
import type { Style, Theme } from '../themes/types';
import { createComponent } from 'react-fela';

const style = (
  // This is awesome. Every rule has typed theme and return. Type inference ftw.
  rule: (theme: Theme, props: any) => Style,
  type?: string | Function,
  passThroughProps?: Array<string>,
) => createComponent(
  props => rule(props.theme, props),
  type,
  passThroughProps,
);

export default style;
