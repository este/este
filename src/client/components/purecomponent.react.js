import React from 'react';
import shallowEqual from 'react-pure-render/shallowEqual';

// import diff from 'immutablediff'

/**
 * PureComponent is pure goodness. Always use it for two reasons:
 *  1) The fastest possible rendering. No need to optimize anything anymore.
 *  2) It's explicit which data aka props component needs, and we can easily
 *     define behavior for not yet loaded data.
 * http://facebook.github.io/react/docs/advanced-performance.html
 */
export default class PureComponent extends React.Component {

  // // Helper to check which components were changed and why.
  // componentDidUpdate(prevProps, prevState) {
  //   const name = this.constructor.displayName || this.constructor.name
  //   console.log(`${name} didUpdate`)
  //   const propsDiff = diff(prevProps, this.props).toJS()
  //   const stateDiff = diff(prevState, this.state).toJS()
  //   if (propsDiff.length) console.log('props', propsDiff)
  //   if (stateDiff.length) console.log('state', stateDiff)
  // }

  shouldComponentUpdate(nextProps, nextState) {
    // https://github.com/gaearon/react-pure-render#known-issues
    if (this.context.router) {
      const changed = this.pureComponentLastPath !== this.context.router.getCurrentPath();
      this.pureComponentLastPath = this.context.router.getCurrentPath();
      if (changed) return true;
    }

    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

}

PureComponent.contextTypes = {router: React.PropTypes.func};
