// @flow
import App from './App';
import React from 'react';
import configureFela from '../../common/configureFela';
import { BrowserRouter } from 'react-router';
import { Provider as Fela } from 'react-fela';
import { Provider as Redux } from 'react-redux';

type Props = {
  store: Object,
};

// This should be part of Fela.
// TODO: https://github.com/rofrischmann/fela/issues/125
const getFelaMountNode = () => {
  const node = document.getElementById('stylesheet');
  const parent = node.parentNode;
  if (!node || !parent) {
    throw new Error('missing stylesheet node for Fela');
  }
  const nextNode = document.createElement('style');
  nextNode.id = 'stylesheet';
  parent.replaceChild(nextNode, node);
  return nextNode;
};

// We needs such Root for vanilla hot reloading.
const Root = ({ store }: Props) => (
  <Redux store={store}>
    <Fela mountNode={getFelaMountNode()} renderer={configureFela()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Fela>
  </Redux>
);

export default Root;
