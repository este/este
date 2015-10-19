import {Record, Map, List} from 'immutable';

const Profile = Record({
  loaded: false,
  error: '',
  id: '',
  firstName: '',
  lastName: '',
  name: '',
  slug: '',
  img: '',
  position: '',
  org: '',
  orgUrl: '',
  location: '',
  following: 0,
  followers: 0,
  viewerIsFollowing: false,
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
