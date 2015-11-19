import {Record} from 'immutable';

// configure keys you would like to store and revive from persistence store
const Persistence = Record({
  authToken: null
});

export default Persistence;
