import Component from '../components/component.react';
import React from 'react';
import GoogleLogin from './googleLogin.react';
import CurrentUser from '../users/currentUser';

class Login extends Component {

    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        msg: React.PropTypes.object.isRequired,
        router: React.PropTypes.func
    };

    static willTransitionTo(transition) {
        const isLoggedIn = process.env.IS_BROWSER ? localStorage.getItem('token') : CurrentUser.isLoggedIn;
        if (!isLoggedIn) return;

        transition.redirect('/');
    }

    render() {
        const {
            actions: {auth: actions},
            msg: {auth: msg}
        } = this.props;

        return (
            <div className="login-page">
                <GoogleLogin {...{actions, msg}}/>
            </div>
        );
    }

}

export default Login;
