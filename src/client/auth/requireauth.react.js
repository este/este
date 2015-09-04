import Component from '../components/component.react';
import React from 'react';
import App from '../app/app.react';

export default function requireAuth(BaseComponent) {

  return class RequireAuth extends Component {

    static displayName = `${BaseComponent.name}RequireAuth`;

    static willTransitionTo(transition) {
      const isLoggedIn = App._flux.state && App._flux.state.getIn(['users', 'viewer', 'isLoggedIn']);
      if (isLoggedIn) return;
      transition.redirect('/login', {}, {
        nextPath: transition.path
      });
    }

    render() {
      return <BaseComponent {...this.props} />;
    }

  };

}
