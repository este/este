// @flow
import Fela from '../../common/components/FelaProvider';
import React from 'react';
import configureFela from '../configureFela';
import { Provider as Redux } from 'react-redux';

const getFelaMountNode = () => {
  const node = document.getElementById('stylesheet');
  const parent = node && node.parentNode;
  if (!node || !parent) {
    throw new Error('missing stylesheet node for Fela');
  }
  // Always create a new element to handle hot reloading.
  const nextNode = document.createElement('style');
  nextNode.id = 'stylesheet';
  parent.replaceChild(nextNode, node);
  return nextNode;
};

// Render button as div because button is not consistently rendered across
// browsers and it's hard and tricky to enforce the same look. Making button
// from regular div is much easier.
// developer.mozilla.org/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role
// developer.mozilla.org/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
const DivButton = (
  props: {
    disabled?: boolean,
    onClick?: Function,
    style?: Object,
  },
) => (
  <div // eslint-disable-line jsx-a11y/no-static-element-interactions
    {...props}
    role="button"
    onKeyPress={e => {
      if (props.disabled) return;
      const isSpacebar = e.key === ' ';
      if (!isSpacebar) return;
      e.preventDefault();
      if (typeof props.onClick !== 'function') return;
      props.onClick(e);
    }}
    style={{
      ...(props.style || null),
      pointerEvents: props.disabled ? 'none' : 'auto',
      userSelect: 'none',
    }}
    tabIndex={props.disabled ? -1 : 0}
  />
);

type BaseRootProps = {
  children?: any,
  felaRenderer?: Object,
  store: Object,
};

// This is reused in src/server/frontend/render.js
const BaseRoot = (
  {
    store,
    felaRenderer = configureFela(),
    children,
  }: BaseRootProps,
) => (
  <Redux store={store}>
    <Fela
      Button={props => <DivButton {...props} />}
      Image={props => <img {...props} />} // eslint-disable-line jsx-a11y/img-has-alt
      Text={props => <span {...props} />}
      TextInput={props => <input {...props} />}
      View={props => <div {...props} />}
      mountNode={process.env.IS_BROWSER && getFelaMountNode()}
      renderer={felaRenderer}
    >
      {children}
    </Fela>
  </Redux>
);

export default BaseRoot;
