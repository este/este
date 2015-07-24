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
        if (!CurrentUser.isLoggedIn) return;

        transition.redirect('/');
    }

    // constructor(props){
    //     super(props);
    //     if(process.env.IS_BROWSER)
    //         if(props.users.viewer)
    //             location.href = '/';
    // }

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
