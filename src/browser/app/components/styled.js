/* @flow */
import type { BrowserStyle, Styled, Theme } from '../themes/types';
import React from 'react';
import { createComponent } from 'react-fela';

type DivButtonProps = {
  disabled?: boolean,
  onClick?: Function,
};

// TODO: Configure this via React context.
const getPlatformType = (type) => {
  // developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role
  // developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
  if (type === 'button') {
    return (props: DivButtonProps) => (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        role="button"
        onKeyPress={e => {
          const isSpacebar = e.key === ' ';
          if (!isSpacebar) return;
          e.preventDefault();
          if (typeof props.onClick !== 'function') return;
          props.onClick(e);
        }}
        tabIndex={props.disabled ? -1 : 0}
        {...props}
      />
    );
  }
  return type;
};

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
  const platformType = getPlatformType(type);
  const extendedRule = createExtendedRule(rule);
  const componentRule = (props) => {
    const { style, maps } = extendedRule(props);
    // For debugging or post processing.
    return maps.reduce((style, map) => map(style), style);
  };
  // TODO: Use new flow callable object type subclassed from Function.
  const Component = createComponent(componentRule, platformType, passProps);
  Component.rule = extendedRule;
  return Component;
};

export default styled;
