// @flow
import App from './App';
import Fela from '../../common/components/FelaProvider';
import React from 'react';
import configureFela from '../configureFela';
import { BrowserRouter } from 'react-router';
import { Provider as Redux } from 'react-redux';

type RootProps = {
  store: Object,
};

type BrowserRootProps = RootProps & {
  children?: any,
  felaRenderer: Object,
  store: Object,
};

const getFelaMountNode = () => {
  const node = document.getElementById('stylesheet');
  const parent = node.parentNode;
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
const DivButton = (props: {
  disabled?: boolean,
  onClick?: Function,
  style?: Object,
}) => (
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

// This is reused in src/server/frontend/render.js
export const BrowserRoot = ({
  store,
  felaRenderer,
  children,
}: BrowserRootProps) => (
  <Redux store={store}>
    <Fela
      Button={(props) => <DivButton {...props} />}
      Image={(props) => <img {...props} />} // eslint-disable-line jsx-a11y/img-has-alt
      Text={(props) => <span {...props} />}
      TextInput={(props) => <input {...props} />}
      View={(props) => <div {...props} />}
      mountNode={process.env.IS_BROWSER && getFelaMountNode()}
      renderer={felaRenderer}
    >
      {children}
    </Fela>
  </Redux>
);

// We needs such Root also for vanilla hot reloading.
const Root = ({ store }: RootProps) => (
  <BrowserRoot felaRenderer={configureFela()} store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </BrowserRoot>
);

export default Root;
