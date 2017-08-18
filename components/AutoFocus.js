// @flow
import React, { type Element } from 'react';
import ReactDOM from 'react-dom';

// Declarative (and soon universal) focus.
// https://twitter.com/estejs/status/873650760420085760

type AutoFocusProps = {
  autoFocus?: any,
  children: Element<any>,
};

// Class, because we focus only when focus prop has been changed.
class AutoFocus extends React.Component<AutoFocusProps> {
  componentDidMount() {
    this.focus();
  }

  componentDidUpdate(prevProps: AutoFocusProps) {
    // Refocus after new validation. For example:
    // autoFocus={validationErrors.name}
    const autoFocusChanged = prevProps.autoFocus !== this.props.autoFocus;
    if (!autoFocusChanged) return;
    this.focus();
  }

  focus() {
    // eslint-disable-next-line react/no-find-dom-node
    const el = ReactDOM.findDOMNode(this);
    if (!el) return;
    const focusable =
      el.tagName === 'INPUT' ||
      el.tagName === 'BUTTON' ||
      (typeof el.tabIndex === 'number' && el.tabIndex > -1); // for div button
    if (focusable && typeof el.focus === 'function') {
      // flow refinement
      el.focus();
      return;
    }
    if (
      typeof el.scrollIntoView !== 'function' ||
      typeof el.getBoundingClientRect !== 'function' ||
      typeof el.scrollIntoView !== 'function'
    ) {
      return;
    }
    const yPadding = 10;
    const rect = el.getBoundingClientRect();
    const bottomOffset = rect.bottom - window.innerHeight;
    if (bottomOffset > 0) {
      window.scrollBy({
        top: bottomOffset + yPadding,
        left: 0,
        behavior: 'smooth',
      });
      return;
    }
    if (rect.top > 0) return;
    window.scrollBy({
      top: rect.top - yPadding,
      left: 0,
      behavior: 'smooth',
    });
  }

  render() {
    return this.props.children;
  }
}

export default AutoFocus;
