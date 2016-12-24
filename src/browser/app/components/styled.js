/* @flow */
import type { BrowserStyle, Styled, Theme } from '../themes/types';
import { createComponent } from 'react-fela';

const createExtendedRule = (rule) => (props) => {
  const { $extends, $map, ...style } = typeof rule === 'function'
    ? rule(props.theme, props)
    : rule;
  const extended = $extends ? $extends.rule(props) : {};
  return {
    maps: [].concat($map || []).concat(extended.maps || []),
    style: { ...extended.style, ...style },
  };
};

const styled = <Props>(
  rule: BrowserStyle | (theme: Theme, props: Props) => BrowserStyle,
  type?: string | Function,
  passProps?: Array<string>,
): Styled<Props> => {
  const extendedRule = createExtendedRule(rule);
  const componentRule = (props) => {
    const { style, maps } = extendedRule(props);
    // For debugging or post processing.
    return maps.reduce((style, map) => map(style), style);
  };
  // TODO: Use new flow callable object type subclassed from Function.
  const Component = createComponent(componentRule, type, passProps);
  Component.rule = extendedRule;
  return Component;
};

export default styled;
