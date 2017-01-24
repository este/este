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

// This is reused in src/server/frontend/render.js
export const BrowserRoot = ({
  store,
  felaRenderer,
  children,
}: BrowserRootProps) => (
  <Redux store={store}>
    <Fela
      Button={(props) => <div {...props} />}
      Image={(props) => <image {...props} />}
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
