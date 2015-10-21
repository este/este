import {Record, List} from 'immutable';

const Profile = Record({
  loaded: false,
  error: '',
  id: '',
  firstName: '',
  lastName: '',
  name: '',
  slug: '',
  bio: new (List),
  connect: new (List),
  contributed: new (List),
  promoted: new (List),
  events: new (List)
});

export const Contribution = Record({

});

export const Promotion = Record({

});


export default Profile;
