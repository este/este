import Component from '../components/component.react';
import exposeRouter from '../components/exposerouter.react';
import CurrentUser from '../users/currentUser';

import React from 'react';
import Router from 'react-router';

export default function requireAuth(BaseComponent) {

    return class RequireAuth extends Component {

        static displayName = `${BaseComponent.name}RequireAuth`;

        // constructor(props){
        //     super(props);
        //     if(process.env.IS_BROWSER)
        //         if(!props.users.viewer)
        //             location.href = '/login';
        // }

        static willTransitionTo(transition) {
          // console.log(CurrentUser.isLoggedIn, 'huhuh');
          //   if (CurrentUser.isLoggedIn) return;

            transition.redirect('/login');
        }

        render() {
            return <BaseComponent {...this.props} />;
        }

    };

}
