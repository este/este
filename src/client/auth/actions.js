import Promise from 'bluebird';
//import {ValidationError} from '../lib/validation';
import APIUtils from '../libs/APIUtils.js';
import Cookies from 'cookies-js';
import User from '../users/user';

export const actions = create();
export const feature = 'auth';

export function create(dispatch, validate, msg) {
/*
    const validateForm = fields => validate(fields)
        .prop('email').required().email()
        .prop('password').required().simplePassword()
        .promise;

    const validateCredentials = fields => new Promise((resolve, reject) => {
        // For real usage, use isomorphic-fetch, socket.io, or whatever.
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/v1/auth/login', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        // TODO: Show how to handle different password/username server errors.
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200)
                resolve(fields);
            else
                reject(new ValidationError(msg.form.wrongPassword, 'password'));
        };
        xhr.send(JSON.stringify(fields));
    });*/

    return {

        /*login(fields) {
            dispatch(actions.login);

            return validateForm(fields)
                .then(() => validateCredentials(fields))
                .then(() => dispatch(actions.loginSuccess, fields))
                .catch(error => {
                    dispatch(actions.loginFail, error);
                    throw error;
              });
        },
        loginSuccess() {},
        loginFail() {},*/
        login(user, nextPath) {
            Cookies.set('user', JSON.stringify(user));
            location.href = nextPath || '/';
        },
        sendToken(access_token) {
            return APIUtils.get('auth', {access_token});
        },
        logout() {
            Cookies.expire('user');
            location.href = '/';
        },

        setFormField({target: {name, value}}) {
            value = value.slice(0, 100);
            dispatch(actions.setFormField, {name, value});
        }

    };

}
