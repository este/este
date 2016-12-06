/* @flow */
import type { BrowserStyle, Style, Theme } from '../themes/types';
import React from 'react';
import { createComponent } from 'react-fela';

// TODO: It's almost perfect, still:
//   - type somehow .style fn
//   - Is it possible to pass Props type to .Props? How React does React.Element?

const style = <Props>(
  rule: BrowserStyle | (props: Props, theme: Theme) => BrowserStyle,
  type?: string | Function,
  passProps?: Array<string>,
): Style<Props> => {
  const componentStyle = (props) =>
    typeof rule === 'function' ? rule(props, props.theme) : rule;
  const StyleComponent = createComponent(componentStyle, type, passProps);
  const Component = (props: any) => <StyleComponent {...props} />;
  Component.style = componentStyle;
  return Component;
};

export default style;
