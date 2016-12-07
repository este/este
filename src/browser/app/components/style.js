/* @flow */
import type { BrowserStyle, Style, Theme } from '../themes/types';
import { createComponent } from 'react-fela';

const createComponentRule = (rule) => (props) => {
  const { $spread, ...style } = typeof rule === 'function'
    ? rule(props, props.theme)
    : rule;
  if (!$spread) return style;
  const spread = []
    .concat($spread)
    .reduce((prev, next) => ({ ...prev, ...next.rule(props) }), {});
  return { ...spread, ...style };
};

const style = <Props>(
  rule: BrowserStyle | (props: Props, theme: Theme) => BrowserStyle,
  type?: string | Function,
  passProps?: Array<string>,
): Style<Props> => {
  const componentRule = createComponentRule(rule);
  const Component = createComponent(componentRule, type, passProps);
  Component.rule = componentRule;
  return Component;
};

export default style;
