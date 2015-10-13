import React from 'react-native';
import shallowEqual from 'react-pure-render/shallowEqual';

// Purified React.Component. Goodness.
// http://facebook.github.io/react/docs/advanced-performance.html
// TODO: Investigate why 'react-pure-render/component' can't be used.
// https://github.com/facebook/react-native/issues/3369
export default class Component extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate =
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);
    return shouldUpdate;
  }

}
