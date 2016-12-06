/* @flow */
import type { Style, Theme } from '../themes/types';
import React from 'react';
import { createComponent } from 'react-fela';

// TODO:
//  Enforce Exact<PropType> on Component props somehow.
//  Text.style(props) should by typed or autocompleted at least.
//  Text.Props like React.Element, how React does it?
//  Autocomplete for props.

type StyleFunction = <PropsType>(
  rule: Style | (props: PropsType, theme: Theme) => Style,
  type?: string | Function,
  passProps?: Array<string>,
) => (props: PropsType) => React.Element<any>;

const style: StyleFunction = (rule, type, passProps) => {
  const styleComponent = props => typeof rule === 'function'
    ? rule(props, props.theme)
    : rule;
  const StyleComponent = createComponent(styleComponent, type, passProps);
  const Component = (props: any) => <StyleComponent {...props} />;
  Component.style = styleComponent;
  return Component;
};

export default style;
