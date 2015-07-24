import {Record} from 'immutable';
import {actions} from './actions';
import CurrentUser from './currentUser';
import User from './user';

const initialState = new (Record({
    list: [],
    viewer: null
}));

const revive = state => {

    const viewer = state && state.get('viewer');
    CurrentUser.isLoggedIn = !!viewer;

    return initialState.merge({
            list: state.get('list').map(user => new User(user)),
            viewer: viewer ? new CurrentUser(viewer) : null
        });
};

export default function(state = initialState, action, payload) {

    if (!action) state = revive(state);

    switch (action) {


        // case authActions.loginSuccess:
        //     // Hideous side effect hack, will be removed soon with new react-router.
        //     User.isLoggedIn = true;
        //     return state.set('viewer', new User(payload));
        // break;

        case actions.loadAllUsers:
        const {users: payload} = JSON.parse(payload.text);
        const users = payload.map((item) => new User(item));
        return state.update('list', () => users);

        case actions.createUser:
        actions.loadAllUsers(1);
        break;

        case actions.editUser:
        const {id, email, picture} = JSON.parse(data.text);
        const idx = list.findIndex(user => user.id === id);
        return state
        .setIn([idx, 'email'], email)
        .setIn([idx, 'picture'], picture);
        break;
    }

    return state;
}
