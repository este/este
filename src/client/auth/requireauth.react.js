import Component from '../components/component.react';
import CurrentUser from '../users/currentUser';
import React from 'react';

export default function requireAuth(BaseComponent) {

    return class RequireAuth extends Component {

        static displayName = `${BaseComponent.name}RequireAuth`;

        static willTransitionTo(transition) {
            const isLoggedIn = process.env.IS_BROWSER ? localStorage.getItem('token') : CurrentUser.isLoggedIn;
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
