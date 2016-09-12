/* @flow */
import React from 'react';

class RoutingProvider extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    routes: React.PropTypes.object.isRequired,
  };

  static childContextTypes = {
    routing: React.PropTypes.object,
  };

  getChildContext() {
    const { routes } = this.props;
    return {
      routing: { routes },
    };
  }

  render() {
    // facebook.github.io/react/docs/top-level-api.html#react.children.only
    return React.Children.only(this.props.children);
  }

}

export default RoutingProvider;
