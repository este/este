// @flow
import React, { type Element } from 'react';
import ReactDOM from 'react-dom';

// Declarative (and soon universal) component focus.
// Stateful helper for Box to avoid stateful Box.
// https://twitter.com/estejs/status/873650760420085760

type FocusedProps = {
  autoFocus?: ?Object,
  children: Element<*>,
};

class Focused extends React.Component {
  // autoFocus doesn't always work. This helps.
  componentDidMount() {
    this.focus();
  }

  componentDidUpdate(prevProps: FocusedProps) {
    // Focus element only on autoFocus change. Yep, the trick is autoFocus
    // must be unique value per form submit.
    const autoFocusChanged = prevProps.autoFocus !== this.props.autoFocus;
    if (!autoFocusChanged) return;
    this.focus();
  }

  props: FocusedProps;

  focus() {
    // eslint-disable-next-line react/no-find-dom-node
    const el = ReactDOM.findDOMNode(this);
    if (!el) return;
    if (typeof el.focus !== 'function') return;
    el.focus();
  }

  render() {
    return this.props.children;
  }
}

export default Focused;
