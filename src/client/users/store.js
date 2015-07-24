import CurrentUser from './currentUser';
import {Record} from 'immutable';
import {actions} from './actions';
import User from './user';

const initialState = new (Record({
    list: []
}));

function revive(state) {
    // Handle case user was authenticated on the server.
    const viewer = state && state.get('viewer');
    const list = state && state.get('list');

    return new (Record({
        viewer: viewer ? new CurrentUser(viewer) : null,
        list: list ? list : []
    }));
}

export default function(state, action, payload) {
    if (!action) state = revive(state);

    switch (action) {



        // case authActions.loginSuccess:
        //     // Hideous side effect hack, will be removed soon with new react-router.
        //     User.isLoggedIn = true;
        //     return state.set('viewer', new User(payload));
        // break;

        case actions.loadAllUsers:
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
        break;
    }

    return state;
}
