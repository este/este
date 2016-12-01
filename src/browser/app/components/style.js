/* @flow */
import type { Style, Theme } from '../themes';
import { createComponent } from 'react-fela';

const style = (
  // This is awesome. Every rule has typed theme and return. Type inference ftw.
  rule: (props: any, theme: Theme) => Style,
  type?: string | Function,
  passThroughProps?: Array<string>,
) => createComponent(
  props => rule(props, props.theme),
  type,
  passThroughProps,
);

export default style;
