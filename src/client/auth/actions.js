import APIUtils from '../libs/APIUtils.js';
import Cookies from 'cookies-js';

export const actions = create();
export const feature = 'auth';

export function create(dispatch, validate, msg) {

    return {

        login(user, nextPath) {
            Cookies.set('user', JSON.stringify(user));
            localStorage.setItem('token', user.token);

            location.href = nextPath || '/';
        },

        sendToken(access_token) {
            return APIUtils.get('auth', {access_token});
        },
        logout() {
            Cookies.expire('user');
            localStorage.removeItem('token');

            location.href = '/';
        },

        setFormField({target: {name, value}}) {
            value = value.slice(0, 100);
            dispatch(actions.setFormField, {name, value});
        }

    };

}
