import React from 'react-native';
import shallowEqual from 'react-pure-render/shallowEqual';

// Pure React component. The goodness.
// http://facebook.github.io/react/docs/advanced-performance.html
// For some reason react-pure-render/component doesn't work in react-native.
// https://github.com/gaearon/react-pure-render/issues/14
// TODO: Remove once react-native will support React 0.14
export default class Component extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate =
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);
    return shouldUpdate;
  }

}
