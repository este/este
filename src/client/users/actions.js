import Promise from 'bluebird';
import APIUtils from '../libs/APIUtils.js';

export const actions = create();
export const feature = 'users';

export function create(dispatch, validate) {
    return {

        loadAllUsers(page = 1) {
            const data = {
                page: page
            };

            return APIUtils.get('users', data)
                .then(res => {
                    dispatch(actions.loadAllUsers, res);
                })
                .catch(err => {
                    console.log('BONJOUR', err);
                });
        },

        createUser(data) {
            return new Promise((resolve, reject) => {
                APIUtils.post('users', data)
                .then(res => {
                    dispatch(actions.createUser, res);
                })
                .catch(err => {
                    const msg = JSON.parse(err.res.text);

                    console.log(msg.message);
                });
            });
        },

        editUser(data) {
            return new Promise((resolve, reject) => {
                APIUtils.put('users/' + data.id, data)
                .then(res => {
                    dispatch(actions.editUser, res);
                })
                .catch(err => {
                    const msg = JSON.parse(err.res.text);

                    console.log(msg.message);
                });
            });
        }
    };
}
