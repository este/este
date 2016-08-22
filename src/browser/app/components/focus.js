/* @flow weak */
// Higher order component for focusing elements by ValidationError.
import React from 'react';
import { ValidationError } from '../../../common/lib/validation';
import { findDOMNode } from 'react-dom';

const focus = (WrappedComponent, errorProp) =>
  class Wrapper extends React.Component {

    componentDidUpdate(prevProps) {
      const error = this.props[errorProp];
      if (error === prevProps[errorProp]) return;
      if (!(error instanceof ValidationError)) return;
      const el = findDOMNode(this); // eslint-disable-line react/no-find-dom-node
      if (!el) return;
      const fieldEl = el.querySelector(`[name=${error.params.prop}]`);
      if (!fieldEl) return;
      fieldEl.focus();
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }

  };

export default focus;
