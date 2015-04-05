import React from 'react';

// Higher order component exposing router.
// https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
export default function exposeRouter(Component) {

  class ExposeRouter extends React.Component {
    render() {
      return <Component {...this.props} router={this.context.router} />;
    }
  }

  ExposeRouter.contextTypes = {
    router: React.PropTypes.func.isRequired
  };

  return ExposeRouter;

}

