import socketVamos from './socket';

// Remember to import all actions here.
import * as authActions from '../auth/actions';

const actions = {
    authActions
};

export function initSocket() {
    socketVamos.init('http://localhost:8000');
}

export function listenToEntity(entity) {
    const operations = ['add', 'edit', 'delete'];

    for (let operation of operations) {
        listenOperationByEntity(entity, operation);
    }
}

function listenOperationByEntity(entity, operation) {
    socketVamos.on(`${entity}:${operation}`, (data) => {
        const entityCap = entity.charAt(0).toUpperCase() + entity.substring(1);
        actions[`${entity}Actions`][`${operation}${entityCap}FromSocket`](data);
    });
}
