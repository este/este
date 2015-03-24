import React from 'react'

// Higher order component exposing router.
// https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
export default function exposeRouter(Component) {
  class ExposeRouter extends React.Component {
    render() {
      return React.cloneElement(React.Children.onlyChild(this.props.children), {
        router: this.context.router
      });
    }
  }
  ExposeRouter.contextTypes = {
    router: React.PropTypes.func.isRequired
  }
  return ExposeRouter
}
