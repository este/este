import React from 'react';
import PureComponent from './purecomponent';

export default class LinkComponent extends PureComponent {

  shouldComponentUpdate(nextProps, nextState) {
    // https://github.com/rackt/react-router/issues/866
    // so our <Link> components are always re-rendered with a route change
    if (this.context.router) {
      const changed = this.lastPath !== this.context.router.getCurrentPath();
      this.lastPath = this.context.router.getCurrentPath();
      if (changed) return true;
    }

    return super.shouldComponentUpdate(nextProps, nextState);
  }

}

LinkComponent.contextTypes = { router: React.PropTypes.func };
