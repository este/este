/* @flow */
import type { BrowserStyle, Styled, Theme } from '../themes/types';
import React from 'react';
import { createComponent } from 'react-fela';

type DivButtonProps = {
  disabled?: boolean,
};

// TODO: Configure via context for React Native.
const getPlatformType = (type) => {
  // TODO: Use View for div and Text for span. Etc.
  if (type === 'button') {
    // developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
    return (props: DivButtonProps) => (
      <div tabIndex={props.disabled ? -1 : 0} role="button" {...props} />
    );
  }
  return type;
};

const createComponentRule = (rule) => (props) => {
  const { $extends, ...style } = typeof rule === 'function'
    ? rule(props.theme, props)
    : rule;
  if (!$extends) return style;
  const spread = []
    .concat($extends)
    .reduce((prev, next) => ({ ...prev, ...next.rule(props) }), {});
  return { ...spread, ...style };
};

const styled = <Props>(
  rule: BrowserStyle | (theme: Theme, props: Props) => BrowserStyle,
  type?: string | Function,
  passProps?: Array<string>,
): Styled<Props> => {
  const componentRule = createComponentRule(rule);
  const platformType = getPlatformType(type);
  const Component = createComponent(componentRule, platformType, passProps);
  Component.rule = componentRule;
  return Component;
};

export default styled;
