import React from 'react'
import {isLoggedIn} from '../../user/store'

// Higher order component.
// https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
export default function auth(Component) {

  return class Auth extends React.Component {
    static willTransitionTo(transition) {
      if (!isLoggedIn())
        transition.redirect('/login', {}, {nextPath: transition.path})
    }
    render() {
      return <Component {...this.props} />
    }
  }

}
