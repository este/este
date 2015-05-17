import PureComponent from '../components/purecomponent.react';
import React from 'react';
import {userCursor} from '../state';

// Higher order component.
// https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
export default function requireAuth(Component) {

  class Authenticated extends PureComponent {

    static willTransitionTo(transition) {
      const isLoggedIn = userCursor().get('isLoggedIn');
      if (isLoggedIn) return;
      transition.redirect('/login', {}, {
        nextPath: transition.path
      });
    }

    render() {
      return <Component {...this.props} />;
    }

  }

  Authenticated.displayName = `${Component.name}Authenticated`;

  return Authenticated;

}
