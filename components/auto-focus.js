// @flow
import React, { type Element } from 'react';
import ReactDOM from 'react-dom';

// Declarative (and soon universal) focus.
// https://twitter.com/estejs/status/873650760420085760

type AutoFocusProps = {
  autoFocus?: any,
  children: Element<*>,
};

class AutoFocus extends React.Component {
  componentDidMount() {
    this.focus();
  }

  componentDidUpdate(prevProps: AutoFocusProps) {
    // Refocus after new validation. For example:
    // autoFocus={validationErrors && validationErrors.name}
    const autoFocusChanged = prevProps.autoFocus !== this.props.autoFocus;
    if (!autoFocusChanged) return;
    this.focus();
  }

  props: AutoFocusProps;

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

export default AutoFocus;
