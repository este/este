import React from 'react-native';
import shallowEqual from 'react-pure-render/shallowEqual';

/**
 * Purified React.Component. Goodness.
 * http://facebook.github.io/react/docs/advanced-performance.html
 */
class Component extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

}

Component.contextTypes = {
  router: React.PropTypes.func
};

export default Component;
