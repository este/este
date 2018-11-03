// @flow
/* eslint-env browser */
// $FlowFixMe
import { useState, useEffect, type Node } from 'react';
import ReactDOM from 'react-dom';

export default function usePortal() {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    const next = window.document.getElementById('__next');
    const container = window.document.createElement('div');
    next.appendChild(container);
    setContainer(container);
    return () => {
      next.removeChild(container);
    };
  }, []);

  if (!container) return null;
  return (children: Node) => ReactDOM.createPortal(children, container);
}
