import Component from '../components/component.react';
import React from 'react';
import User from '../users/user';

export default function requireAuth(BaseComponent) {

  return class RequireAuth extends Component {

    static willTransitionTo(transition) {
      if (User.isLoggedIn) return;
      transition.redirect('/login', {}, {
        nextPath: transition.path
      });
    }

    render() {
      return <BaseComponent {...this.props} />;
    }

  };

}
