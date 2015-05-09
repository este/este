import React from 'react';
import {isLoggedIn} from '../user/store';
import PureComponent from '../components/purecomponent.react';

// Higher order component.
// https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
export default function auth(Component) {

  return class Auth extends PureComponent {
    static willTransitionTo(transition) {
      if (!isLoggedIn())
        transition.redirect('/login', {}, {nextPath: transition.path});
    }
    render() {
      return <Component {...this.props} />;
    }
  };

}
