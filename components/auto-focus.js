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
    const focusable =
      el.tagName === 'INPUT' ||
      el.tagName === 'BUTTON' ||
      (typeof el.tabIndex === 'number' && el.tabIndex > -1); // for div button
    if (focusable && typeof el.focus === 'function') {
      el.focus();
    } else if (typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    return this.props.children;
  }
}

export default AutoFocus;
