import React from 'react';
import shallowEqual from 'react-pure-render/shallowEqual';

/**
 * Purified React.Component. Goodness.
 * http://facebook.github.io/react/docs/advanced-performance.html
 */
export default class Component extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func
  }

  shouldComponentUpdate(nextProps, nextState) {
    // This hack will be removed with react-router 1.0.0.
    if (this.context.router) {
      const changed = this.pureComponentLastPath !== this.context.router.getCurrentPath();
      this.pureComponentLastPath = this.context.router.getCurrentPath();
      if (changed) return true;
    }

    const shouldUpdate =
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);

    return shouldUpdate;
  }

}
