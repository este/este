import Component from '../components/component.react';
import React from 'react';
import AuthConf from './config';
//import * as actions from './actions';
import initGapi from '../libs/googleAPI';
//import {msg} from '../../messages/store';

/* globals gapi: false */
class GoogleLogin extends Component {
    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        msg: React.PropTypes.object.isRequired,
    };

    componentDidMount() {
        initGapi();
    }

    render() {
        const {msg} = this.props;

        return (
            <button onClick={::this._handleAuthClick}>{msg.login.button}</button>
        );
    }

    _checkAuth() {
        gapi.auth.authorize({client_id: AuthConf.clientId, scope: AuthConf.scopes, immediate: false}, ::this._handleAuthResult);
    }

    _handleAuthResult(authResult) {
        if (authResult && !authResult.error)
            this._handleToken(authResult.access_token);
        else
            console.log(authResult.error); //eslint-disable-line no-console
    }

    _handleToken(access_token) {
      const {actions} = this.props;

        actions.sendToken(access_token)
        .then(({text: res}) => {

            //TODO - Redefine this later
            const
            {email, token} = JSON.parse(res),
            user = {email, token},
            nextPath = this.context.router.getCurrentQuery().nextPath;

            actions.login(user, nextPath);
        })
        .catch((e)=> {
            console.log(e); //eslint-disable-line no-console
        });
    }

    _handleAuthClick(e) {
        e.stopPropagation();
        this._checkAuth(false);
    }

}

export default GoogleLogin;
