import React from 'react-native';
import shallowEqual from 'react-pure-render/shallowEqual';

/**
 * Purified React.Component. Goodness.
 * http://facebook.github.io/react/docs/advanced-performance.html
 */
class Component extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {

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

Component.contextTypes = {
  router: React.PropTypes.func
};

export default Component;
