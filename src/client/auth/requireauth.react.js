import Component from '../components/component.react';
import React from 'react';
import {usersCursor} from '../state';

export default function requireAuth(BaseComponent) {

  class Authenticated extends Component {

    static willTransitionTo(transition) {
      const isLoggedIn = !!usersCursor().get('viewer');
      if (isLoggedIn) return;
      transition.redirect('/login', {}, {
        nextPath: transition.path
      });
    }

    render() {
      return <BaseComponent {...this.props} />;
    }

  }

  Authenticated.displayName = `${BaseComponent.name}Authenticated`;

  return Authenticated;

}
