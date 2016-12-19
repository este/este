/* @flow */
import type { BrowserStyle, Styled, Theme } from '../themes/types';
import React from 'react';
import { createComponent } from 'react-fela';

type DivButtonProps = {
  disabled?: boolean,
};

// TODO: Add React Native support via context probably.
const getPlatformType = (type) => {
  if (type === 'button') {
    // developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
    return (props: DivButtonProps) => (
      <div
        role="button"
        tabIndex={props.disabled ? -1 : 0}
        {...props}
      />
    );
  }
  return type;
};

const createComponentRule = (rule) => (props) => {
  const { $extends, $map, ...style } = typeof rule === 'function'
    ? rule(props.theme, props)
    : rule;
  const extended = []
    .concat($extends || [])
    .reduce((prev, current) => ({
      ...prev,
      ...current.rule(props),
    }), {});
  const extendedStyle = { ...extended, ...style };
  return $map ? $map(extendedStyle) : extendedStyle;
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
