import React from 'react';
import shallowEqual from 'react-pure-render/shallowEqual';

// import diff from 'immutablediff';

/**
 * Purified React.Component. Goodness.
 * http://facebook.github.io/react/docs/advanced-performance.html
 */
class Component extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func
  }

  shouldComponentUpdate(nextProps, nextState) {
    // TODO: Make whole React Pure, add something like dangerouslySetLocalState.
    // https://github.com/gaearon/react-pure-render#known-issues
    // https://twitter.com/steida/status/600395820295450624
    if (this.context.router) {
      const changed = this.pureComponentLastPath !== this.context.router.getCurrentPath();
      this.pureComponentLastPath = this.context.router.getCurrentPath();
      if (changed) return true;
    }

    const shouldUpdate =
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);

    // if (shouldUpdate)
    //   this._logShouldUpdateComponents(nextProps, nextState)

    return shouldUpdate;
  }

  // // Helper to check which component was changed and why.
  // _logShouldUpdateComponents(nextProps, nextState) {
  //   const name = this.constructor.displayName || this.constructor.name
  //   console.log(`${name} shouldUpdate`)
  //   // const propsDiff = diff(this.props, nextProps).toJS()
  //   // const stateDiff = diff(this.state, nextState).toJS()
  //   // if (propsDiff.length) console.log('props', propsDiff)
  //   // if (stateDiff.length) console.log('state', stateDiff)
  // }

}

export default Component;
