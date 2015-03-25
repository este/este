import React from 'react';
import shallowEqual from 'react/lib/shallowEqual';

/**
 * PureRenderMixin replacement for React component ES6 classes.
 * https://github.com/facebook/react/blob/ed3e6ecb9b86b97c09428f40deb8c3ed695e73e8/src/addons/ReactComponentWithPureRenderMixin.js
 */
export default class PureComponent extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

}
