/* @flow */
import type { BrowserStyle, Styled, Theme } from '../themes/types';
import { createComponent } from 'react-fela';

const createComponentRule = (rule) => (props) => {
  const { $spread, ...style } = typeof rule === 'function'
    ? rule(props.theme, props)
    : rule;
  if (!$spread) return style;
  const spread = []
    .concat($spread)
    .reduce((prev, next) => ({ ...prev, ...next.rule(props) }), {});
  return { ...spread, ...style };
};

const styled = <Props>(
  rule: BrowserStyle | (theme: Theme, props: Props) => BrowserStyle,
  type?: string | Function,
  passProps?: Array<string>,
): Styled<Props> => {
  const componentRule = createComponentRule(rule);
  const Component = createComponent(componentRule, type, passProps);
  Component.rule = componentRule;
  return Component;
};

export default styled;
