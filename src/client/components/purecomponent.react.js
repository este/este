import React from 'react';
import shallowEqual from 'react/lib/shallowEqual';

/**
 * PureRenderMixin replacement for React component ES6 classes.
 * https://github.com/facebook/react/blob/ed3e6ecb9b86b97c09428f40deb8c3ed695e73e8/src/addons/ReactComponentWithPureRenderMixin.js
 */
export default class PureComponent extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    // https://github.com/rackt/react-router/issues/866
    // so our <Link> components are always re-rendered with a route change
    if (this.context.router) {
      const changed = this.pureComponentlastPath !== this.context.router.getCurrentPath();
      this.pureComponentlastPath = this.context.router.getCurrentPath();
      if (changed) return true;
    }

    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

}

PureComponent.contextTypes = {router: React.PropTypes.func};
