// @flow
import { useState, useEffect, type Node } from 'react';
/* eslint-env browser */
import ReactDOM from 'react-dom';

export default function Portal(props: { children: Node }) {
  const [container, setContainer] = useState<?HTMLDivElement>(null);

  useEffect(() => {
    const next = window.document.getElementById('__next');
    const container = window.document.createElement('div');
    next.appendChild(container);
    setContainer(container);
    return () => {
      next.removeChild(container);
    };
  }, []);

  return container ? ReactDOM.createPortal(props.children, container) : null;
}
