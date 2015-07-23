import User from './user';
import {Record} from 'immutable';
import {actions as authActions} from '../auth/actions';

function revive(state) {
    // Handle case user was authenticated on the server.
    const viewer = state && state.get('viewer');
    return new (Record({
        viewer: viewer ? new User(viewer) : null
    }));
}

export default function(state, action, payload) {
    if (!action) state = revive(state);

    switch (action) {

        case authActions.loginSuccess:
            // Hideous side effect hack, will be removed soon with new react-router.
            User.isLoggedIn = true;
            return state.set('viewer', new User(payload));
        break;

        /*case actions.loadAllUser:
            const users = payload.map((item) => new User(item));
            return state.update('list', () => users);
        break;

        case actions.createUser:
            actions.loadAllUsers(1);
        break;

        case actions.editUser:
            const {id, email, picture} = JSON.parse(data.text);
            const idx = list.findIndex(user => user.id === id);
            return state
                    .setIn([idx, 'email'], email)
                    .setIn([idx, 'picture'], picture);
        break;*/
    }

    return state;
}
