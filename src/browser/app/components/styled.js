// @flow
import type { BrowserStyle, Styled, Theme } from '../themes/types';
import { createComponent } from 'react-fela';
import React from 'react';

// TODO: Inject platform specific types via React context.
const getPlatformType = (type) => {
  if (type === 'button') {
    // Render button as div because button is not consistently rendered across
    // browsers and it's hard and tricky to enforce the same look.
    // developer.mozilla.org/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role
    // developer.mozilla.org/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
    return (props: {
      disabled?: boolean,
      onClick?: Function,
    }) => (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        {...props}
        role="button"
        onKeyPress={e => {
          const isSpacebar = e.key === ' ';
          if (!isSpacebar) return;
          e.preventDefault();
          if (typeof props.onClick !== 'function') return;
          props.onClick(e);
        }}
        tabIndex={props.disabled ? -1 : 0}
      />
    );
  }
  return type;
};

const createExtendedRule = (rule) => (props) => {
  const {
    $extends,
    $map = i => i,
    ...style
  } = typeof rule === 'function' ? rule(props.theme, props) : rule;
  // Unfortunatelly, we need $extends helper because Flowtype spread is broken.
  const extended = $extends
    ? Array.isArray($extends)
      ? $extends[0].rule({
        ...props,
        ...$extends[1],
      })
      : $extends.rule(props)
    : {};
  return {
    maps: [$map].concat(extended.maps || []),
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
  const Component = createComponent(
    componentRule,
    getPlatformType(type),
    passProps,
  );
  Component.rule = extendedRule;
  return Component;
};

export default styled;
