/* @flow */
import type { BrowserStyle, Styled, Theme } from '../themes/types';
import { createComponent } from 'react-fela';

// const maps = [].concat($map || []);
// const style = { ...style };
// if (!$extends) {
//   return { maps, style };
// }

const createExtendedRule = (rule) => (props) => {
  const {
    $extends,
    $map = i => i,
    ...style
  } = typeof rule === 'function' ? rule(props.theme, props) : rule;
  // Unfortunatelly, we need $extends helper because flow spread is broken.
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
  // TODO: Use new flow callable object type subclassed from Function.
  const Component = createComponent(componentRule, type, passProps);
  Component.rule = extendedRule;
  return Component;
};

export default styled;
