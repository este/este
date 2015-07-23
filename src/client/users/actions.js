import Promise from 'bluebird';
//import APIUtils from '../../libs/APIUtils.js';

export const actions = create();
export const feature = 'users';

export function create(dispatch, validate){
    return {

        loadAllUsers(page = 1) {
            console.log(loadAllUsers);
            /*return new Promise((resolve, reject) => {
                APIUtils.get('users', data)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });*/
        },

        createUser(data) {
            /*return new Promise((resolve, reject) => {
                APIUtils.post('users', data)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        const msg = JSON.parse(err.res.text);

                        console.log(msg.message);
                        reject(err);
                    });
            });*/
        },

        editUser(data) {
            /*return new Promise((resolve, reject) => {
                APIUtils.put('users/' + data.id, data)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        const msg = JSON.parse(err.res.text);

                        console.log(msg.message);
                        reject(err);
                    });
            });*/
        }
    };
}
